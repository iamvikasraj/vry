import type { Project } from '@/data/projects'
import { getProjectThumbMedia } from '@/lib/projectMedia.server'
import ProjectListLink from '@/components/ProjectListLink'

type ProjectListSectionProps = {
  projects: Project[]
  playOnHover?: boolean
  /** `grid-2` = compact rows; `cards` = large thumb with text below (Playground). */
  layout?: 'list' | 'grid-2' | 'cards'
}

export default function ProjectListSection({
  projects,
  playOnHover = false,
  layout = 'list',
}: ProjectListSectionProps) {
  return (
    <div
      className={`home-de-project-list${
        layout === 'grid-2'
          ? ' home-de-project-list--grid-2'
          : layout === 'cards'
            ? ' home-de-project-list--cards'
            : ''
      }`}
    >
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
