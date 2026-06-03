'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/data/projects'
import type { ProjectThumbMedia } from '@/lib/projectMedia'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import MediaPlaceholder from '@/components/MediaPlaceholder'

export type ProjectThumbGridItem = {
  project: Project
  media: ProjectThumbMedia
}

function ProjectThumbCard({ project, media }: ProjectThumbGridItem) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [ready, setReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [imageError, setImageError] = useState(false)

  const { brandCover, videoAvailable, thumbSrc } = media
  const staticOnly = Boolean(thumbSrc && (!videoAvailable || brandCover))
  const showVideo = videoAvailable && !brandCover && !videoError
  const showImage =
    Boolean(thumbSrc) &&
    !imageError &&
    (staticOnly || (showVideo && (!ready || videoError)))
  const showPlaceholder = !showImage && !showVideo

  const onEnter = () => {
    if (!showVideo) return
    videoRef.current?.play()
    setHovered(true)
  }

  const onLeave = () => {
    if (!showVideo) return
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
            <MediaPlaceholder className="home-de-thumb-placeholder" label="" />
          )}
          {showImage && thumbSrc && (
            <img
              src={thumbSrc}
              alt={project.title}
              className={
                brandCover
                  ? 'home-de-thumb-cover'
                  : 'home-de-thumb-video home-de-thumb-video--ready'
              }
              onError={() => setImageError(true)}
            />
          )}
          {showVideo && (
            <video
              ref={videoRef}
              className={`home-de-thumb-video${thumbSrc ? (ready ? ' home-de-thumb-video--ready home-de-thumb-video--over-cover' : '') : ' home-de-thumb-video--ready'}`}
              src={mediaAssetPath(project.video)}
              poster={thumbSrc}
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

export default function ProjectThumbGrid({ items }: { items: ProjectThumbGridItem[] }) {
  return (
    <div className="home-de-card-grid">
      {items.map((item) => (
        <ProjectThumbCard key={item.project.slug} {...item} />
      ))}
    </div>
  )
}
