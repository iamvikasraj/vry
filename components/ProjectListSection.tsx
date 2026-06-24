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
  const listClassName = `home-de-project-list${
    layout === 'grid-2'
      ? ' home-de-project-list--grid-2'
      : layout === 'cards'
        ? ' home-de-project-list--cards'
        : ''
  }`

  if (layout !== 'cards') {
    return (
      <div className={listClassName}>
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

  const hero = projects.find((project) => project.playgroundHero)

  return (
    <div className={listClassName}>
      <div className="home-de-media-grid">
        {projects.map((project) => (
          <ProjectListLink
            key={project.slug}
            project={project}
            media={getProjectThumbMedia(project)}
            playOnHover={playOnHover}
            featured={project.slug === hero?.slug}
          />
        ))}
      </div>
    </div>
  )
}
