'use client'

import { useState } from 'react'
import MediaPlaceholder from '@/components/MediaPlaceholder'

export default function ProjectVideo({ src }: { src: string }) {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const showPlaceholder = !ready || error

  return (
    <div className="project-video-container project-video-container--bleed">
      <div className="project-video-wrap">
        {showPlaceholder && <MediaPlaceholder />}
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={`project-video${ready && !error ? ' project-video--ready' : ''}`}
          onLoadedData={() => setReady(true)}
          onError={() => setError(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
