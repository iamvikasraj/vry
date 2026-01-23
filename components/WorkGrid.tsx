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
  gridSize?: '2x2' | '4x4'
}

export default function WorkGrid({ projects, gridSize = '2x2' }: WorkGridProps) {
  return (
    <div className={`work-grid work-grid-${gridSize}`}>
      {projects.map((project, index) => (
        <Link
          key={index}
          href={project.link}
          className="work-item scroll-reveal"
        >
          <div className="work-item-media">
            {project.video ? (
              <VideoPlayer src={project.video} />
            ) : project.image ? (
              <img src={project.image} alt={project.title} />
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

    // Load video metadata immediately for faster first frame display
    const loadVideoMetadata = () => {
      if (video.readyState === 0) {
        video.load()
      }
    }

    // Load immediately when component mounts
    loadVideoMetadata()

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
        preload="metadata"
        className={`lazy-video ${isLoaded ? 'loaded' : ''}`}
        src={src}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!isLoaded && <div className="video-placeholder" />}
    </div>
  )
}
