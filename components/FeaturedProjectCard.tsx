'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import type { FeaturedCompanyProject } from '@/data/featuredCompanies'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import { projectHref } from '@/lib/projectHref'

type FeaturedProjectCardProps = {
  project: FeaturedCompanyProject
  variant?: 'default' | 'hero'
}

function getVideoSources(project: FeaturedCompanyProject): string[] {
  if (project.videos?.length) {
    return project.videos.map((source) => mediaAssetPath(source))
  }
  if (project.video) {
    return [mediaAssetPath(project.video)]
  }
  return []
}

type SequenceVideoProps = {
  sources: string[]
}

function FeaturedProjectSequenceVideo({ sources }: SequenceVideoProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const playingRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const pauseAll = () => {
    videoRefs.current.forEach((el) => {
      if (!el) return
      el.pause()
      el.currentTime = 0
    })
  }

  const onEnter = () => {
    playingRef.current = true
    pauseAll()
    setActiveIndex(0)
    void videoRefs.current[0]?.play()
  }

  const onLeave = () => {
    playingRef.current = false
    pauseAll()
    setActiveIndex(0)
  }

  const onClipEnded = (index: number) => {
    if (!playingRef.current) return
    const nextIndex = (index + 1) % sources.length
    videoRefs.current[index]?.pause()
    setActiveIndex(nextIndex)
    const nextEl = videoRefs.current[nextIndex]
    if (!nextEl) return
    nextEl.currentTime = 0
    void nextEl.play()
  }

  return (
    <div
      className="home-de-timeline-featured__sequence"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      {sources.map((source, index) => (
        <video
          key={source}
          ref={(el) => {
            videoRefs.current[index] = el
          }}
          className={`home-de-timeline-featured__video${
            activeIndex === index ? ' home-de-timeline-featured__video--active' : ''
          }`}
          src={source}
          muted
          playsInline
          preload="auto"
          onEnded={() => onClipEnded(index)}
          aria-hidden
        />
      ))}
    </div>
  )
}

type SingleVideoProps = {
  src: string
}

function FeaturedProjectSingleVideo({ src }: SingleVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const onEnter = () => {
    void videoRef.current?.play()
  }

  const onLeave = () => {
    const el = videoRef.current
    if (!el) return
    el.pause()
    el.currentTime = 0
  }

  return (
    <div
      className="home-de-timeline-featured__sequence"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <video
        ref={videoRef}
        className="home-de-timeline-featured__video home-de-timeline-featured__video--active"
        src={src}
        muted
        playsInline
        loop
        preload="auto"
        aria-hidden
      />
    </div>
  )
}

export default function FeaturedProjectCard({
  project,
  variant = 'default',
}: FeaturedProjectCardProps) {
  const isHero = variant === 'hero'
  const sources = getVideoSources(project)
  const hasVideo = sources.length > 0
  const isSequence = sources.length > 1

  const media = hasVideo ? (
    isSequence ? (
      <FeaturedProjectSequenceVideo sources={sources} />
    ) : (
      <FeaturedProjectSingleVideo src={sources[0]} />
    )
  ) : project.thumbnail ? (
    <img
      className="home-de-timeline-featured__video home-de-timeline-featured__video--active"
      src={project.thumbnail}
      alt=""
      aria-hidden
    />
  ) : (
    <span className="home-de-timeline-featured__placeholder-text">{project.title}</span>
  )

  return (
    <Link
      href={projectHref(project.slug)}
      className={`home-de-timeline-featured__placeholder home-de-timeline-featured__placeholder--link home-de-media-card${
        isHero ? ' home-de-timeline-featured--hero' : ''
      }`}
      aria-label={`View project: ${project.title}`}
    >
      <div className="home-de-timeline-featured__media">
        {media}
        <span className="home-de-media-caption">
          <span className="home-de-media-caption__title">{project.title}</span>
          {project.companyName ? (
            <span className="home-de-media-caption__meta">{project.companyName}</span>
          ) : null}
        </span>
      </div>
    </Link>
  )
}
