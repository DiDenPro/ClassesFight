import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { DiDenPro } from "../models/DiDenPro";
import { ArmorModel } from "./ArmorModel";
import { CameraLogger } from "./helper";
import { CharacterData } from "../data/characters";

interface Props {
    character: CharacterData;
}

export function Preview3D({ character }: Props){
    return (
        <div className="preview-3d">
            <Canvas camera={{ position: [2.35, 0.14, 2.5], fov: 50 }}>
                <ambientLight intensity={0.9} />
                <directionalLight position={[4, 4, 4]} intensity={1.2} />

                {/* Тело персонажа */}
                <DiDenPro position={[0, -0.2, 0]} scale={1} />

                {/* Броня — рендерится только если задана в данных персонажа */}
                {character.armor && (
                    <ArmorModel
                        armor={character.armor}
                        position={[0, -0.2, 0]}
                        scale={1}
                    />
                )}

                <OrbitControls
                    target={[0, 0, 0]}
                    enablePan={false}
                />
                <CameraLogger />
            </Canvas>
        </div>
    );
}
