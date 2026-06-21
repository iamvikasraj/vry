'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/data/projects'
import type { ProjectThumbMedia } from '@/lib/projectMedia'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import { projectHref } from '@/lib/projectHref'
import MediaPlaceholder from '@/components/MediaPlaceholder'

type ProjectListLinkProps = {
  project: Project
  media: ProjectThumbMedia
  /** Play video on hover (Playground); static thumb on company chapters. */
  playOnHover?: boolean
  /** Full-width card in the Interactions grid. */
  featured?: boolean
}

export default function ProjectListLink({
  project,
  media,
  playOnHover = false,
  featured = false,
}: ProjectListLinkProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [ready, setReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [imageError, setImageError] = useState(false)

  const { brandCover, thumbSrc, videoAvailable } = media
  const hasPoster = Boolean(thumbSrc)
  const meta = project.metaLabel ?? project.category
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
  /** Video-only thumbs (Playground) stay visible like grid cards; hide only while loading over a poster. */
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
    <Link
      href={projectHref(project.slug)}
      className={`home-de-project-list__link home-de-media-card${hovered ? ' home-de-project-list__link--hover' : ''}${
        featured ? ' home-de-project-list__link--featured' : ''
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label={`View project: ${project.title}`}
    >
      <div
        className={`home-de-project-list__thumb${hasPoster ? ' home-de-project-list__thumb--has-poster' : ''}${brandCover && showImage ? ' home-de-project-list__thumb--brand' : ''}`}
      >
        {showPlaceholder && (
          <MediaPlaceholder className="home-de-project-list__placeholder" label="" />
        )}
        {showImage && thumbSrc && (
          <img
            src={thumbSrc}
            alt=""
            className={brandCover ? 'home-de-project-list__cover' : 'home-de-project-list__image'}
            onError={() => setImageError(true)}
          />
        )}
        {showVideo && (
          <video
            ref={videoRef}
            className={`home-de-project-list__image${hasPoster && playOnHover && ready ? ' home-de-project-list__image--over-cover' : ''}${videoReady ? ' home-de-project-list__image--ready' : ''}`}
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
        <span className="home-de-media-caption">
          <span className="home-de-media-caption__title">{project.title}</span>
          {meta ? <span className="home-de-media-caption__meta">{meta}</span> : null}
        </span>
      </div>
      <span className="home-de-project-list__text">
        <span className="home-de-project-list__title">{project.title}</span>
        {meta ? <span className="home-de-project-list__meta">{meta}</span> : null}
      </span>
      <span className="home-de-project-list__cta" aria-hidden="true">
        →
      </span>
    </Link>
  )
}
