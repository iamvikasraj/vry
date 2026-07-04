'use client'

import { useEffect, useRef, useState } from 'react'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import MediaPlaceholder from '@/components/MediaPlaceholder'

type ProjectVideoProps = {
  src: string
  poster?: string
  /** Detail hero — preload video and prioritize poster fetch. */
  priority?: boolean
}

export default function ProjectVideo({ src, poster, priority = false }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const erroredRef = useRef(false)
  const [ready, setReady] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [posterError, setPosterError] = useState(false)
  const videoSrc = mediaAssetPath(src)
  const hasPoster = Boolean(poster) && !posterError
  const showPoster = hasPoster && videoError

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const markReady = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        setReady(true)
      }
    }

    markReady()

    video.addEventListener('loadedmetadata', markReady)
    video.addEventListener('loadeddata', markReady)
    video.addEventListener('canplay', markReady)
    video.addEventListener('playing', markReady)

    void video.play().catch(() => {
      markReady()
    })

    return () => {
      video.removeEventListener('loadedmetadata', markReady)
      video.removeEventListener('loadeddata', markReady)
      video.removeEventListener('canplay', markReady)
      video.removeEventListener('playing', markReady)
    }
  }, [videoSrc])

  const handleError = () => {
    if (erroredRef.current) return
    erroredRef.current = true
    setVideoError(true)
  }

  if (videoError && !showPoster) {
    return (
      <div className="project-video-container project-video-container--bleed">
        <div className="project-media-placeholder-wrap">
          <MediaPlaceholder label="Video coming soon" className="project-media-placeholder" />
        </div>
      </div>
    )
  }

  if (showPoster) {
    return (
      <div className="project-video-container project-video-container--bleed">
        <div className="project-cover-wrap">
          <img
            src={poster}
            alt=""
            className="project-cover-image"
            onError={() => setPosterError(true)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="project-video-container project-video-container--bleed">
      <div
        className={`project-video-wrap${!ready && !hasPoster ? ' project-video-wrap--loading' : ''}`}
      >
        {hasPoster ? (
          <img
            src={poster}
            alt=""
            className="project-video-poster"
            fetchPriority={priority ? 'high' : undefined}
            decoding="async"
            onError={() => setPosterError(true)}
          />
        ) : null}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload={priority ? 'auto' : 'metadata'}
          className={`project-video${ready ? ' project-video--ready' : ''}`}
          onError={handleError}
        />
      </div>
    </div>
  )
}
