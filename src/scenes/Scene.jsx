import React, { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Text } from '@react-three/drei'
import * as THREE from 'three'

// Wall-mounted Video Installation Component
function WallVideoInstallation({ wall, position, videoSrc, title, index }) {
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
    if (meshRef.current && hovered) {
      // Subtle hover animation
      meshRef.current.scale.setScalar(1.05)
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1)
    }
  })

  // Position the video on the wall
  const wallPosition = useMemo(() => {
    const [x, y, z] = position
    const offset = 0.01 // Slightly in front of wall
    
    switch (wall) {
      case 'front':
        return [x, y, 10 + offset]
      case 'back':
        return [x, y, -10 - offset]
      case 'left':
        return [-10 - offset, y, z]
      case 'right':
        return [10 + offset, y, z]
      default:
        return position
    }
  }, [wall, position])

  return (
    <group position={wallPosition}>
      {/* Video Screen */}
      <Box
        ref={meshRef}
        args={[2, 1.2, 0.05]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          map={texture}
          emissive={isPlaying ? '#ffffff' : '#000000'}
          emissiveIntensity={isPlaying ? 0.1 : 0}
        />
      </Box>
      
      {/* Frame */}
      <Box position={[0, 0, -0.03]} args={[2.1, 1.3, 0.02]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
      
      {/* Title */}
      <Text
        position={[0, -0.8, 0.06]}
        fontSize={0.15}
        color={hovered ? '#ffffff' : '#666666'}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
      
      {/* Play/Pause Indicator */}
      <Text
        position={[0, 0, 0.08]}
        fontSize={0.2}
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
  // Reduced number of videos for better performance
  const installations = [
    { video: '/assets/video/1.mp4', title: 'Project 1' },
    { video: '/assets/video/2.mp4', title: 'Project 2' },
    { video: '/assets/video/3.mp4', title: 'Project 3' },
    { video: '/assets/video/4.mp4', title: 'Project 4' },
    { video: '/assets/video/5.mp4', title: 'Project 5' },
    { video: '/assets/video/perplexity_play.mp4', title: 'Perplexity' },
    { video: '/assets/video/zomato_weather.mp4', title: 'Zomato Weather' },
    { video: '/assets/video/clock.mp4', title: 'Clock Animation' },
  ]

  // Wall positions for videos
  const getWallPosition = (index) => {
    const videosPerWall = 2
    const wallIndex = Math.floor(index / videosPerWall)
    const videoIndex = index % videosPerWall
    
    const walls = ['front', 'right', 'back', 'left']
    const wall = walls[wallIndex % walls.length]
    
    switch (wall) {
      case 'front':
        return [videoIndex * 4 - 2, 0, 0]
      case 'right':
        return [0, 0, videoIndex * 4 - 2]
      case 'back':
        return [videoIndex * 4 - 2, 0, 0]
      case 'left':
        return [0, 0, videoIndex * 4 - 2]
      default:
        return [0, 0, 0]
    }
  }

  return (
    <>
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
      
      {/* Wall-mounted Video Installations */}
      {installations.map((installation, index) => {
        const wallIndex = Math.floor(index / 2)
        const walls = ['front', 'right', 'back', 'left']
        const wall = walls[wallIndex % walls.length]
        const position = getWallPosition(index)
        
        return (
          <WallVideoInstallation
            key={index}
            wall={wall}
            position={position}
            videoSrc={installation.video}
            title={installation.title}
            index={index}
          />
        )
      })}
      
      {/* Gallery Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 10, 0]} intensity={0.6} />
      <pointLight position={[0, 2, 0]} intensity={0.3} color="#ffffff" />
    </>
  )
}

export default Scene
