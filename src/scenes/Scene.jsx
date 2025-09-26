import React, { useState, useMemo } from 'react'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

// Simple Video Card Component
function VideoCard({ videoSrc, position, onClick }) {
  const [videoDimensions, setVideoDimensions] = useState({ width: 1.6, height: 1.2 }) // 4:3 aspect ratio
  
  const video = useMemo(() => {
    const vid = document.createElement('video')
    vid.src = videoSrc
    vid.crossOrigin = 'anonymous'
    vid.loop = true
    vid.muted = true
    vid.playsInline = true
    
    vid.addEventListener('loadedmetadata', () => {
      const aspectRatio = vid.videoWidth / vid.videoHeight
      const baseHeight = 1.2
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

  return (
    <Box
      position={position}
      args={[videoDimensions.width, videoDimensions.height, 0.01]}
      onClick={onClick}
    >
      <meshBasicMaterial 
        map={texture}
        transparent={false}
        side={THREE.DoubleSide}
      />
    </Box>
  )
}

function Scene() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
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

  const handleClick = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  // Horizontal layout - all videos in a row
  const getCardPosition = (index) => {
    const spacing = 2.2 // Distance between videos
    const startX = -(videos.length - 1) * spacing / 2 // Center the row
    
    return [startX + index * spacing, 0, 0]
  }

  return (
    <>
      {/* Horizontal row of all videos */}
      {videos.map((videoSrc, index) => {
        const position = getCardPosition(index)
        
        return (
          <VideoCard
            key={index}
            videoSrc={videoSrc}
            position={position}
            onClick={handleClick}
          />
        )
      })}
      
      <ambientLight intensity={0.8} color="#ffffff" />
    </>
  )
}

export default Scene
