import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { CharacterArmor } from "../data/characters";
import { buildArmorTexture } from "../utils/armorTexture";

interface Props {
    armor: CharacterArmor;
    position?: [number, number, number];
    scale?: number;
}

const PIECE_MAP = {
    chestplate: "chestplate",
    leggings:   "leggings",
    boots:      "boots",
} as const;

export function ArmorModel({ armor, position, scale }: Props) {
    const { nodes } = useGLTF("/armor.gltf");

    const materialsRef = useRef<Record<string, THREE.MeshStandardMaterial>>({});

    useEffect(() => {
        let cancelled = false;

        async function applyTextures() {
            for (const [piece, armorKey] of Object.entries(PIECE_MAP)) {
                const config = armor[armorKey as keyof CharacterArmor];
                const mat = materialsRef.current[piece];
                if (!mat) continue;

                if (!config) {
                    mat.visible = false;
                    continue;
                }

                try {
                    const texture = await buildArmorTexture(config);
                    if (cancelled) return;
                    mat.map = texture;
                    mat.visible = true;
                    mat.needsUpdate = true;
                } catch (e) {
                    console.error(`Failed to build texture for ${piece}:`, e);
                    mat.visible = false;
                }
            }
        }

        applyTextures();
        return () => { cancelled = true; };
    }, [armor]);

    const chestplateNode = nodes["chestplate"] as THREE.Mesh | undefined;
    const leggingsNode   = nodes["leggings"]   as THREE.Mesh | undefined;
    const bootsNode      = nodes["boots"]      as THREE.Mesh | undefined;

    function makeMaterial(piece: string): THREE.MeshStandardMaterial {
        if (!materialsRef.current[piece]) {
            materialsRef.current[piece] = new THREE.MeshStandardMaterial({
                transparent: true,
                alphaTest: 0.1,
                visible: false,
            });
        }
        return materialsRef.current[piece];
    }

    // Тот же трансформ что в DiDenPro.jsx:
    // внешний group: position + scale (из пропсов, как у DiDenPro)
    // внутренний group: position={[-0.125, -0.8125, 0]} rotation={[Math.PI, 0, Math.PI]}
    // Позиции мешей НЕ прописываем — они уже зашиты в GLTF node translation
    return (
        <group position={position} scale={scale} dispose={null}>
            <group position={[0, -0.8125, 0]} rotation={[Math.PI, 0, Math.PI]}>

                {chestplateNode && (
                    <mesh
                        castShadow
                        geometry={chestplateNode.geometry}
                        material={makeMaterial("chestplate")}
                        position={chestplateNode.position}
                        rotation={chestplateNode.rotation}
                        scale={chestplateNode.scale}
                    />
                )}

                {leggingsNode && (
                    <mesh
                        castShadow
                        geometry={leggingsNode.geometry}
                        material={makeMaterial("leggings")}
                        position={leggingsNode.position}
                        rotation={leggingsNode.rotation}
                        scale={leggingsNode.scale}
                    />
                )}

                {bootsNode && (
                    <mesh
                        castShadow
                        geometry={bootsNode.geometry}
                        material={makeMaterial("boots")}
                        position={bootsNode.position}
                        rotation={bootsNode.rotation}
                        scale={bootsNode.scale}
                    />
                )}

            </group>
        </group>
    );
}

useGLTF.preload("/armor.gltf");
