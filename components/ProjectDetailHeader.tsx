import type { Project } from '@/data/projects'
import { employerLogoPath, projectClientToEmployerSlug } from '@/data/workEmployers'

function parseProjectTitle(project: Project): { employer: string | null; headline: string } {
  const dash = project.title.indexOf(' — ')
  if (dash !== -1) {
    return {
      employer: project.title.slice(0, dash),
      headline: project.title.slice(dash + 3),
    }
  }
  return {
    employer: project.client ?? null,
    headline: project.title,
  }
}

function resolveEmployerLogo(employer: string | null | undefined): string | undefined {
  if (!employer) return undefined
  const slug = projectClientToEmployerSlug[employer]
  if (!slug) return undefined
  return employerLogoPath(slug)
}

type ProjectDetailHeaderProps = {
  project: Project
}

export default function ProjectDetailHeader({ project }: ProjectDetailHeaderProps) {
  const { employer, headline } = parseProjectTitle(project)
  const employerLogo = resolveEmployerLogo(employer)
  const metaParts = [project.role, ...(project.tools ?? [])].filter(Boolean)

  return (
    <div className="project-detail-masthead">
      <header className="project-detail-header">
        {employer ? (
          <p className="project-detail-brand">
            {employerLogo ? (
              <img
                src={employerLogo}
                alt=""
                className="project-detail-brand__logo"
                width={20}
                height={20}
                decoding="async"
              />
            ) : null}
            <span className="project-detail-brand__name">{employer}</span>
            {project.year ? (
              <>
                <span className="project-detail-brand__sep" aria-hidden>
                  ·
                </span>
                <span className="project-detail-brand__year">{project.year}</span>
              </>
            ) : null}
          </p>
        ) : null}

        <h1 className="project-title">{headline}</h1>

        {metaParts.length > 0 ? (
          <p className="project-detail-meta">{metaParts.join(' · ')}</p>
        ) : null}
      </header>
    </div>
  )
}
