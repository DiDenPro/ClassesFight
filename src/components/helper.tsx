import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function CameraLogger() {
  const { camera } = useThree();

  useEffect(() => {
    const log = () => {
      console.log("camera.position =", camera.position.toArray());
    };

    window.addEventListener("mouseup", log);
    return () => window.removeEventListener("mouseup", log);
  }, [camera]);

  return null;
}
