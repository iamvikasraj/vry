import type { Project } from '@/data/projects'
import { getProjectPreviewMedia } from '@/lib/projectMedia.server'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import ProjectHero from '@/components/ProjectHero'
import ProjectVideo from '@/components/ProjectVideo'

export default function ProjectDetailMedia({ project }: { project: Project }) {
  const { brandCover, coverAvailable, videoAvailable } = getProjectPreviewMedia(project)

  if (coverAvailable && (brandCover || !videoAvailable)) {
    return <ProjectHero src={project.coverImage!} alt={project.title} />
  }

  if (videoAvailable) {
    return <ProjectVideo src={project.video} poster={project.coverImage} />
  }

  return (
    <div className="project-video-container project-video-container--bleed">
      <div className="project-media-placeholder-wrap">
        <MediaPlaceholder label="Media coming soon" className="project-media-placeholder" />
      </div>
    </div>
  )
}
