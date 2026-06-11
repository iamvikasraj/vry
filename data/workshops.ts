export type Workshop = {
  title: string
  year: string
  venue: string
  description: string
  /** Optional preview video for portfolio list (path under `public/`). */
  video?: string
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
    title: 'Think Interaction Workshop',
    year: '2025',
    venue: 'Rive x Play 2025',
    description: 'Workshop on interaction design and motion principles using Rive.',
    video: '/assets/video/Think Interaction Workshop.mp4',
    portfolio: true,
  },
  {
    title: 'Scripting with Rive Challenge',
    year: '2024',
    venue: 'Rive x Contra',
    description: 'Exploring advanced Rive scripting techniques and animation workflows.',
    portfolio: false,
  },
  {
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
    title: 'Rive Workshop',
    year: '2026',
    venue: 'Bengaluru',
    description: 'Hands-on Rive workshop on interaction and motion design.',
    eventDate: '2026-03-18',
    portfolio: false,
  },
]

/** Completed workshops on the home portfolio (newest first). */
export function getPortfolioWorkshops(): Workshop[] {
  return workshops
    .filter((w) => w.portfolio !== false)
    .sort((a, b) => Number(b.year) - Number(a.year))
}
