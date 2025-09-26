import React, { useState, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Text } from '@react-three/drei'
import * as THREE from 'three'

// Stacked Video Card Component
function StackedVideoCard({ videoSrc, position, stackIndex, cardIndex, onClick }) {
  const meshRef = useRef()
  const [videoDimensions, setVideoDimensions] = useState({ width: 2.4, height: 1.8 })
  const [hovered, setHovered] = useState(false)
  
  const video = useMemo(() => {
    const vid = document.createElement('video')
    vid.src = videoSrc
    vid.crossOrigin = 'anonymous'
    vid.loop = true
    vid.muted = true
    vid.playsInline = true
    
    vid.addEventListener('loadedmetadata', () => {
      const aspectRatio = vid.videoWidth / vid.videoHeight
      const baseHeight = 1.8
      const width = baseHeight * aspectRatio
      setVideoDimensions({ width, height: baseHeight })
    })
    
    return vid
  }, [videoSrc])

  const texture = useMemo(() => {
    const tex = new THREE.VideoTexture(video)
    tex.flipY = true
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = false
    tex.wrapS = THREE.ClampToEdgeWrapping
    tex.wrapT = THREE.ClampToEdgeWrapping
    tex.format = THREE.RGBAFormat
    return tex
  }, [video])

  useFrame(() => {
    if (meshRef.current && hovered) {
      // Subtle hover animation
      meshRef.current.position.y = position[1] + 0.1
      meshRef.current.rotation.z = Math.sin(Date.now() * 0.003) * 0.02
    } else if (meshRef.current) {
      meshRef.current.position.y = position[1]
      meshRef.current.rotation.z = 0
    }
  })

  return (
    <group position={position}>
      {/* Card Background */}
      <Box
        ref={meshRef}
        args={[videoDimensions.width + 0.2, videoDimensions.height + 0.2, 0.05]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? "#f0f0f0" : "#ffffff"}
          metalness={0}
          roughness={0.1}
        />
      </Box>
      
      {/* Video Surface */}
      <Box
        position={[0, 0, 0.03]}
        args={[videoDimensions.width, videoDimensions.height, 0.01]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshBasicMaterial 
          map={texture}
          transparent={false}
          side={THREE.DoubleSide}
        />
      </Box>
      
      {/* Card Label */}
      <Text
        position={[0, -videoDimensions.height/2 - 0.3, 0.06]}
        fontSize={0.15}
        color="#666666"
        anchorX="center"
        anchorY="middle"
      >
        Project {cardIndex + 1}
      </Text>
    </group>
  )
}

function Scene() {
  const [currentStack, setCurrentStack] = useState(0)
  
  // Organize videos into stacks
  const videoStacks = [
    [
      '/assets/video/1.mp4',
      '/assets/video/2.mp4',
      '/assets/video/3.mp4',
      '/assets/video/4.mp4'
    ],
    [
      '/assets/video/5.mp4',
      '/assets/video/6.mp4',
      '/assets/video/7.mp4',
      '/assets/video/8.mp4'
    ],
    [
      '/assets/video/9.mp4',
      '/assets/video/10.mp4',
      '/assets/video/perplexity_play.mp4',
      '/assets/video/zomato_weather.mp4'
    ]
  ]

  const handleStackClick = () => {
    setCurrentStack((prev) => (prev + 1) % videoStacks.length)
  }

  // Calculate positions for stacked cards
  const getStackPosition = (stackIndex) => {
    const stackSpacing = 4
    const startX = -(videoStacks.length - 1) * stackSpacing / 2
    return [startX + stackIndex * stackSpacing, 0, 0]
  }

  const getCardPosition = (stackIndex, cardIndex) => {
    const stackPos = getStackPosition(stackIndex)
    const cardOffset = 0.1
    const angleOffset = 0.05
    
    return [
      stackPos[0] + cardIndex * cardOffset,
      stackPos[1] + cardIndex * cardOffset,
      stackPos[2] - cardIndex * cardOffset
    ]
  }

  return (
    <>
      {/* Navigation Labels */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.3}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Portfolio
      </Text>
      
      {/* Video Stacks */}
      {videoStacks.map((stack, stackIndex) => (
        <group key={stackIndex}>
          {stack.map((videoSrc, cardIndex) => {
            const position = getCardPosition(stackIndex, cardIndex)
            const isVisible = cardIndex < 4 // Show up to 4 cards per stack
            
            if (!isVisible) return null
            
            return (
              <StackedVideoCard
                key={`${stackIndex}-${cardIndex}`}
                videoSrc={videoSrc}
                position={position}
                stackIndex={stackIndex}
                cardIndex={cardIndex}
                onClick={handleStackClick}
              />
            )
          })}
        </group>
      ))}
      
      {/* Bottom Navigation */}
      <Text
        position={[0, -3, 0]}
        fontSize={0.25}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Click to explore
      </Text>
      
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />
    </>
  )
}

export default Scene
