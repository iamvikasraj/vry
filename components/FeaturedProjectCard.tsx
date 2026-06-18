'use client'

import Link from 'next/link'
import { useRef } from 'react'
import type { FeaturedCompanyProject } from '@/data/featuredCompanies'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import { projectHref } from '@/lib/projectHref'

type FeaturedProjectCardProps = {
  project: FeaturedCompanyProject
}

export default function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const onEnter = () => {
    videoRef.current?.play()
  }

  const onLeave = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <Link
      href={projectHref(project.slug)}
      className="home-de-timeline-featured__placeholder home-de-timeline-featured__placeholder--link"
      aria-label={`View project: ${project.title}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={project.video ? onEnter : undefined}
      onBlur={project.video ? onLeave : undefined}
    >
      {project.video ? (
        <video
          ref={videoRef}
          className="home-de-timeline-featured__video"
          src={mediaAssetPath(project.video)}
          muted
          playsInline
          loop
          preload="auto"
          aria-hidden
        />
      ) : (
        <span className="home-de-timeline-featured__placeholder-text">{project.title}</span>
      )}
    </Link>
  )
}
