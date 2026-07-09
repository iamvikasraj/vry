/** Short copy for the sidebar intro. */
export const PORTFOLIO_PROFILE = {
  hook: 'A staff product designer with over a decade of experience who builds with engineers’ materials, and a Rive & Play ambassador.',
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

/** One run of About copy — a plain string, or an emphasized fragment (optionally linked). */
export type AboutSegment = string | { emphasis: string; href?: string }

export type AboutWorkItem = {
  company: string
  role: string
  years: string
}

/** Plain-text flattening of rich About copy, for schema.org / meta description. */
export function flattenAboutSegments(segments: AboutSegment[]): string {
  return segments.map((seg) => (typeof seg === 'string' ? seg : seg.emphasis)).join('')
}

/** Home About section — full story for readers who make it to the end. */
export const PORTFOLIO_ABOUT = {
  photo: '/assets/images/vikas-about.png',
  photoAlt: 'Vikas Raj Yadav speaking at a design workshop',
  /** Rendered as the opening paragraph. */
  lede: [
    'Hi, I’m ',
    { emphasis: 'Vikas Raj Yadav' },
    ', a design leader and builder working where design meets engineering. I’m a Staff Product Designer at ',
    { emphasis: 'Loop Health', href: 'https://www.loophealth.com' },
    ' in Bengaluru.',
  ] as AboutSegment[],
  paragraphs: [
    [
      'Right now I lead design experiments and interaction with ',
      { emphasis: 'Rive', href: 'https://rive.app' },
      ' and ',
      { emphasis: 'SwiftUI', href: 'https://developer.apple.com/xcode/swiftui/' },
      ' — central to how I ship. I’m also a ',
      { emphasis: 'Rive & Play Ambassador' },
      '.',
    ],
    [
      'Before Loop Health, I redesigned investing at ',
      { emphasis: 'ET Money', href: 'https://www.etmoney.com' },
      ' and mentored the team to ship faster. In between, I consulted at ',
      { emphasis: 'Times Bridge', href: 'https://timesbridge.com' },
      ' and led UX at ',
      { emphasis: 'HDFC Bank', href: 'https://www.hdfcbank.com' },
      '. Earlier, I built ',
      { emphasis: 'Paytm', href: 'https://paytm.com' },
      '’s first design system, unifying the experience for 350M+ users.',
    ],
    [
      'Off the clock, you’ll find me tinkering with ',
      { emphasis: 'Three.js', href: 'https://threejs.org' },
      ' or outdoors.',
    ],
  ] as AboutSegment[][],
  work: [
    { company: 'Loop Health', role: 'Staff Product Designer', years: '2025–Present' },
    { company: 'ET Money', role: 'Principal Product Designer', years: '2024–2025' },
    { company: 'Times Bridge', role: 'Product Design Consultant', years: '2022–2024' },
    { company: 'HDFC Bank', role: 'UX Design Manager', years: '2021–2022' },
    { company: 'Paytm', role: 'Lead Product Designer', years: '2018–2021' },
    { company: 'Grappus Studio', role: 'UI/UX Designer', years: '2017–2018' },
  ] satisfies AboutWorkItem[],
  contact:
    'Open to staff design and design-engineering roles, workshops, and collaborations — Bengaluru & remote.',
} as const
