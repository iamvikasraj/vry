import type { FeaturedCompanyProject } from '@/data/featuredCompanies'
import { featuredCompanies } from '@/data/featuredCompanies'
import { getProjectBySlug } from '@/data/projects'

export type CompanyCover = {
  /** URL segment — share as `/for/[slug]/` */
  slug: string
  /** Company or team name shown on the cover */
  companyName: string
  headline: string
  /** Opening letter — 1–3 short paragraphs */
  intro: string[]
  /** Curated case studies (project slugs from `data/projects.ts`) */
  featuredProjectSlugs: string[]
  /** Optional bullets on why this work maps to them */
  relevance?: string[]
  cta?: {
    label: string
    /** External link; omit for built-in email button */
    href?: string
  }
}

/**
 * Unlisted cover pages — not linked from the public site.
 * Add an entry per company; share the URL directly (e.g. `/for/acme/`).
 */
export const companyCovers: CompanyCover[] = [
  {
    slug: 'sample',
    companyName: 'Your team',
    headline: 'Staff product design & design engineering',
    intro: [
      'Thanks for taking a look — this page is a focused snapshot of work most relevant to what you’re building.',
      'I’m a staff product designer and design technologist in Bengaluru, shipping native-first products at the intersection of design, motion, and engineering.',
    ],
    relevance: [
      'Native iOS flows prototyped in SwiftUI before engineering handoff',
      'Motion-led interaction design with Rive in production',
      'Healthcare and fintech experience at scale',
    ],
    featuredProjectSlugs: ['loop-doctor-on-demand', 'loop-ai-assistant'],
    cta: { label: 'Email me' },
  },
]

export function getCompanyCoverBySlug(slug: string): CompanyCover | undefined {
  return companyCovers.find((cover) => cover.slug === slug)
}

export function getCompanyCoverSlugs(): string[] {
  return companyCovers.map((cover) => cover.slug)
}

function getFeaturedMediaOverrides(slug: string): Pick<FeaturedCompanyProject, 'video' | 'videos' | 'thumbnail'> {
  for (const company of featuredCompanies) {
    for (const project of company.projects) {
      if (project.slug === slug) {
        return {
          video: project.video,
          videos: project.videos,
          thumbnail: project.thumbnail,
        }
      }
    }
  }
  return {}
}

/** Resolve cover project slugs into cards for `FeaturedProjectCard`. */
export function getCoverFeaturedProjects(cover: CompanyCover): FeaturedCompanyProject[] {
  return cover.featuredProjectSlugs.flatMap((slug) => {
    const project = getProjectBySlug(slug)
    if (!project) return []

    const overrides = getFeaturedMediaOverrides(slug)

    return [
      {
        slug: project.slug,
        title: project.title,
        companyName: project.client,
        video: overrides.video ?? project.video,
        videos: overrides.videos,
        thumbnail: overrides.thumbnail ?? project.coverImage,
      },
    ]
  })
}
