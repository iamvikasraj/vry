import React, { useState, useMemo } from 'react'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

function VideoSurface() {
  const [isPlaying, setIsPlaying] = useState(false)
  
  const video = useMemo(() => {
    const vid = document.createElement('video')
    vid.src = '/assets/video/perplexity_play.mp4'
    vid.crossOrigin = 'anonymous'
    vid.loop = true
    vid.muted = true
    vid.playsInline = true
    return vid
  }, [])

  const texture = useMemo(() => {
    const tex = new THREE.VideoTexture(video)
    tex.flipY = true
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
      <VideoSurface />
      <ambientLight intensity={0.8} color="#ffffff" />
    </>
  )
}

export default Scene
