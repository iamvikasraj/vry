import Link from 'next/link'
import type { Project } from '@/data/projects'
import type { ProjectThumbMedia } from '@/lib/projectMedia'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import { projectHref } from '@/lib/projectHref'
import MediaPlaceholder from '@/components/MediaPlaceholder'

type EmployerStoryProjectLinkProps = {
  project: Project
  media: ProjectThumbMedia
}

export default function EmployerStoryProjectLink({
  project,
  media,
}: EmployerStoryProjectLinkProps) {
  const { brandCover, thumbSrc, videoAvailable } = media
  const meta = project.metaLabel ?? project.category
  const showImage = Boolean(thumbSrc)
  const showVideo = !showImage && videoAvailable

  return (
    <Link
      href={projectHref(project.slug)}
      className="home-de-employer-story__link"
      aria-label={`View case study: ${project.title}`}
    >
      <div
        className={`home-de-employer-story__thumb${brandCover && showImage ? ' home-de-employer-story__thumb--brand' : ''}`}
      >
        {showImage && thumbSrc ? (
          <img
            src={thumbSrc}
            alt=""
            className={brandCover ? 'home-de-employer-story__cover' : 'home-de-employer-story__image'}
          />
        ) : showVideo ? (
          <video
            src={mediaAssetPath(project.video)}
            className="home-de-employer-story__image"
            muted
            playsInline
            preload="metadata"
            aria-hidden
          />
        ) : (
          <MediaPlaceholder className="home-de-employer-story__placeholder" label="" />
        )}
      </div>
      <span className="home-de-employer-story__link-text">
        <span className="home-de-employer-story__link-title">{project.title}</span>
        {meta ? <span className="home-de-employer-story__link-meta">{meta}</span> : null}
      </span>
      <span className="home-de-employer-story__link-cta" aria-hidden="true">
        →
      </span>
    </Link>
  )
}
