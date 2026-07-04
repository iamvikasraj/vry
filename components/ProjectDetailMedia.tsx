import type { Project } from '@/data/projects'
import { getProjectThumbMedia } from '@/lib/projectMedia.server'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import ProjectHero from '@/components/ProjectHero'
import ProjectVideo from '@/components/ProjectVideo'

export default function ProjectDetailMedia({ project }: { project: Project }) {
  const { brandCover, videoAvailable, thumbSrc } = getProjectThumbMedia(project)

  if (project.nda) {
    return (
      <div className="project-video-container project-video-container--bleed">
        <div className="project-nda-hero" role="img" aria-label={`${project.title} — work under NDA`}>
          <div className="project-nda-hero__brand">
            {project.coverImage ? (
              <img
                className="project-nda-hero__logo"
                src={project.coverImage}
                alt=""
              />
            ) : null}
            <p className="project-nda-hero__title">{project.title}</p>
          </div>
          <svg
            className="project-nda-hero__lock"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
            <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
          </svg>
          <p className="project-nda-hero__label">Under NDA</p>
          <p className="project-nda-hero__note">
            The screens for this work are confidential. Here’s what I can share about the scope and approach.
          </p>
        </div>
      </div>
    )
  }

  if (thumbSrc && (brandCover || !videoAvailable)) {
    return <ProjectHero src={thumbSrc} alt={project.title} />
  }

  if (videoAvailable) {
    return <ProjectVideo src={project.video} poster={thumbSrc} priority />
  }

  return (
    <div className="project-video-container project-video-container--bleed">
      <div className="project-media-placeholder-wrap">
        <MediaPlaceholder label="" className="project-media-placeholder" />
      </div>
    </div>
  )
}
