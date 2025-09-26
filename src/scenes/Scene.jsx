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
      
     
      
      <ambientLight intensity={1.0} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </>
  )
}

export default Scene
