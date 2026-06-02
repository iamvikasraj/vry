'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/data/projects'
import MediaPlaceholder from '@/components/MediaPlaceholder'

function ProjectThumbCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const showPlaceholder = !ready || error

  const onEnter = () => {
    videoRef.current?.play()
    setHovered(true)
  }
  const onLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setHovered(false)
  }

  return (
    <article className="home-de-thumb-wrap">
      <Link
        href={`/projects/${project.slug}`}
        className={`home-de-thumb${hovered ? ' home-de-thumb--hover' : ''}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div className="home-de-thumb-media">
          {showPlaceholder && <MediaPlaceholder />}
          <video
            ref={videoRef}
            className={`home-de-thumb-video${ready && !error ? ' home-de-thumb-video--ready' : ''}`}
            src={project.video}
            muted
            autoPlay
            playsInline
            loop
            preload="metadata"
            onLoadedData={() => setReady(true)}
            onError={() => setError(true)}
          />
        </div>
        <div className="home-de-thumb-caption">
          <h2 className="home-de-thumb-title">{project.title}</h2>
          <p className="home-de-thumb-meta">
            {project.metaLabel ?? project.category}
            {project.year ? ` · ${project.year}` : ''}
          </p>
        </div>
      </Link>
    </article>
  )
}

export default function ProjectThumbGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="home-de-card-grid">
      {projects.map(p => (
        <ProjectThumbCard key={p.slug} project={p} />
      ))}
    </div>
  )
}
