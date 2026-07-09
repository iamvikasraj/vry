'use client'

import { useRef, useState } from 'react'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import type { Writing } from '@/data/writings'
import { useCanHover } from '@/lib/useCanHover'
import { useViewportVideo } from '@/lib/useViewportVideo'
import { mediaAssetPath } from '@/lib/mediaAssetPath'

type WritingListRowProps = {
  writing: Writing
}

export default function WritingListRow({ writing }: WritingListRowProps) {
  const canHover = useCanHover()
  const thumbRef = useRef<HTMLDivElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [hovering, setHovering] = useState(false)

  const hasVideo = Boolean(writing.video)
  const videoSrc = writing.video ? mediaAssetPath(writing.video) : ''
  const cardTitle = writing.cardTitle ?? writing.title
  const posterSrc = writing.thumbnail

  const { videoRef, videoSrc: lazySrc, preload, shouldAutoplay } = useViewportVideo(thumbRef, {
    src: videoSrc,
    lazy: hasVideo && !canHover,
    autoplayInView: hasVideo && !canHover,
    pauseOffscreen: hasVideo && !canHover,
  })

  const showVideoLayer = hasVideo && videoReady && (shouldAutoplay || hovering)

  const onVideoEnter = () => {
    if (!canHover || !hasVideo) return
    setHovering(true)
    void videoRef.current?.play()
  }

  const onVideoLeave = () => {
    if (!canHover || !videoRef.current) return
    setHovering(false)
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <a
      href={writing.url}
      className="home-de-workshop-list__link home-de-media-card"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${writing.title} (opens on designengineer.ing)`}
    >
      <div
        ref={thumbRef}
        className={`home-de-workshop-list__thumb${hasVideo && posterSrc ? ' home-de-workshop-list__thumb--has-poster' : ''}`}
        onMouseEnter={hasVideo ? onVideoEnter : undefined}
        onMouseLeave={hasVideo ? onVideoLeave : undefined}
      >
        {hasVideo && writing.video ? (
          <>
            {posterSrc && !showVideoLayer ? (
              <img
                className="home-de-workshop-list__image"
                src={posterSrc}
                alt=""
                aria-hidden
              />
            ) : null}
            <video
              ref={videoRef}
              className={`home-de-workshop-list__image${showVideoLayer ? ' home-de-workshop-list__image--ready' : ''}`}
              src={canHover ? videoSrc : lazySrc}
              poster={posterSrc}
              muted
              playsInline
              loop
              preload={canHover ? 'metadata' : preload}
              onLoadedData={() => setVideoReady(true)}
              onCanPlay={() => setVideoReady(true)}
              aria-hidden
            />
          </>
        ) : writing.thumbnail ? (
          <img
            className="home-de-workshop-list__image"
            src={writing.thumbnail}
            alt=""
            aria-hidden
          />
        ) : (
          <MediaPlaceholder className="home-de-workshop-list__placeholder" label="" />
        )}
      </div>
      <span className="home-de-media-caption home-de-media-caption--below">
        <span className="home-de-media-caption__title">{cardTitle}</span>
      </span>
      <span className="home-de-workshop-list__text">
        <span className="home-de-workshop-list__title">{cardTitle}</span>
      </span>
      <span className="home-de-workshop-list__cta" aria-hidden="true">
        ↗
      </span>
    </a>
  )
}
