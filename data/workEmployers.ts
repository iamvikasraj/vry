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
  'et-money': 'et-money.png',
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

/** First calendar year from a period string, e.g. `2022–2024` → `2022`. */
export function employerStartYear(period: string): string {
  return period.match(/\d{4}/)?.[0] ?? period
}

function parseEmployerPeriod(period: string): { startYear: number; endYear: number } {
  const years = period.match(/\d{4}/g)?.map((year) => parseInt(year, 10)) ?? []
  const startYear = years[0] ?? 0
  const endYear = period.includes('Present') ? 9999 : years[1] ?? startYear
  return { startYear, endYear }
}

/** Sidebar work history, newest first. */
export function getEmployerTimeline(): WorkEmployer[] {
  return [...workEmployers].sort((a, b) => {
    const aPeriod = parseEmployerPeriod(a.period)
    const bPeriod = parseEmployerPeriod(b.period)
    if (bPeriod.endYear !== aPeriod.endYear) return bPeriod.endYear - aPeriod.endYear
    return bPeriod.startYear - aPeriod.startYear
  })
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
