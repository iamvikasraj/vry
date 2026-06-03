'use client'

import Link from 'next/link'
import type { Project } from '@/data/projects'
import { mediaAssetPath } from '@/lib/mediaAssetPath'

export default function ProjectPreviewCard({ project }: { project: Project }) {
  const videoSrc = !project.coverImage && project.video ? mediaAssetPath(project.video) : null
  const brandCover = Boolean(project.coverImage?.endsWith('.svg'))

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
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt=""
            className={
              brandCover ? 'de-more-projects__preview-cover' : 'de-more-projects__preview-image'
            }
            loading="lazy"
          />
        ) : videoSrc ? (
          <video
            src={videoSrc}
            className="de-more-projects__preview-video"
            muted
            playsInline
            preload="metadata"
            aria-hidden
          />
        ) : null}
      </div>
      <div className="de-more-projects__preview-content">
        <h3 className="de-more-projects__preview-title">{project.title}</h3>
        <p className="de-more-projects__preview-desc">{project.description}</p>
        <span className="de-more-projects__preview-cta">View project</span>
      </div>
    </Link>
  )
}
