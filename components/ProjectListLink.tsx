'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { analytics } from '@/lib/analytics'
import type { Project } from '@/data/projects'
import type { ProjectThumbMedia } from '@/lib/projectMedia'
import { getProjectCardMeta } from '@/lib/projectCardMeta'
import { useCanHover } from '@/lib/useCanHover'
import { useViewportVideo } from '@/lib/useViewportVideo'
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
  /** Cover letter / highlight — primary line; project title moves to meta */
  impact?: string
}

export default function ProjectListLink({
  project,
  media,
  playOnHover = false,
  featured = false,
  impact,
}: ProjectListLinkProps) {
  const canHover = useCanHover()
  const hoverPlay = playOnHover && canHover
  const autoPlay = !hoverPlay
  const thumbRef = useRef<HTMLDivElement>(null)
  const videoSrc = mediaAssetPath(project.video)
  const { videoRef, videoSrc: lazySrc, preload, shouldAutoplay } = useViewportVideo(thumbRef, {
    src: videoSrc,
    lazy: autoPlay,
    autoplayInView: autoPlay,
    pauseOffscreen: autoPlay,
  })
  const [hovered, setHovered] = useState(false)
  const [ready, setReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [imageError, setImageError] = useState(false)

  const { brandCover, thumbSrc, videoAvailable } = media
  const hasPoster = Boolean(thumbSrc)
  const meta = getProjectCardMeta(project)
  const staticOnly = Boolean(thumbSrc && (!videoAvailable || brandCover))
  const showVideo = videoAvailable && !brandCover && !videoError
  const showImage =
    Boolean(thumbSrc) &&
    !imageError &&
      (staticOnly ||
      !showVideo ||
      (hoverPlay && !hovered) ||
      (showVideo && (!ready || videoError)))
  const showPlaceholder = (!showImage && !showVideo) || (showVideo && videoError && !hasPoster)
  /** Video-only thumbs (Playground) stay visible like grid cards; hide only while loading over a poster. */
  const videoReady = !hasPoster || ready

  const onEnter = () => {
    if (!hoverPlay || !showVideo) return
    analytics.trackVideoHover(project.title)
    void videoRef.current?.play()?.then(() => {
      if (project.video) analytics.trackVideoPlay(project.title, mediaAssetPath(project.video))
    })
    setHovered(true)
  }

  const onLeave = () => {
    if (!hoverPlay || !showVideo) return
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
      onClick={() => analytics.trackProjectClick(project.title, project.slug, project.tags)}
      aria-label={`View project: ${project.title}`}
    >
      <div
        ref={thumbRef}
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
            className={`home-de-project-list__image${hasPoster && hoverPlay && ready ? ' home-de-project-list__image--over-cover' : ''}${videoReady ? ' home-de-project-list__image--ready' : ''}`}
            src={autoPlay ? lazySrc : videoSrc}
            poster={thumbSrc}
            muted
            autoPlay={shouldAutoplay}
            playsInline
            loop
            preload={hoverPlay && hasPoster ? 'metadata' : preload}
            onLoadedData={() => setReady(true)}
            onLoadedMetadata={() => setReady(true)}
            onCanPlay={() => setReady(true)}
            onError={() => setVideoError(true)}
          />
        )}
      </div>
      <span className="home-de-media-caption home-de-media-caption--below">
        <span className="home-de-media-caption__title">{project.title}</span>
      </span>
      <span className="home-de-project-list__text">
        {impact ? (
          <>
            <span className="home-de-project-list__impact">{impact}</span>
            <span className="home-de-project-list__meta">
              {project.title}
              {meta ? ` · ${meta}` : ''}
            </span>
          </>
        ) : (
          <>
            <span className="home-de-project-list__title">{project.title}</span>
            {meta ? <span className="home-de-project-list__meta">{meta}</span> : null}
          </>
        )}
      </span>
      <span className="home-de-project-list__cta" aria-hidden="true">
        →
      </span>
    </Link>
  )
}
