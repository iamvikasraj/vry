import Link from 'next/link'
import type { Project } from '@/data/projects'
import type { ProjectPreviewMedia } from '@/lib/projectMedia.server'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import MediaPlaceholder from '@/components/MediaPlaceholder'

type ProjectPreviewCardProps = {
  project: Project
  media: ProjectPreviewMedia
}

export default function ProjectPreviewCard({ project, media }: ProjectPreviewCardProps) {
  const { brandCover, coverAvailable, videoAvailable } = media

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="de-more-projects__preview"
      aria-label={project.title}
    >
      <div
        className={`de-more-projects__preview-thumb${brandCover ? ' de-more-projects__preview-thumb--brand' : ''}`}
        style={{ aspectRatio: '16 / 9' }}
      >
        {coverAvailable ? (
          <img
            src={project.coverImage}
            alt=""
            className={
              brandCover ? 'de-more-projects__preview-cover' : 'de-more-projects__preview-image'
            }
            loading="lazy"
          />
        ) : videoAvailable ? (
          <video
            src={mediaAssetPath(project.video)}
            className="de-more-projects__preview-video"
            muted
            playsInline
            preload="metadata"
            aria-hidden
          />
        ) : (
          <MediaPlaceholder
            className="de-more-projects__preview-placeholder"
            label="Preview coming soon"
          />
        )}
      </div>
      <div className="de-more-projects__preview-content">
        <h3 className="de-more-projects__preview-title">{project.title}</h3>
        <p className="de-more-projects__preview-desc">{project.description}</p>
        <span className="de-more-projects__preview-cta">View project</span>
      </div>
    </Link>
  )
}
