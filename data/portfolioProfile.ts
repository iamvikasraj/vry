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

/** One run of About copy — a plain string, or an emphasized (bold) fragment. */
export type AboutSegment = string | { emphasis: string }

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
    ' — a design leader and builder who works at the intersection of design and engineering. I’m currently based in Bengaluru, where I’m a Staff Product Designer at ',
    { emphasis: 'Loop Health' },
    ', creating healthcare fintech solutions that make a real impact.',
  ] as AboutSegment[],
  paragraphs: [
    [
      'Right now, I’m focused on leading design systems and integrating motion-driven interactions using tools like ',
      { emphasis: 'Rive' },
      ' and ',
      { emphasis: 'SwiftUI' },
      '. These aren’t just side projects for me — they’re core to how I design and bring products to life. I’m also proud to be a ',
      { emphasis: 'Rive & Play Ambassador' },
      ', helping close the gap between design and engineering.',
    ],
    [
      'Before Loop Health, I worked at ',
      { emphasis: 'ET Money' },
      ', driving a redesign that boosted investment completions and mentoring a team to improve delivery timelines. Prior to that, I helped build ',
      { emphasis: 'Paytm' },
      '’s first comprehensive design system, improving consistency for over 350 million users across multiple products.',
    ],
    [
      'I thrive when working at the intersection of creativity and technology — building scalable design systems, refining user experiences, and mentoring diverse teams. I’m passionate about motion design, prototyping, and pushing the boundaries where design meets code.',
    ],
    [
      'In my free time, you’ll find me exploring new tech, experimenting with SwiftUI and Three.js, or enjoying outdoor adventures. I’m always excited to connect with fellow creators and innovators who believe in craft and collaboration.',
    ],
  ] as AboutSegment[][],
  work: [
    { company: 'Loop Health', role: 'Staff Product Designer', years: '2025–Present' },
    { company: 'ET Money', role: 'Principal Product Designer', years: '2024–2025' },
    { company: 'Paytm', role: 'Lead Product Designer', years: '2018–2021' },
    { company: 'HDFC Bank', role: 'UX Design Manager', years: '2021–2022' },
    { company: 'Grappus Studio', role: 'UI/UX Designer', years: '2017–2018' },
  ] satisfies AboutWorkItem[],
  contact:
    'Open to staff design and design-engineering roles, workshops, and collaborations — Bengaluru & remote.',
} as const
