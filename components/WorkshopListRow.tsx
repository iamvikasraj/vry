'use client'

import MediaPlaceholder from '@/components/MediaPlaceholder'
import type { Workshop } from '@/data/workshops'
import { mediaAssetPath } from '@/lib/mediaAssetPath'

type WorkshopListRowProps = {
  workshop: Workshop
}

export default function WorkshopListRow({ workshop }: WorkshopListRowProps) {
  const meta = [workshop.venue, workshop.year].filter(Boolean).join(' · ')
  const hasVideo = Boolean(workshop.video)

  const inner = (
    <>
      <div className="home-de-workshop-list__thumb">
        {!hasVideo ? (
          <MediaPlaceholder className="home-de-workshop-list__placeholder" label="" />
        ) : workshop.video ? (
          <video
            className="home-de-workshop-list__image home-de-workshop-list__image--ready"
            src={mediaAssetPath(workshop.video)}
            muted
            playsInline
            loop
            preload="metadata"
            aria-hidden
          />
        ) : null}
      </div>
      <span className="home-de-workshop-list__text">
        <span className="home-de-workshop-list__title">{workshop.title}</span>
        {meta ? <span className="home-de-workshop-list__meta">{meta}</span> : null}
      </span>
      <span className="home-de-workshop-list__cta" aria-hidden="true">
        {workshop.registrationUrl ? '↗' : '→'}
      </span>
    </>
  )

  if (workshop.registrationUrl) {
    return (
      <a
        href={workshop.registrationUrl}
        className="home-de-workshop-list__link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${workshop.title} — register (opens in new tab)`}
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
