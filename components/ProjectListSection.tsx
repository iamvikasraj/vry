import type { Project } from '@/data/projects'
import { getProjectThumbMedia } from '@/lib/projectMedia.server'
import ProjectListLink from '@/components/ProjectListLink'

type ProjectListSectionProps = {
  projects: Project[]
  playOnHover?: boolean
}

export default function ProjectListSection({ projects, playOnHover = false }: ProjectListSectionProps) {
  return (
    <div className="home-de-project-list">
      {projects.map((project) => (
        <ProjectListLink
          key={project.slug}
          project={project}
          media={getProjectThumbMedia(project)}
          playOnHover={playOnHover}
        />
      ))}
    </div>
  )
}
