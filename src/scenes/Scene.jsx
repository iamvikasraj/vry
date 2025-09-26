import React from 'react'
import { Text } from '@react-three/drei'

function Scene() {
  return (
    <>
      <Text
        position={[0, 0, 0]}
        fontSize={1.2}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        maxWidth={10}
        textAlign="center"
      >
        MultiDisciplinary Designer
      </Text>
      
      <ambientLight intensity={0.8} color="#ffffff" />
    </>
  )
}

export default Scene
