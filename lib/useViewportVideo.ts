'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

export type ViewportVideoOptions = {
  src: string
  /** Defer fetch until the container is near the viewport. */
  lazy?: boolean
  /** Start playback when the container enters the viewport. */
  autoplayInView?: boolean
  /** Pause and reset when scrolled out of view. */
  pauseOffscreen?: boolean
  rootMargin?: string
}

/**
 * Defers video network fetch until near the viewport and optionally plays/pauses
 * based on visibility — keeps mobile home grids from downloading every clip at once.
 */
export function useViewportVideo(
  containerRef: RefObject<Element | null>,
  {
    src,
    lazy = true,
    autoplayInView = false,
    pauseOffscreen = true,
    rootMargin = '300px 0px',
  }: ViewportVideoOptions,
) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isInView, setIsInView] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(!lazy)

  const shouldAutoplay = autoplayInView && !prefersReducedMotion

  useEffect(() => {
    const el = containerRef.current
    if (!el || !lazy) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsInView(entry.isIntersecting)
          if (entry.isIntersecting) {
            setShouldLoad(true)
          }
        }
      },
      { rootMargin, threshold: 0.01 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [containerRef, lazy, rootMargin])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    if (isInView && shouldAutoplay) {
      void video.play().catch(() => {})
      return
    }

    if (!isInView && pauseOffscreen) {
      video.pause()
      video.currentTime = 0
    }
  }, [isInView, shouldLoad, shouldAutoplay, pauseOffscreen, src])

  const videoSrc = shouldLoad ? src : undefined
  const preload = shouldLoad ? 'metadata' : 'none'

  return {
    videoRef,
    videoSrc,
    isInView,
    shouldLoad,
    preload,
    shouldAutoplay,
  } as const
}
