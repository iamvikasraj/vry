'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface Project {
  video?: string
  image?: string
  title: string
  link: string
  description: string
  tags: string[]
}

interface WorkGridProps {
  projects: Project[]
  gridSize?: '1x1' | '2x2'
}

export default function WorkGrid({ projects, gridSize = '2x2' }: WorkGridProps) {
  return (
    <div className={`work-grid work-grid-${gridSize}`}>
      {projects.map((project, index) => (
        <Link
          key={`${project.title}-${project.video || project.image}-${index}`}
          href={project.link}
          className="work-item scroll-reveal"
        >
          <div className="work-item-media">
            {project.video ? (
              <VideoPlayer key={`video-${project.video}-${index}`} src={project.video} />
            ) : project.image ? (
              <img key={`img-${project.image}-${index}`} src={project.image} alt={project.title} />
            ) : null}
            <div className="work-item-overlay">
              <h2 className="work-item-title">{project.title}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current?.closest('.work-item')
    if (!video || !container) return

    // Reset video state when src changes
    setIsLoaded(false)
    video.currentTime = 0
    
    // Force reload the video element
    const currentSrc = video.src
    video.src = ''
    video.src = currentSrc
    
    // Load video metadata immediately - don't wait for scroll
    const loadVideoMetadata = () => {
      video.load()
    }

    // Load immediately when component mounts
    loadVideoMetadata()
    
    // Also ensure video loads after a short delay to handle any race conditions
    const loadTimeout = setTimeout(() => {
      if (video.readyState === 0 || video.readyState === 1) {
        video.load()
      }
    }, 100)

    const handleMouseEnter = () => {
      if (video.readyState >= 2) {
        // Video metadata is loaded, can play
        video.play().catch(() => {
          // Silently fail if autoplay is blocked
        })
      } else {
        // Load and then play
        video.load()
        video.addEventListener('loadeddata', () => {
          video.play().catch(() => {})
        }, { once: true })
      }
    }

    const handleMouseLeave = () => {
      video.pause()
      video.currentTime = 0
    }

    const handleLoadedMetadata = () => {
      // Set to first frame for immediate display
      if (video.readyState >= 1) {
        video.currentTime = 0.1
        setIsLoaded(true)
      }
    }

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(loadTimeout)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplay', handleCanPlay)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [src])

  return (
    <div ref={containerRef} className="video-container">
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        className={`lazy-video ${isLoaded ? 'loaded' : ''}`}
        src={src}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!isLoaded && <div className="video-placeholder" />}
    </div>
  )
}
