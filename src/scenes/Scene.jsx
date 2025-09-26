import React, { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

// Super Lightweight Rotating Video Surface
function RotatingVideoSurface() {
  const meshRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Create video element
  const video = useMemo(() => {
    const vid = document.createElement('video')
    vid.src = '/assets/video/perplexity_play.mp4'
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
      // Simple rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Box
      ref={meshRef}
      args={[2, 1.5, 0.05]}
      onClick={handleClick}
    >
      <meshStandardMaterial 
        map={texture}
        emissive={isPlaying ? '#ffffff' : '#000000'}
        emissiveIntensity={isPlaying ? 0.2 : 0}
      />
    </Box>
  )
}

function Scene() {
  return (
    <>
      {/* Simple Floor */}
      <Box position={[0, -2, 0]} args={[10, 0.1, 10]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
      
      {/* Rotating Video Surface */}
      <RotatingVideoSurface />
      
      {/* Minimal Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
    </>
  )
}

export default Scene
