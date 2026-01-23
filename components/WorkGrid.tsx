'use client'

import { useEffect, useRef } from 'react'
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

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current?.closest('.work-item')
    if (!video || !container) return

    const handleMouseEnter = () => {
      video.play().catch(() => {
        // Silently fail if autoplay is blocked
      })
    }

    const handleMouseLeave = () => {
      video.pause()
      video.currentTime = 0
    }

    const handleLoadedMetadata = () => {
      video.currentTime = 0.1
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    video.load()

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [src])

  return (
    <div ref={containerRef}>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        className="lazy-video"
        src={src}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}
