'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { analytics } from '@/lib/analytics'
import type { FeaturedCompanyProject } from '@/data/featuredCompanies'
import { useCanHover } from '@/lib/useCanHover'
import { useViewportVideo } from '@/lib/useViewportVideo'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import { projectHref } from '@/lib/projectHref'
import NdaExperienceCard from '@/components/NdaExperienceCard'

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
  poster?: string
  projectTitle: string
}

function FeaturedProjectSequenceVideo({ sources, poster, projectTitle }: SequenceVideoProps) {
  const canHover = useCanHover()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const playingRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const { shouldLoad, preload, shouldAutoplay } = useViewportVideo(containerRef, {
    src: sources[0] ?? '',
    lazy: !canHover,
    autoplayInView: !canHover,
    pauseOffscreen: !canHover,
  })

  const pauseAll = () => {
    videoRefs.current.forEach((el) => {
      if (!el) return
      el.pause()
      el.currentTime = 0
    })
  }

  useEffect(() => {
    if (canHover || !shouldAutoplay || !shouldLoad) return
    const first = videoRefs.current[0]
    if (!first) return
    void first.play()?.then(() => analytics.trackVideoPlay(projectTitle, sources[0]))
    playingRef.current = true
  }, [canHover, shouldAutoplay, shouldLoad, sources, projectTitle])

  const onEnter = () => {
    if (!canHover) return
    analytics.trackVideoHover(projectTitle)
    playingRef.current = true
    pauseAll()
    setActiveIndex(0)
    void videoRefs.current[0]?.play()?.then(() => analytics.trackVideoPlay(projectTitle, sources[0]))
  }

  const onLeave = () => {
    if (!canHover) return
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
      ref={containerRef}
      className="home-de-timeline-featured__sequence"
      onPointerEnter={canHover ? onEnter : undefined}
      onPointerLeave={canHover ? onLeave : undefined}
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
          src={shouldLoad || canHover ? source : undefined}
          poster={index === 0 ? poster : undefined}
          muted
          playsInline
          loop={!canHover && sources.length === 1}
          preload={canHover ? 'metadata' : preload}
          onEnded={() => onClipEnded(index)}
          aria-hidden
        />
      ))}
    </div>
  )
}

type SingleVideoProps = {
  src: string
  poster?: string
  projectTitle: string
}

function FeaturedProjectSingleVideo({ src, poster, projectTitle }: SingleVideoProps) {
  const canHover = useCanHover()
  const containerRef = useRef<HTMLDivElement>(null)
  const { videoRef, videoSrc, preload, shouldAutoplay, shouldLoad } = useViewportVideo(containerRef, {
    src,
    lazy: !canHover,
    autoplayInView: !canHover,
    pauseOffscreen: !canHover,
  })

  useEffect(() => {
    if (canHover || !shouldAutoplay || !shouldLoad) return
    void videoRef.current?.play()?.then(() => analytics.trackVideoPlay(projectTitle, src))
  }, [canHover, shouldAutoplay, shouldLoad, src, projectTitle, videoRef])

  const onEnter = () => {
    if (!canHover) return
    analytics.trackVideoHover(projectTitle)
    void videoRef.current?.play()?.then(() => analytics.trackVideoPlay(projectTitle, src))
  }

  const onLeave = () => {
    if (!canHover) return
    const el = videoRef.current
    if (!el) return
    el.pause()
    el.currentTime = 0
  }

  return (
    <div
      ref={containerRef}
      className="home-de-timeline-featured__sequence"
      onPointerEnter={canHover ? onEnter : undefined}
      onPointerLeave={canHover ? onLeave : undefined}
    >
      <video
        ref={videoRef}
        className="home-de-timeline-featured__video home-de-timeline-featured__video--active"
        src={canHover ? src : videoSrc}
        poster={poster}
        muted
        playsInline
        loop
        preload={canHover ? 'metadata' : preload}
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

  if (project.nda) {
    return <NdaExperienceCard project={project} isHero={isHero} />
  }

  const sources = getVideoSources(project)
  const hasVideo = sources.length > 0
  const isSequence = sources.length > 1
  const poster = project.thumbnail

  const media = hasVideo ? (
    isSequence ? (
      <FeaturedProjectSequenceVideo sources={sources} poster={poster} projectTitle={project.title} />
    ) : (
      <FeaturedProjectSingleVideo src={sources[0]} poster={poster} projectTitle={project.title} />
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
      onClick={() => analytics.trackProjectClick(project.title, project.slug)}
      aria-label={`View project: ${project.title}`}
    >
      <div className="home-de-timeline-featured__media">{media}</div>
      <span className="home-de-media-caption home-de-media-caption--below">
        <span className="home-de-media-caption__title">{project.title}</span>
      </span>
    </Link>
  )
}
