'use client'

import { useRef } from 'react'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import type { Writing } from '@/data/writings'
import { mediaAssetPath } from '@/lib/mediaAssetPath'

type WritingListRowProps = {
  writing: Writing
}

export default function WritingListRow({ writing }: WritingListRowProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasVideo = Boolean(writing.video)
  const cardTitle = writing.cardTitle ?? writing.title

  const onVideoEnter = () => {
    videoRef.current?.play()
  }

  const onVideoLeave = () => {
    if (!videoRef.current) return
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
        className="home-de-workshop-list__thumb"
        onMouseEnter={hasVideo ? onVideoEnter : undefined}
        onMouseLeave={hasVideo ? onVideoLeave : undefined}
      >
        {hasVideo && writing.video ? (
          <video
            ref={videoRef}
            className="home-de-workshop-list__image home-de-workshop-list__image--ready"
            src={mediaAssetPath(writing.video)}
            poster={writing.thumbnail}
            muted
            playsInline
            loop
            preload="auto"
            aria-hidden
          />
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
