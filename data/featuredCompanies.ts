import { getProjectBySlug } from '@/data/projects'

export type FeaturedCompanyProject = {
  slug: string
  title: string
  companyName?: string
  year?: string
  video?: string
  /** Play in order on hover; loops back to the first clip. */
  videos?: string[]
  thumbnail?: string
  /** Full-width hero on home Experiences section. */
  hero?: boolean
  /** Omit from home Experiences grid (e.g. until media is ready). */
  hidden?: boolean
}

export type FeaturedCompany = {
  slug: string
  name: string
  summary: string
  projects: [FeaturedCompanyProject, FeaturedCompanyProject]
}

export const featuredCompanies: FeaturedCompany[] = [
  {
    slug: 'loop-health',
    name: 'Loop Health (YC20)',
    summary:
      'Staff Product Designer building native-first health experiences. Design-engineered Doctor on Demand (2× bookings), a Blood Diagnosis MVP, and Genome — an AI pipeline that now does what used to take four agents.',
    projects: [
      {
        slug: 'loop-doctor-on-demand',
        title: 'Doctor on Demand',
        videos: [
          '/assets/video/loop-doctor-on-demand-after.mp4',
          '/assets/video/loop-doctor-on-demand-before.mp4',
        ],
      },
      {
        slug: 'loop-ai-assistant',
        title: 'Loop AI Assistant (General queries)',
        video: '/assets/video/Loop AI Assistant (LinkedIn Export).mp4',
        hero: true,
      },
    ],
  },
  {
    slug: 'paytm',
    name: 'Paytm',
    summary:
      'Built Paytm’s foundational design system and scaled Postpaid to 1M+ users in six months. Led redesigns for India’s largest private B2C train booking platform.',
    projects: [
      { slug: 'paytm-postpaid', title: 'Paytm Postpaid', hidden: true },
      { slug: 'paytm-travel-trains', title: 'Paytm Travel', hidden: true },
    ],
  },
  {
    slug: 'et-money',
    name: 'ET Money',
    summary:
      'Principal Product Designer leading UX for India’s personal finance platform — high-compliance flows, design system work, and product craft across investing and money management.',
    projects: [
      {
        slug: 'et-money-1',
        title: 'ET Money — Onboarding',
        video: '/assets/video/et-money-onboarding.mp4',
      },
      { slug: 'et-money-2', title: 'Project 2', hidden: true },
    ],
  },
  {
    slug: 'time-bridge',
    name: 'Times Bridge',
    summary:
      'Product design consultant partnering with global media brands entering India — concepting, prototyping, and shipping digital products with cross-functional teams.',
    projects: [
      {
        slug: 'business-insider',
        title: 'Business Insider India',
        video: '/assets/video/bi-india.mp4',
      },
      { slug: 'times-bridge-2', title: 'Project 2', hidden: true },
    ],
  },
  {
    slug: 'grappus',
    name: 'Grappus',
    summary:
      'Early product design role shipping mobile experiences for startups — interface systems, user flows, and visual craft across consumer apps.',
    projects: [
      { slug: 'grappus-1', title: 'Project 1', hidden: true },
      { slug: 'grappus-2', title: 'Project 2', hidden: true },
    ],
  },
]

export function getFeaturedCompanySlugs(): string[] {
  return featuredCompanies.map((c) => c.slug)
}

export function getFeaturedCompanyBySlug(slug: string): FeaturedCompany | undefined {
  return featuredCompanies.find((c) => c.slug === slug)
}

export function getDefaultFeaturedCompany(): FeaturedCompany {
  return featuredCompanies[0]
}

/** All experience project cards — flattened across companies, enriched from project data. */
export function getAllExperienceProjects(): FeaturedCompanyProject[] {
  const seen = new Set<string>()
  const items: FeaturedCompanyProject[] = []

  for (const company of featuredCompanies) {
    for (const project of company.projects) {
      if (project.hidden) continue
      if (seen.has(project.slug)) continue
      seen.add(project.slug)

      const fromData = getProjectBySlug(project.slug)
      const video = project.videos ? undefined : (project.video ?? fromData?.video)

      items.push({
        slug: project.slug,
        title: fromData?.title ?? project.title,
        companyName: company.name,
        year: fromData?.year,
        video,
        videos: project.videos,
        thumbnail: project.thumbnail ?? fromData?.coverImage,
        hero: project.hero,
      })
    }
  }

  return items.sort((a, b) => {
    if (a.hero !== b.hero) return a.hero ? -1 : 1
    const aHasVideo = Boolean(a.video || a.videos?.length)
    const bHasVideo = Boolean(b.video || b.videos?.length)
    if (aHasVideo === bHasVideo) return 0
    return aHasVideo ? -1 : 1
  })
}
