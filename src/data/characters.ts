// ─── Типы брони ───────────────────────────────────────────────────────────────

export type ArmorMaterial =
    | "leather"
    | "iron"
    | "golden"
    | "diamond"
    | "netherite"
    | "chainmail"
    | "custom";

// Материалы для тримов (определяют цвет паттерна)
export type TrimMaterial =
    | "amethyst"
    | "copper"
    | "diamond"
    | "emerald"
    | "gold"
    | "iron"
    | "lapis"
    | "netherite"
    | "quartz"
    | "redstone";

// Паттерны тримов
export type TrimPattern =
    | "bolt"    | "coast"    | "dune"  | "eye"
    | "flow"    | "host"     | "raiser"| "rib"
    | "sentry"  | "shaper"   | "silence"| "snout"
    | "spire"   | "tide"     | "vex"   | "ward"
    | "wayfinder"| "wild";

// ─── Трим для одной части брони ───────────────────────────────────────────────

export interface ArmorTrim {
    pattern: TrimPattern;
    material: TrimMaterial;
}

// ─── Конфигурация одной части брони ───────────────────────────────────────────

export interface ArmorPieceConfig {
    /** PNG-текстура (путь от /public или импорт через import) */
    texture: string;
    /** Тип материала брони */
    material: ArmorMaterial;
    /** Цвет кожаной брони — только если material === "leather". hex или rgb() */
    leatherColor?: string;
    /** Трим поверх брони — опционально */
    trim?: ArmorTrim;
}

// ─── Полный набор брони персонажа ─────────────────────────────────────────────

export interface CharacterArmor {
    chestplate?: ArmorPieceConfig;
    leggings?: ArmorPieceConfig;
    boots?: ArmorPieceConfig;
}

// ─── Основные интерфейсы персонажа ────────────────────────────────────────────

export interface Stats{
    health: number;
    attack: number;
    defence: number;
    speed: number;
    critChance: number;
    critDamage: number;
    attackSpeed: number;
}

export interface Talent{
    name: string;
    type: string;
    description: string;
    details?: string;
}

export interface Weapon{
    name: string;
    description: string;
}

export interface CharacterData{
    name: string;
    archetype: string;
    lore: string;
    weapon: Weapon;
    stats: Stats;
    talents: Talent[];
    previewImg: string;
    /** Броня персонажа — не обязательно, если не указана — броня не отображается */
    armor?: CharacterArmor;
}