import React, { useState, useMemo } from 'react'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoDimensions, setVideoDimensions] = useState({ width: 2.4, height: 1.8 })
  
  const video = useMemo(() => {
    const vid = document.createElement('video')
    vid.src = '/assets/video/perplexity_play.mp4'
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
  }, [])

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
    <>
      <Box
        position={[0, 0, 0]}
        args={[videoDimensions.width, videoDimensions.height, 0.01]}
        onClick={handleClick}
      >
        <meshBasicMaterial 
          map={texture}
          transparent={false}
          side={THREE.DoubleSide}
        />
      </Box>
      
      <ambientLight intensity={0.8} color="#ffffff" />
    </>
  )
}

export default Scene
