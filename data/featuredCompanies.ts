export type FeaturedCompanyProject = {
  slug: string
  title: string
  video?: string
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
        video: '/assets/video/loop-doctor-on-demand.mp4',
      },
      {
        slug: 'loop-ai-assistant',
        title: 'Loop AI Assistant (General queries)',
        video: '/assets/video/Loop AI Assistant (LinkedIn Export).mp4',
      },
    ],
  },
  {
    slug: 'paytm',
    name: 'Paytm',
    summary:
      'Built Paytm’s foundational design system and scaled Postpaid to 1M+ users in six months. Led redesigns for India’s largest private B2C train booking platform.',
    projects: [
      { slug: 'paytm-postpaid', title: 'Paytm Postpaid' },
      { slug: 'paytm-travel-trains', title: 'Paytm Travel' },
    ],
  },
  {
    slug: 'et-money',
    name: 'ET Money',
    summary:
      'Principal Product Designer leading UX for India’s personal finance platform — high-compliance flows, design system work, and product craft across investing and money management.',
    projects: [
      { slug: 'et-money-1', title: 'Project 1' },
      { slug: 'et-money-2', title: 'Project 2' },
    ],
  },
  {
    slug: 'time-bridge',
    name: 'Times Bridge',
    summary:
      'Product design consultant partnering with global media brands entering India — concepting, prototyping, and shipping digital products with cross-functional teams.',
    projects: [
      { slug: 'times-bridge-1', title: 'Project 1' },
      { slug: 'times-bridge-2', title: 'Project 2' },
    ],
  },
  {
    slug: 'grappus',
    name: 'Grappus',
    summary:
      'Early product design role shipping mobile experiences for startups — interface systems, user flows, and visual craft across consumer apps.',
    projects: [
      { slug: 'grappus-1', title: 'Project 1' },
      { slug: 'grappus-2', title: 'Project 2' },
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
