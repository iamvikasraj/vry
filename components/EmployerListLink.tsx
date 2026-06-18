'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { LiveEmployerCard } from '@/data/employerCards'
import { employerChapterHref } from '@/lib/deRoutes'
import MediaPlaceholder from '@/components/MediaPlaceholder'

type EmployerListLinkProps = {
  card: LiveEmployerCard
}

export default function EmployerListLink({ card }: EmployerListLinkProps) {
  const { employer, highlights } = card
  const [imageError, setImageError] = useState(false)

  const logoSrc = employer.logo
  const showLogo = Boolean(logoSrc && !imageError)
  const projectCount = highlights.length
  const meta = `${employer.position} · ${projectCount} ${projectCount === 1 ? 'project' : 'projects'}`

  return (
    <Link
      href={employerChapterHref(employer.slug)}
      className="home-de-project-list__link"
      aria-label={`View ${employer.company} work`}
    >
      <div className="home-de-project-list__thumb home-de-project-list__thumb--brand">
        {showLogo ? (
          <img
            src={logoSrc}
            alt=""
            className="home-de-project-list__cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <MediaPlaceholder className="home-de-project-list__placeholder" label="" />
        )}
      </div>
      <span className="home-de-project-list__text">
        <span className="home-de-project-list__title">{employer.company}</span>
        <span className="home-de-project-list__meta">{meta}</span>
      </span>
      <span className="home-de-project-list__cta" aria-hidden="true">
        →
      </span>
    </Link>
  )
}
