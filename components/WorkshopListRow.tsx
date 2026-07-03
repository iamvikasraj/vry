'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import type { Workshop } from '@/data/workshops'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import { workshopHref } from '@/lib/workshopHref'

type WorkshopListRowProps = {
  workshop: Workshop
}

function youtubeEmbedSrc(videoId: string): string {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
    loop: '1',
    playlist: videoId,
  })
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

function youtubeThumbnailSrc(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

export default function WorkshopListRow({ workshop }: WorkshopListRowProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [youtubeHover, setYoutubeHover] = useState(false)
  const [youtubeReady, setYoutubeReady] = useState(false)
  const hasVideo = Boolean(workshop.video)
  const youtubeId = workshop.youtubeId
  const thumbnailSrc =
    workshop.thumbnail ?? (youtubeId ? youtubeThumbnailSrc(youtubeId) : undefined)
  const hasThumbnail = Boolean(thumbnailSrc)

  const outboundUrl = workshop.registrationUrl ?? workshop.externalUrl
  const detailHref = workshop.slug ? workshopHref(workshop.slug) : null

  const onThumbEnter = () => {
    if (hasVideo) videoRef.current?.play()
    if (youtubeId) setYoutubeHover(true)
  }

  const onThumbLeave = () => {
    if (hasVideo && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    if (youtubeId) {
      setYoutubeHover(false)
      setYoutubeReady(false)
    }
  }

  const inner = (
    <>
      <div
        className="home-de-workshop-list__thumb"
        onMouseEnter={hasVideo || youtubeId ? onThumbEnter : undefined}
        onMouseLeave={hasVideo || youtubeId ? onThumbLeave : undefined}
      >
        {hasVideo && workshop.video ? (
          <video
            ref={videoRef}
            className="home-de-workshop-list__image home-de-workshop-list__image--ready"
            src={mediaAssetPath(workshop.video)}
            muted
            playsInline
            loop
            preload="auto"
            aria-hidden
          />
        ) : hasThumbnail && thumbnailSrc ? (
          <>
            <img
              className={`home-de-workshop-list__image${youtubeHover && youtubeReady ? ' home-de-workshop-list__image--hidden' : ''}`}
              src={thumbnailSrc}
              alt=""
              aria-hidden
            />
            {youtubeId && youtubeHover ? (
              <iframe
                className={`home-de-workshop-list__youtube${youtubeReady ? ' home-de-workshop-list__youtube--ready' : ''}`}
                src={youtubeEmbedSrc(youtubeId)}
                title=""
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                onLoad={() => setYoutubeReady(true)}
                aria-hidden
              />
            ) : null}
          </>
        ) : (
          <MediaPlaceholder className="home-de-workshop-list__placeholder" label="" />
        )}
        <span className="home-de-media-caption">
          <span className="home-de-media-caption__title">{workshop.title}</span>
        </span>
      </div>
      <span className="home-de-workshop-list__text">
        <span className="home-de-workshop-list__title">{workshop.title}</span>
      </span>
      <span className="home-de-workshop-list__cta" aria-hidden="true">
        {workshop.registrationUrl || workshop.externalUrl ? '↗' : '→'}
      </span>
    </>
  )

  if (workshop.registrationUrl) {
    return (
      <a
        href={workshop.registrationUrl}
        className="home-de-workshop-list__link home-de-media-card"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${workshop.title} — register (opens in new tab)`}
      >
        {inner}
      </a>
    )
  }

  if (workshop.externalUrl) {
    return (
      <a
        href={workshop.externalUrl}
        className="home-de-workshop-list__link home-de-media-card"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${workshop.title} — watch on YouTube (opens in new tab)`}
      >
        {inner}
      </a>
    )
  }

  if (detailHref) {
    return (
      <Link href={detailHref} className="home-de-workshop-list__link home-de-media-card" aria-label={workshop.title}>
        {inner}
      </Link>
    )
  }

  if (outboundUrl) {
    return (
      <a
        href={outboundUrl}
        className="home-de-workshop-list__link home-de-media-card"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={
          workshop.externalUrl
            ? `${workshop.title} — watch (opens in new tab)`
            : `${workshop.title} (opens in new tab)`
        }
      >
        {inner}
      </a>
    )
  }

  return (
    <div className="home-de-workshop-list__link home-de-workshop-list__link--static" aria-label={workshop.title}>
      {inner}
    </div>
  )
}
