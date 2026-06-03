'use client'

import { useRef, useState } from 'react'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import MediaPlaceholder from '@/components/MediaPlaceholder'

type ProjectVideoProps = {
  src: string
  poster?: string
}

export default function ProjectVideo({ src, poster }: ProjectVideoProps) {
  const erroredRef = useRef(false)
  const [videoError, setVideoError] = useState(false)
  const [posterError, setPosterError] = useState(false)
  const videoSrc = mediaAssetPath(src)
  const showPoster = poster && !posterError && videoError

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
      <div className="project-video-wrap">
        <video
          src={videoSrc}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="project-video project-video--ready"
          onError={handleError}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
