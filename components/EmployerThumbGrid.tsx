'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import type { LiveEmployerCard } from '@/data/employerCards'
import type { ProjectThumbMedia } from '@/lib/projectMedia'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import { employerChapterHref } from '@/lib/deRoutes'
import MediaPlaceholder from '@/components/MediaPlaceholder'

export type EmployerThumbGridItem = LiveEmployerCard & {
  media: ProjectThumbMedia
}

function EmployerThumbCard({
  employer,
  featuredProject,
  highlights,
  media,
}: EmployerThumbGridItem) {
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

  const projectCount = highlights.length
  const stint = `${employer.position} · ${projectCount} ${projectCount === 1 ? 'project' : 'projects'}`

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
    <article className="home-de-thumb-wrap home-de-employer-card">
      <Link
        href={employerChapterHref(employer.slug)}
        className={`home-de-thumb${hovered ? ' home-de-thumb--hover' : ''}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        aria-label={`View ${employer.company} work`}
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
              alt=""
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
              src={mediaAssetPath(featuredProject.video)}
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
          <h2 className="home-de-thumb-title">{employer.company}</h2>
          <p className="home-de-thumb-meta home-de-employer-stint">{stint}</p>
        </div>
      </Link>
    </article>
  )
}

export default function EmployerThumbGrid({ items }: { items: EmployerThumbGridItem[] }) {
  return (
    <div className="home-de-card-grid">
      {items.map((item) => (
        <EmployerThumbCard key={item.employer.slug} {...item} />
      ))}
    </div>
  )
}
