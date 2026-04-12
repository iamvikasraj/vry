export type Workshop = {
  title: string
  year: string
  venue: string
  description: string
  eventDate?: string
  eventTime?: string
  registrationUrl?: string
  includes?: string[]
  eventDescription?: string
}

export const workshops: Workshop[] = [
  {
    title: 'Rive Ambassador Happy Hour — Bengaluru 🇮🇳',
    year: '2026',
    venue: 'The Craftery By Subko, Koramangala, Bengaluru',
    description:
      'Casual meetup for Rive users, motion designers, and developers. Meet Vikas Raj Yadav, Rive Ambassador, IRL—no talks, no pressure, just good conversations.',
    eventDate: '2026-02-12',
    eventTime: '7pm–9pm',
    registrationUrl: 'https://lnkd.in/g8HB_nWD',
    includes: [
      '1 espresso-based coffee (per person)',
      '1 mini fudge-stuffed croissant (free)',
    ],
    eventDescription:
      'A relaxed, come-as-you-are meetup to hang out, swap notes, and connect in person. Whether you’re deep into Rive or just getting started, come meet fellow builders and enjoy a cozy evening with the local Rive community.',
  },
  {
    title: 'Rive Workshop',
    year: '2026',
    venue: 'TBD',
    description: 'Hands-on Rive workshop on interaction and motion design.',
    eventDate: '2026-03-18',
  },
  {
    title: 'Think Interaction Workshop',
    year: '2025',
    venue: 'Rive x Play 2025',
    description: 'Workshop on interaction design and motion principles using Rive.',
  },
  {
    title: 'Scripting with Rive Challenge',
    year: '2024',
    venue: 'Rive x Contra',
    description: 'Exploring advanced Rive scripting techniques and animation workflows.',
  },
]
