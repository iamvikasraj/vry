import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Torus } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main geometric shapes */}
      <Box position={[-2, 0, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="#ff6b6b" />
      </Box>
      
      <Sphere position={[0, 0, 0]} args={[0.8, 32, 32]}>
        <meshStandardMaterial color="#4ecdc4" />
      </Sphere>
      
      <Torus position={[2, 0, 0]} args={[0.6, 0.2, 16, 32]}>
        <meshStandardMaterial color="#45b7d1" />
      </Torus>
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </group>
  )
}

export default Scene
