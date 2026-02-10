import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

import { DiDenPro } from "../models/DiDenPro";

import { CameraLogger } from "./helper";

export function Preview3D(){
    return (
        <div className="preview-3d">
            <Canvas camera ={{ position: [2.35, 0.14, 2.5], fov: 50}}>
                <ambientLight intensity={0.9} />
                <directionalLight position={[4, 4, 4]} intensity={1.2} />
                
                <DiDenPro position={[0, -0.2, 0]} scale={1}/>
                <OrbitControls  
                    target={[0, 0, 0]}
                    enablePan={false}
                />
                <CameraLogger></CameraLogger>
            </Canvas>
        </div>
    );
};