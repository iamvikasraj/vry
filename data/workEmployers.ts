export interface WorkEmployer {
  /** URL-safe path segment for terminal-style links */
  slug: string
  company: string
  position: string
  period: string
  /** Square mark in employer cards (`public/assets/employers/{slug}.svg`). */
  logo: string
}

const employerLogoFiles: Record<string, string> = {
  paytm: 'paytm.svg',
  'et-money': 'et-money.svg',
  'loop-health': 'loop-health.png',
  'time-bridge': 'time-bridge.png',
  grappus: 'grappus.png',
  hdfc: 'hdfc.svg',
  proprofs: 'proprofs.png',
  startup: 'startup.svg',
}

export function employerLogoPath(slug: string): string {
  return `/assets/employers/${employerLogoFiles[slug] ?? `${slug}.svg`}`
}

export function getEmployerBySlug(slug: string): WorkEmployer | undefined {
  return workEmployers.find((employer) => employer.slug === slug)
}

export const workEmployers: WorkEmployer[] = [
  {
    slug: 'paytm',
    company: 'Paytm',
    position: 'Lead Product Designer',
    period: '2018–2021',
    logo: employerLogoPath('paytm'),
  },
  {
    slug: 'et-money',
    company: 'ET Money',
    position: 'Lead Product Designer',
    period: '2024',
    logo: employerLogoPath('et-money'),
  },
  {
    slug: 'loop-health',
    company: 'Loop Health',
    position: 'Staff Product Designer & Technologist',
    period: '2025–Present',
    logo: employerLogoPath('loop-health'),
  },
  {
    slug: 'time-bridge',
    company: 'Times Bridge',
    position: 'Lead Product Designer',
    period: '2022–2024',
    logo: employerLogoPath('time-bridge'),
  },
  {
    slug: 'grappus',
    company: 'Grappus',
    position: 'Product Designer',
    period: '2017–2018',
    logo: employerLogoPath('grappus'),
  },
  {
    slug: 'hdfc',
    company: 'HDFC',
    position: 'Design Director',
    period: '2021–2022',
    logo: employerLogoPath('hdfc'),
  },
  {
    slug: 'proprofs',
    company: 'ProProfs',
    position: 'Product Designer',
    period: '2016–2017',
    logo: employerLogoPath('proprofs'),
  },
  {
    slug: 'startup',
    company: 'Startup',
    position: 'Product Designer',
    period: '2015–2016',
    logo: employerLogoPath('startup'),
  },
]

/** Maps portfolio `client` labels to `workEmployers` slugs. */
export const projectClientToEmployerSlug: Record<string, string> = {
  'Loop Health': 'loop-health',
  'ET Money': 'et-money',
  'Times Bridge': 'time-bridge',
  Paytm: 'paytm',
  Uber: 'grappus',
  HDFC: 'hdfc',
  'HDFC Bank': 'hdfc',
}
