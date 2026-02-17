import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function DiDenPro(props) {
  const { nodes, materials } = useGLTF('/DiDenPro/DiDenPro.gltf')
  return (
    <group {...props} dispose={null}>
      <group position={[-0.125, -0.813, 0]} rotation={[Math.PI, 0, Math.PI]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leftLeg.geometry}
          material={nodes.leftLeg.material}
          position={[-0.25, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rightLeg.geometry}
          material={nodes.rightLeg.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rightArm.geometry}
          material={nodes.rightArm.material}
          position={[0.219, 0.75, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leftArm.geometry}
          material={nodes.leftArm.material}
          position={[-0.469, 0.75, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body.geometry}
          material={nodes.body.material}
          position={[-0.125, 0.75, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.head.geometry}
          material={nodes.head.material}
          position={[-0.125, 1.5, 0]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/DiDenPro/DiDenPro.gltf')