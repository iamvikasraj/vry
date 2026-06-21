import type { Project } from '@/data/projects'
import { getProjectThumbMedia } from '@/lib/projectMedia.server'
import ProjectListLink from '@/components/ProjectListLink'

type ProjectListSectionProps = {
  projects: Project[]
  playOnHover?: boolean
  /** `grid-2` = compact rows; `cards` = large thumb with text below (Playground). */
  layout?: 'list' | 'grid-2' | 'cards'
}

function splitPlaygroundCards(projects: Project[]) {
  const hero = projects.find((project) => project.playgroundHero)
  if (!hero) {
    return { before: projects, hero: null, after: [] as Project[] }
  }

  const others = projects.filter((project) => project.slug !== hero.slug)
  const mid = Math.floor(others.length / 2)

  return {
    before: others.slice(0, mid),
    hero,
    after: others.slice(mid),
  }
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

  const { before, hero, after } = splitPlaygroundCards(projects)

  return (
    <div className={listClassName}>
      {before.map((project) => (
        <ProjectListLink
          key={project.slug}
          project={project}
          media={getProjectThumbMedia(project)}
          playOnHover={playOnHover}
        />
      ))}
      {hero ? (
        <ProjectListLink
          key={hero.slug}
          project={hero}
          media={getProjectThumbMedia(hero)}
          playOnHover={playOnHover}
          featured
        />
      ) : null}
      {after.map((project) => (
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
