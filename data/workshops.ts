export type Workshop = {
  slug: string
  title: string
  year: string
  venue: string
  description: string
  /** Pinned to the top when shown on the home portfolio. */
  featured?: boolean
  /** Optional thumbnail image for the portfolio list (path under `public/`). */
  thumbnail?: string
  /** Optional preview video for portfolio list (path under `public/`). */
  video?: string
  /** External link for portfolio card (e.g. YouTube recording). */
  externalUrl?: string
  /** YouTube video id — list card plays embed on hover (muted). */
  youtubeId?: string
  /** Include on the home portfolio section (default true). */
  portfolio?: boolean
  /** Home portfolio sort order (lower first). Featured still pins to top. */
  portfolioOrder?: number
  eventDate?: string
  eventTime?: string
  registrationUrl?: string
  includes?: string[]
  eventDescription?: string
}

export const workshops: Workshop[] = [
  {
    slug: 'think-interaction-rive-play-2025',
    title: 'Think Interaction Workshop',
    year: '2025',
    venue: 'Rive x Play · Gurugram (in person)',
    description: 'In-person workshop on interaction design and motion principles using Rive and Play.',
    video: '/assets/video/Think Interaction Workshop.mp4',
    portfolio: true,
    portfolioOrder: 2,
    includes: ['Rive', 'Figma', 'State machines'],
  },
  {
    slug: 'design-engineering-iit-delhi-2026',
    title: 'Design Engineering Workshop',
    year: '2026',
    venue: 'Voxago · IIT Delhi',
    description: 'Free design engineering workshop at IIT Delhi, hosted by Voxago.',
    thumbnail: '/assets/workshops/iit-delhi-1.png',
    portfolio: true,
    portfolioOrder: 3,
    includes: ['Rive', 'SwiftUI', 'Prototyping'],
  },
  {
    slug: 'design-engineering-youtube-2026',
    title: 'Rive Workshop',
    year: '2026',
    venue: 'Design Originals Club · YouTube',
    description: 'Virtual Rive workshop for Design Originals Club — recorded on YouTube.',
    youtubeId: 'fTUbis6k8w8',
    externalUrl: 'https://youtu.be/fTUbis6k8w8?si=JZVXY2R1qDC3AadG',
    portfolio: true,
    portfolioOrder: 4,
    includes: ['Rive', 'Design systems', 'Motion'],
  },
  {
    slug: 'scripting-rive-contra-2024',
    title: 'Scripting with Rive Challenge',
    year: '2024',
    venue: 'Rive x Contra',
    description: 'Exploring advanced Rive scripting techniques and animation workflows.',
    portfolio: false,
    includes: ['Rive', 'Scripting'],
  },
  {
    slug: 'rive-ambassador-happy-hour-bengaluru-2026',
    title: 'Rive Ambassador Happy Hour',
    year: '2026',
    venue: 'Rive x Bengaluru',
    description:
      'Community event for Rive users, motion designers, and developers — hosted by Vikas Raj Yadav with the local Rive community in Bengaluru.',
    thumbnail: '/assets/workshops/rive-ambassador-happy-hour-bengaluru-2026.jpg',
    portfolio: true,
    portfolioOrder: 1,
    eventDate: '2026-02-12',
    eventTime: '7pm–9pm',
    includes: ['Rive', 'Community', 'Motion design'],
  },
  {
    slug: 'rive-workshop-bengaluru-2026',
    title: 'Rive Workshop',
    year: '2026',
    venue: 'Bengaluru',
    description: 'Hands-on Rive workshop on interaction and motion design.',
    eventDate: '2026-03-18',
    portfolio: false,
    includes: ['Rive', 'Interaction design'],
  },
]

export function getWorkshopBySlug(slug: string): Workshop | undefined {
  return workshops.find((workshop) => workshop.slug === slug)
}

/** Completed workshops on the home portfolio (featured first, then portfolioOrder). */
export function getPortfolioWorkshops(): Workshop[] {
  return workshops
    .filter((w) => w.portfolio !== false)
    .sort((a, b) => {
      const aFeatured = a.featured ? 1 : 0
      const bFeatured = b.featured ? 1 : 0
      if (aFeatured !== bFeatured) return bFeatured - aFeatured
      const aOrder = a.portfolioOrder ?? Number.MAX_SAFE_INTEGER
      const bOrder = b.portfolioOrder ?? Number.MAX_SAFE_INTEGER
      if (aOrder !== bOrder) return aOrder - bOrder
      return Number(b.year) - Number(a.year)
    })
}
