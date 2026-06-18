import type { Project } from '@/data/projects'
import { getProjectThumbMedia } from '@/lib/projectMedia.server'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import ProjectHero from '@/components/ProjectHero'
import ProjectVideo from '@/components/ProjectVideo'

export default function ProjectDetailMedia({ project }: { project: Project }) {
  const { brandCover, videoAvailable, thumbSrc } = getProjectThumbMedia(project)

  if (thumbSrc && (brandCover || !videoAvailable)) {
    return <ProjectHero src={thumbSrc} alt={project.title} />
  }

  if (videoAvailable) {
    return <ProjectVideo src={project.video} poster={thumbSrc} />
  }

  return (
    <div className="project-video-container project-video-container--bleed">
      <div className="project-media-placeholder-wrap">
        <MediaPlaceholder label="" className="project-media-placeholder" />
      </div>
    </div>
  )
}
