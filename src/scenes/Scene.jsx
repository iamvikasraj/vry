import React, { useRef, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Box, Text, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Video Installation Component
function VideoInstallation({ position, videoSrc, title, description, index }) {
  const meshRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  
  // Create video element
  const video = useMemo(() => {
    const vid = document.createElement('video')
    vid.src = videoSrc
    vid.crossOrigin = 'anonymous'
    vid.loop = true
    vid.muted = true
    vid.playsInline = true
    return vid
  }, [videoSrc])

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

  useFrame(() => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + index) * 0.1
      
      // Hover effect
      if (hovered) {
        meshRef.current.scale.setScalar(1.1)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group position={position}>
      {/* Video Screen */}
      <Box
        ref={meshRef}
        args={[2.5, 1.5, 0.1]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          map={texture}
          emissive={isPlaying ? '#ffffff' : '#000000'}
          emissiveIntensity={isPlaying ? 0.2 : 0}
        />
      </Box>
      
      {/* Frame */}
      <Box position={[0, 0, -0.06]} args={[2.7, 1.7, 0.05]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      
      {/* Title */}
      <Text
        position={[0, -1.2, 0.1]}
        fontSize={0.2}
        color={hovered ? '#ffffff' : '#888888'}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
      
      {/* Play/Pause Indicator */}
      <Text
        position={[0, 0, 0.2]}
        fontSize={0.3}
        color={isPlaying ? '#ff6b6b' : '#4ecdc4'}
        anchorX="center"
        anchorY="middle"
      >
        {isPlaying ? '⏸️' : '▶️'}
      </Text>
    </group>
  )
}

function Scene() {
  const { camera } = useThree()
  
  // Gallery layout - videos arranged in a grid
  const installations = [
    { video: '/assets/video/1.mp4', title: 'Project 1', description: 'Interactive Design' },
    { video: '/assets/video/2.mp4', title: 'Project 2', description: 'UI/UX Innovation' },
    { video: '/assets/video/3.mp4', title: 'Project 3', description: 'Creative Technology' },
    { video: '/assets/video/4.mp4', title: 'Project 4', description: 'Digital Experience' },
    { video: '/assets/video/5.mp4', title: 'Project 5', description: 'Visual Storytelling' },
    { video: '/assets/video/6.mp4', title: 'Project 6', description: 'Brand Identity' },
    { video: '/assets/video/7.mp4', title: 'Project 7', description: 'Motion Graphics' },
    { video: '/assets/video/8.mp4', title: 'Project 8', description: 'Web Development' },
    { video: '/assets/video/9.mp4', title: 'Project 9', description: 'App Design' },
    { video: '/assets/video/10.mp4', title: 'Project 10', description: 'Creative Direction' },
    { video: '/assets/video/perplexity_play.mp4', title: 'Perplexity', description: 'AI Integration' },
    { video: '/assets/video/zomato_weather.mp4', title: 'Zomato Weather', description: 'Data Visualization' },
  ]

  // Calculate grid positions
  const getGridPosition = (index) => {
    const cols = 4
    const spacing = 4
    const row = Math.floor(index / cols)
    const col = index % cols
    return [
      (col - (cols - 1) / 2) * spacing,
      0,
      (row - (installations.length / cols - 1) / 2) * spacing
    ]
  }

  return (
    <>
      {/* Gallery Environment */}
      <Environment preset="warehouse" />
      
      {/* Gallery Floor */}
      <Box position={[0, -2, 0]} args={[20, 0.1, 20]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
      
      {/* Gallery Ceiling */}
      <Box position={[0, 4, 0]} args={[20, 0.1, 20]}>
        <meshStandardMaterial color="#0a0a0a" />
      </Box>
      
      {/* Gallery Walls */}
      <Box position={[10, 1, 0]} args={[0.1, 6, 20]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      <Box position={[-10, 1, 0]} args={[0.1, 6, 20]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      <Box position={[0, 1, 10]} args={[20, 6, 0.1]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      <Box position={[0, 1, -10]} args={[20, 6, 0.1]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      
      {/* Video Installations */}
      {installations.map((installation, index) => (
        <VideoInstallation
          key={index}
          position={getGridPosition(index)}
          videoSrc={installation.video}
          title={installation.title}
          description={installation.description}
          index={index}
        />
      ))}
      
      {/* Gallery Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 10, 0]} intensity={0.8} />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffffff" />
      
      {/* Spotlights for each installation */}
      {installations.map((_, index) => {
        const pos = getGridPosition(index)
        return (
          <spotLight
            key={`light-${index}`}
            position={[pos[0], 3, pos[2]]}
            angle={0.3}
            penumbra={0.5}
            intensity={0.4}
            color="#ffffff"
            target-position={[pos[0], 0, pos[2]]}
          />
        )
      })}
    </>
  )
}

export default Scene
