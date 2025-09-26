import React from 'react'
import { Text } from '@react-three/drei'

function Scene() {
  return (
    <>
      {/* Main Text */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.6}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        maxWidth={6}
        textAlign="center"
      >
        MultiDisciplinary Designer
      </Text>
      
      {/* Shadow Text on Ground */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.6}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        maxWidth={6}
        textAlign="center"
        rotation={[Math.PI / 2, 0, 0]}
        opacity={0.08}
      >
        MultiDisciplinary Designer
      </Text>
      
      {/* Ground Plane */}
      <mesh position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
      </mesh>
      
      <ambientLight intensity={1.0} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </>
  )
}

export default Scene
