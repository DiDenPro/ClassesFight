import * as THREE from "three";
import { ArmorPieceConfig, TrimMaterial } from "../data/characters";

// ─── Цвета материалов тримов (как в Minecraft) ────────────────────────────────

const TRIM_MATERIAL_COLORS: Record<TrimMaterial, string> = {
    amethyst:  "#9C59D1",
    copper:    "#B4684D",
    diamond:   "#6EECD2",
    emerald:   "#11A036",
    gold:      "#DEB12D",
    iron:      "#D8D8D8",
    lapis:     "#2A5EA4",
    netherite: "#625859",
    quartz:    "#E8E3DC",
    redstone:  "#D01B00",
};

// ─── Кэш текстур (чтобы не пересчитывать одно и то же) ───────────────────────

const textureCache = new Map<string, THREE.CanvasTexture>();

function getCacheKey(config: ArmorPieceConfig): string {
    return JSON.stringify(config);
}

// ─── Загрузка изображения по URL ──────────────────────────────────────────────

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
}

// ─── Colorize: умножение пикселей на цвет (для кожаной брони и тримов) ────────

function colorizeCanvas(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    color: string
): void {
    // Получаем RGB из hex или rgb()
    const rgb = parseColor(color);
    if (!rgb) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) { // только непрозрачные пиксели
            data[i]     = Math.round(data[i]     * rgb.r / 255);
            data[i + 1] = Math.round(data[i + 1] * rgb.g / 255);
            data[i + 2] = Math.round(data[i + 2] * rgb.b / 255);
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

// ─── Парсинг цвета из hex или rgb() ───────────────────────────────────────────

function parseColor(color: string): { r: number; g: number; b: number } | null {
    // hex: #RRGGBB или #RGB
    const hexMatch = color.match(/^#([0-9a-fA-F]{3,6})$/);
    if (hexMatch) {
        let hex = hexMatch[1];
        if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
        return {
            r: parseInt(hex.slice(0, 2), 16),
            g: parseInt(hex.slice(2, 4), 16),
            b: parseInt(hex.slice(4, 6), 16),
        };
    }

    // rgb(r, g, b)
    const rgbMatch = color.match(/^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/);
    if (rgbMatch) {
        return {
            r: parseInt(rgbMatch[1]),
            g: parseInt(rgbMatch[2]),
            b: parseInt(rgbMatch[3]),
        };
    }

    return null;
}

// ─── Наложить трим поверх базовой текстуры ────────────────────────────────────

async function applyTrim(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    config: ArmorPieceConfig
): Promise<void> {
    if (!config.trim) return;

    const { pattern, material } = config.trim;
    const trimColor = TRIM_MATERIAL_COLORS[material];

    // Путь к текстуре трима — кладёшь в /public/trims/{pattern}.png
    const trimSrc = `/trims/${pattern}.png`;

    try {
        const trimImg = await loadImage(trimSrc);

        // Рисуем трим на отдельном канвасе чтобы colorize не затронул основу
        const trimCanvas = document.createElement("canvas");
        trimCanvas.width = width;
        trimCanvas.height = height;
        const trimCtx = trimCanvas.getContext("2d")!;
        trimCtx.drawImage(trimImg, 0, 0, width, height);

        // Применяем цвет материала трима
        colorizeCanvas(trimCtx, width, height, trimColor);

        // Накладываем на основной канвас
        ctx.drawImage(trimCanvas, 0, 0);
    } catch {
        // Файл трима не найден — просто пропускаем, броня отобразится без трима
        console.warn(`Trim texture not found: /trims/${pattern}.png`);
    }
}

// ─── Главная функция: строит THREE.CanvasTexture из конфига ───────────────────

export async function buildArmorTexture(
    config: ArmorPieceConfig
): Promise<THREE.CanvasTexture> {
    const cacheKey = getCacheKey(config);
    if (textureCache.has(cacheKey)) {
        return textureCache.get(cacheKey)!;
    }

    // Загружаем базовую текстуру брони
    const baseImg = await loadImage(config.texture);

    const width = baseImg.naturalWidth;
    const height = baseImg.naturalHeight;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    // 1. Рисуем базовую текстуру
    ctx.drawImage(baseImg, 0, 0);

    // 2. Colorize для кожаной брони
    if (config.material === "leather" && config.leatherColor) {
        colorizeCanvas(ctx, width, height, config.leatherColor);
    }

    // 3. Накладываем трим (если есть)
    await applyTrim(ctx, width, height, config);

    // 4. Создаём THREE.CanvasTexture
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter; // пиксельный стиль Minecraft
    texture.minFilter = THREE.NearestFilter;
    texture.needsUpdate = true;

    textureCache.set(cacheKey, texture);
    return texture;
}

// ─── Очистка кэша при смене персонажа ─────────────────────────────────────────

export function clearArmorTextureCache(): void {
    textureCache.forEach(tex => tex.dispose());
    textureCache.clear();
}
