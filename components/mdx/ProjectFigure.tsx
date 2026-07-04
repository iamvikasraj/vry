import { mediaAssetPath } from '@/lib/mediaAssetPath'

type ProjectFigureProps = {
  src: string
  alt: string
  caption?: string
  /** phone = mobile screens; wide = tall boards; collage = dark process board; compact = small inline */
  variant?: 'default' | 'phone' | 'wide' | 'collage' | 'compact'
  /** Screen recording or demo clip instead of a still image */
  video?: boolean
}

export default function ProjectFigure({
  src,
  alt,
  caption,
  variant = 'default',
  video = false,
}: ProjectFigureProps) {
  const mediaSrc = mediaAssetPath(src)

  return (
    <figure className={`project-figure project-figure--${variant}`}>
      <div className={`project-figure-media project-figure-media--${variant}`}>
        {video ? (
          <video
            src={mediaSrc}
            className="project-figure-image project-figure-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={alt}
          />
        ) : (
          <img src={src} alt={alt} className="project-figure-image" loading="lazy" decoding="async" />
        )}
      </div>
      {caption && <figcaption className="project-figure-caption">{caption}</figcaption>}
    </figure>
  )
}
