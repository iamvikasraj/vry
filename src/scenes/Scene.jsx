import React, { useState, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

// Video Card Component
function VideoCard({ videoSrc, position, index, isActive, onClick }) {
  const meshRef = useRef()
  const [videoDimensions, setVideoDimensions] = useState({ width: 2.4, height: 1.8 }) // 4:3 aspect ratio
  
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
    return tex
  }, [video])

  useFrame(() => {
    if (meshRef.current) {
      // Subtle floating animation for active card
      if (isActive) {
        meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.002) * 0.05
      }
    }
  })

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[videoDimensions.width, videoDimensions.height, 0.02]}
      onClick={onClick}
    >
      <meshStandardMaterial 
        map={texture}
        emissive={isActive ? '#ffffff' : '#000000'}
        emissiveIntensity={isActive ? 0.05 : 0}
        transparent={false}
        side={THREE.DoubleSide}
      />
    </Box>
  )
}

function Scene() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // All 12 videos
  const videos = [
    '/assets/video/1.mp4',
    '/assets/video/2.mp4',
    '/assets/video/3.mp4',
    '/assets/video/4.mp4',
    '/assets/video/5.mp4',
    '/assets/video/6.mp4',
    '/assets/video/7.mp4',
    '/assets/video/8.mp4',
    '/assets/video/9.mp4',
    '/assets/video/10.mp4',
    '/assets/video/perplexity_play.mp4',
    '/assets/video/zomato_weather.mp4'
  ]

  const handleStackClick = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % videos.length)
    
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Calculate positions for stacked cards (showing 3 at once)
  const getCardPosition = (index) => {
    const relativeIndex = (index - currentIndex + videos.length) % videos.length
    const stackOffset = 0.1 // Distance between cards
    const horizontalOffset = 0.3 // Side offset for depth
    
    if (relativeIndex === 0) {
      // Front card (active)
      return [0, 0, 0]
    } else if (relativeIndex === 1) {
      // Second card (behind and slightly offset)
      return [-horizontalOffset, 0, -stackOffset]
    } else if (relativeIndex === 2) {
      // Third card (furthest back)
      return [-horizontalOffset * 1.5, 0, -stackOffset * 2]
    } else {
      // Hidden cards
      return [0, 0, -stackOffset * 3]
    }
  }

  return (
    <>
      {/* Stack of Video Cards */}
      {videos.map((videoSrc, index) => {
        const position = getCardPosition(index)
        const isActive = index === currentIndex
        const isVisible = (index - currentIndex + videos.length) % videos.length < 3
        
        if (!isVisible) return null
        
        return (
          <VideoCard
            key={index}
            videoSrc={videoSrc}
            position={position}
            index={index}
            isActive={isActive}
            onClick={handleStackClick}
          />
        )
      })}
      
      <ambientLight intensity={0.8} color="#ffffff" />
    </>
  )
}

export default Scene
