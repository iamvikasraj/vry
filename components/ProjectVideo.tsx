'use client'

import { useRef, useState } from 'react'
import { mediaAssetPath } from '@/lib/mediaAssetPath'

type ProjectVideoProps = {
  src: string
  poster?: string
}

export default function ProjectVideo({ src, poster }: ProjectVideoProps) {
  const erroredRef = useRef(false)
  const [error, setError] = useState(false)
  const videoSrc = mediaAssetPath(src)

  const handleError = () => {
    if (erroredRef.current) return
    erroredRef.current = true
    setError(true)
  }

  if (error && poster) {
    return (
      <div className="project-video-container project-video-container--bleed">
        <div className="project-cover-wrap">
          <img src={poster} alt="" className="project-cover-image" />
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
