'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/data/projects'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import MediaPlaceholder from '@/components/MediaPlaceholder'

function isBrandCover(coverImage?: string) {
  return Boolean(coverImage?.endsWith('.svg'))
}

function ProjectThumbCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [ready, setReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [coverError, setCoverError] = useState(false)
  const brandCover = isBrandCover(project.coverImage)
  const videoSrc = mediaAssetPath(project.video)
  const hasCover = Boolean(project.coverImage) && !coverError
  const showCoverPhoto = hasCover && (brandCover || !ready || videoError)
  const showPlaceholder =
    (brandCover && (!project.coverImage || coverError)) ||
    (!brandCover && videoError && !hasCover)

  const onEnter = () => {
    if (brandCover || showPlaceholder) return
    videoRef.current?.play()
    setHovered(true)
  }

  const onLeave = () => {
    if (brandCover || showPlaceholder) return
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
        <div
          className={`home-de-thumb-media${brandCover ? ' home-de-thumb-media--brand' : ''}`}
        >
          {showPlaceholder && (
            <MediaPlaceholder
              className="home-de-thumb-placeholder"
              label="Preview coming soon"
            />
          )}
          {showCoverPhoto && project.coverImage && (
            <img
              src={project.coverImage}
              alt={project.title}
              className={
                brandCover
                  ? 'home-de-thumb-cover'
                  : 'home-de-thumb-video home-de-thumb-video--ready'
              }
              onError={() => setCoverError(true)}
            />
          )}
          {!brandCover && !showPlaceholder && !videoError && (
            <video
              ref={videoRef}
              className={`home-de-thumb-video${project.coverImage ? (ready ? ' home-de-thumb-video--ready home-de-thumb-video--over-cover' : '') : ' home-de-thumb-video--ready'}`}
              src={videoSrc}
              poster={project.coverImage}
              muted
              autoPlay
              playsInline
              loop
              preload="auto"
              onLoadedData={() => setReady(true)}
              onLoadedMetadata={() => setReady(true)}
              onCanPlay={() => setReady(true)}
              onError={() => setVideoError(true)}
            />
          )}
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
      {projects.map((p) => (
        <ProjectThumbCard key={p.slug} project={p} />
      ))}
    </div>
  )
}
