'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/data/projects'
import type { ProjectThumbMedia } from '@/lib/projectMedia'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import { projectHref } from '@/lib/projectHref'
import MediaPlaceholder from '@/components/MediaPlaceholder'

export type ProjectThumbGridItem = {
  project: Project
  media: ProjectThumbMedia
}

type ProjectThumbCardProps = ProjectThumbGridItem & {
  /** Play video on hover (Playground); autoplay when false. */
  playOnHover?: boolean
}

export function ProjectThumbCard({ project, media, playOnHover = false }: ProjectThumbCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [ready, setReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [imageError, setImageError] = useState(false)

  const { brandCover, thumbSrc, videoAvailable } = media
  const hasPoster = Boolean(thumbSrc)
  const staticOnly = Boolean(thumbSrc && (!videoAvailable || brandCover))
  const showVideo = videoAvailable && !brandCover && !videoError
  const showImage =
    Boolean(thumbSrc) &&
    !imageError &&
    (staticOnly ||
      !showVideo ||
      (playOnHover && !hovered) ||
      (showVideo && (!ready || videoError)))
  const showPlaceholder = (!showImage && !showVideo) || (showVideo && videoError && !hasPoster)
  const videoReady = !hasPoster || ready

  const onEnter = () => {
    if (!playOnHover || !showVideo) return
    videoRef.current?.play()
    setHovered(true)
  }

  const onLeave = () => {
    if (!playOnHover || !showVideo) return
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setHovered(false)
  }

  return (
    <article className="home-de-thumb-wrap">
      <Link
        href={projectHref(project.slug)}
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
              className={`home-de-thumb-video${hasPoster && playOnHover && ready ? ' home-de-thumb-video--ready home-de-thumb-video--over-cover' : ''}${videoReady ? ' home-de-thumb-video--ready' : ''}`}
              src={mediaAssetPath(project.video)}
              poster={thumbSrc}
              muted
              autoPlay={!playOnHover}
              playsInline
              loop
              preload={playOnHover && hasPoster ? 'metadata' : 'auto'}
              onLoadedData={() => setReady(true)}
              onLoadedMetadata={() => setReady(true)}
              onCanPlay={() => setReady(true)}
              onError={() => setVideoError(true)}
            />
          )}
        </div>
        <div className="home-de-thumb-caption">
          <h2 className="home-de-thumb-title">{project.title}</h2>
          <p className="home-de-thumb-meta">{project.metaLabel ?? project.category}</p>
        </div>
      </Link>
    </article>
  )
}

type ProjectThumbGridProps = {
  items: ProjectThumbGridItem[]
  playOnHover?: boolean
  gridClassName?: string
}

export default function ProjectThumbGrid({
  items,
  playOnHover = false,
  gridClassName,
}: ProjectThumbGridProps) {
  return (
    <div className={`home-de-card-grid${gridClassName ? ` ${gridClassName}` : ''}`}>
      {items.map((item) => (
        <ProjectThumbCard key={item.project.slug} {...item} playOnHover={playOnHover} />
      ))}
    </div>
  )
}
