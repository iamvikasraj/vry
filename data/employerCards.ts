import type { Project } from '@/data/projects'
import { getLiveProjects } from '@/data/projects'
import {
  projectClientToEmployerSlug,
  workEmployers,
  type WorkEmployer,
} from '@/data/workEmployers'

export type EmployerHighlight = {
  slug: string
  name: string
  impact: string
}

export type LiveEmployerCard = {
  employer: WorkEmployer
  featuredProject: Project
  projects: Project[]
  highlights: EmployerHighlight[]
}

function employerSlugForProject(project: Project): string | undefined {
  if (!project.client) return undefined
  return projectClientToEmployerSlug[project.client]
}

export function stripEmployerPrefixFromTitle(title: string, company: string): string {
  for (const sep of [' — ', ' - ']) {
    const prefix = `${company}${sep}`
    if (title.startsWith(prefix)) return title.slice(prefix.length)
  }
  return title
}

function impactLine(project: Project): string {
  if (project.results?.trim()) return project.results.trim()
  const text = project.description?.trim() ?? ''
  return text.length > 140 ? `${text.slice(0, 137)}…` : text
}

/** Live-project grid cards grouped by company (newest employer first). */
export function getLiveEmployerCards(): LiveEmployerCard[] {
  const bySlug = new Map<string, Project[]>()

  for (const project of getLiveProjects()) {
    if (project.category !== 'Work') continue
    const slug = employerSlugForProject(project)
    if (!slug) continue
    const list = bySlug.get(slug) ?? []
    list.push(project)
    bySlug.set(slug, list)
  }

  return workEmployers
    .filter((employer) => bySlug.has(employer.slug))
    .map((employer) => {
      const employerProjects = bySlug.get(employer.slug)!
      const featuredProject =
        employerProjects.find((p) => p.featured) ?? employerProjects[0]

      return {
        employer,
        featuredProject,
        projects: employerProjects,
        highlights: employerProjects.map((project) => ({
          slug: project.slug,
          name: stripEmployerPrefixFromTitle(project.title, employer.company),
          impact: impactLine(project),
        })),
      }
    })
}

export function getLiveEmployerCardBySlug(slug: string): LiveEmployerCard | undefined {
  return getLiveEmployerCards().find((card) => card.employer.slug === slug)
}
