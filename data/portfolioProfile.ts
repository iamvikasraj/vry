/** Short copy for the sidebar intro. */
export const PORTFOLIO_PROFILE = {
  hook: 'A design leader who builds with engineers’ materials.',
  role: 'Staff Product Designer',
  company: {
    name: 'Loop Health',
    linkedIn: 'https://www.linkedin.com/company/loophealth/',
  },
  experience: '10+ years across fintech, health, and mobility',
  previous: [
    { name: 'Paytm', linkedIn: 'https://www.linkedin.com/company/paytm/' },
    { name: 'HDFC Bank', linkedIn: 'https://www.linkedin.com/company/hdfc-bank/' },
    { name: 'ET Money', linkedIn: 'https://www.linkedin.com/company/et_money/' },
  ],
  ambassador: 'Rive & Play ambassador',
  location: 'Bengaluru',
  /** IANA zone — the clock shows Vikas’ local time to any visitor. */
  timeZone: 'Asia/Kolkata',
  timeZoneLabel: 'IST',
} as const

/** One run of About copy — a plain string, or an emphasized (bold) fragment. */
export type AboutSegment = string | { emphasis: string }

/** Plain-text flattening of rich About copy, for schema.org / meta description. */
export function flattenAboutSegments(segments: AboutSegment[]): string {
  return segments.map((seg) => (typeof seg === 'string' ? seg : seg.emphasis)).join('')
}

/** Home About section — minimal copy, impact metrics carried in the emphasis. */
export const PORTFOLIO_ABOUT = {
  photo: '/assets/images/vikas-about.png',
  photoAlt: 'Vikas Raj Yadav speaking at a design workshop',
  /** Rendered after the name as “is a …”. */
  lede: [
    { emphasis: 'Staff Product Designer & Technologist' },
    ' at ',
    { emphasis: 'Loop Health' },
    '. A decade across fintech, health, and mobility — Rive, SwiftUI, and code aren’t side projects; they’re how he designs.',
  ] as AboutSegment[],
  paragraphs: [
    [
      'Before Loop, he led design at ',
      { emphasis: 'Paytm' },
      ', ',
      { emphasis: 'HDFC Bank' },
      ', and ',
      { emphasis: 'ET Money' },
      ' — building design systems and shipping fintech products at scale.',
    ],
    [
      'Now a ',
      { emphasis: 'Rive & Play Ambassador' },
      ', he closes the gap between design and engineering through workshops and open prototypes.',
    ],
  ] as AboutSegment[][],
  contact:
    'Open to staff design and design-engineering roles, workshops, and collaborations — Bengaluru & remote.',
} as const
