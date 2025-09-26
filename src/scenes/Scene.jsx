import React, { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Text, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Rotating Video Surface Component
function RotatingVideoSurface() {
  const meshRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  
  // Create video element
  const video = useMemo(() => {
    const vid = document.createElement('video')
    vid.src = '/assets/video/perplexity_play.mp4' // Using your best video
    vid.crossOrigin = 'anonymous'
    vid.loop = true
    vid.muted = true
    vid.playsInline = true
    return vid
  }, [])

  // Create video texture
  const texture = useMemo(() => {
    const tex = new THREE.VideoTexture(video)
    tex.flipY = false
    return tex
  }, [video])

  const handleClick = () => {
    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    } else {
      video.play()
      setIsPlaying(true)
    }
  }

  useFrame((state) => {
    if (meshRef.current) {
      // Continuous rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      
      // Subtle floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
      
      // Hover effect
      if (hovered) {
        meshRef.current.scale.setScalar(1.1)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Main Video Surface */}
      <Box
        ref={meshRef}
        args={[3, 2, 0.1]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          map={texture}
          emissive={isPlaying ? '#ffffff' : '#000000'}
          emissiveIntensity={isPlaying ? 0.3 : 0}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>
      
      {/* Reflective Base */}
      <Box position={[0, -1.5, 0]} args={[4, 0.1, 4]}>
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
        />
      </Box>
      
      {/* Play/Pause Indicator */}
      <Text
        position={[0, 0, 0.2]}
        fontSize={0.4}
        color={isPlaying ? '#ff6b6b' : '#4ecdc4'}
        anchorX="center"
        anchorY="middle"
      >
        {isPlaying ? '⏸️' : '▶️'}
      </Text>
      
      {/* Title */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.2}
        color={hovered ? '#ffffff' : '#888888'}
        anchorX="center"
        anchorY="middle"
      >
        Perplexity AI Project
      </Text>
    </group>
  )
}

function Scene() {
  return (
    <>
      {/* Environment for reflections */}
      <Environment preset="studio" />
      
      {/* Reflective Floor */}
      <Box position={[0, -3, 0]} args={[20, 0.1, 20]}>
        <meshStandardMaterial 
          color="#0a0a0a"
          metalness={0.8}
          roughness={0.1}
        />
      </Box>
      
      {/* Rotating Video Surface */}
      <RotatingVideoSurface />
      
      {/* Dramatic Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#4ecdc4" />
      <spotLight 
        position={[0, 8, 0]} 
        angle={0.3} 
        penumbra={0.5} 
        intensity={0.8} 
        color="#ffffff"
        target-position={[0, 0, 0]}
      />
    </>
  )
}

export default Scene
