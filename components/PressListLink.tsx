'use client'

import { useState } from 'react'
import type { EmployerStorySource } from '@/data/employerChapters'
import MediaPlaceholder from '@/components/MediaPlaceholder'

type PressListLinkProps = {
  item: EmployerStorySource
}

export default function PressListLink({ item }: PressListLinkProps) {
  const [imageError, setImageError] = useState(false)
  const showImage = Boolean(item.image && !imageError)

  return (
    <a
      href={item.url}
      className="home-de-press-list__link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.outlet}: ${item.headline} (opens in new tab)`}
    >
      <span className="home-de-press-list__text">
        <span className="home-de-press-list__headline">{item.headline}</span>
        <span className="home-de-press-list__outlet-row">
          {showImage ? (
            <img
              src={item.image}
              alt=""
              className="home-de-press-list__favicon"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="home-de-press-list__favicon home-de-press-list__favicon--placeholder" aria-hidden="true">
              <MediaPlaceholder className="home-de-press-list__favicon-placeholder" label="" />
            </span>
          )}
          <span className="home-de-press-list__outlet">{item.outlet}</span>
        </span>
      </span>
      <span className="home-de-press-list__cta" aria-hidden="true">
        ↗
      </span>
    </a>
  )
}
