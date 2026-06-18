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
  /** Include on the home portfolio section (default true). */
  portfolio?: boolean
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
    venue: 'Rive x Play 2025',
    description: 'Workshop on interaction design and motion principles using Rive.',
    video: '/assets/video/Think Interaction Workshop.mp4',
    featured: true,
    portfolio: true,
    includes: ['Rive', 'Figma', 'State machines'],
  },
  {
    slug: 'design-engineering-iit-delhi-2026',
    title: 'Design Engineering Workshop',
    year: '2026',
    venue: 'IIT Delhi',
    description: 'Design engineering workshop session at IIT Delhi.',
    thumbnail: '/assets/workshops/iit-delhi-1.png',
    portfolio: true,
    includes: ['Rive', 'SwiftUI', 'Prototyping'],
  },
  {
    slug: 'design-engineering-youtube-2026',
    title: 'Design Engineering Workshop',
    year: '2026',
    venue: 'Design Originals Club · YouTube',
    description: 'Design engineering workshop session for Design Originals Club on YouTube.',
    thumbnail: 'https://i.ytimg.com/vi/fTUbis6k8w8/hqdefault.jpg',
    externalUrl: 'https://youtu.be/fTUbis6k8w8?si=jsjvtDXCJ_Hg7oMP',
    portfolio: true,
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
    title: 'Rive Ambassador Happy Hour — Bengaluru',
    year: '2026',
    venue: 'The Craftery By Subko, Koramangala, Bengaluru',
    description:
      'Casual meetup for Rive users, motion designers, and developers—good conversations with the local Rive community.',
    eventDate: '2026-02-12',
    eventTime: '7pm–9pm',
    portfolio: false,
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

/** Completed workshops on the home portfolio (newest first). */
export function getPortfolioWorkshops(): Workshop[] {
  return workshops
    .filter((w) => w.portfolio !== false)
    .sort((a, b) => {
      const aFeatured = a.featured ? 1 : 0
      const bFeatured = b.featured ? 1 : 0
      if (aFeatured !== bFeatured) return bFeatured - aFeatured
      return Number(b.year) - Number(a.year)
    })
}
