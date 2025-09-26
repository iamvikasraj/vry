import React, { useState, useMemo, useEffect } from 'react'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

function VideoSurface() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoDimensions, setVideoDimensions] = useState({ width: 16, height: 9 }) // Default 16:9
  
  const video = useMemo(() => {
    const vid = document.createElement('video')
    vid.src = '/assets/video/perplexity_play.mp4'
    vid.crossOrigin = 'anonymous'
    vid.loop = true
    vid.muted = true
    vid.playsInline = true
    
    // Get video dimensions when loaded
    vid.addEventListener('loadedmetadata', () => {
      const aspectRatio = vid.videoWidth / vid.videoHeight
      const baseHeight = 2 // Base height in 3D units
      const width = baseHeight * aspectRatio
      setVideoDimensions({ width, height: baseHeight })
    })
    
    return vid
  }, [])

  const texture = useMemo(() => {
    const tex = new THREE.VideoTexture(video)
    tex.flipY = true
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.generateMipmaps = false
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

  return (
    <Box
      args={[videoDimensions.width, videoDimensions.height, 0.01]}
      onClick={handleClick}
    >
      <meshStandardMaterial 
        map={texture}
        emissive={isPlaying ? '#ffffff' : '#000000'}
        emissiveIntensity={isPlaying ? 0.1 : 0}
        transparent={false}
        side={THREE.DoubleSide}
      />
    </Box>
  )
}

function Scene() {
  return (
    <>
      <VideoSurface />
      <ambientLight intensity={0.8} color="#ffffff" />
    </>
  )
}

export default Scene
