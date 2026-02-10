import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

import { Model as Steve } from "../models/Steve";

export function Preview3D(){
    return (
        <div className="preview-3d">
            <Canvas camera ={{ position: [-50, 32, 60], fov: 50}}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Steve scale={1}/>
                <OrbitControls enableZoom />
            </Canvas>
        </div>
    );
};