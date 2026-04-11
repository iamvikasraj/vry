export interface WorkEmployer {
  /** URL-safe path segment for terminal-style links */
  slug: string
  company: string
  period: string
}

export const workEmployers: WorkEmployer[] = [
  { slug: 'loop-health', company: 'Loop Health', period: '2025-Present' },
  { slug: 'et-money', company: 'ET Money', period: '2024-2024' },
  { slug: 'time-bridge', company: 'Time Bridge', period: '2022-2024' },
  { slug: 'hdfc', company: 'HDFC', period: '2021-2022' },
  { slug: 'paytm', company: 'Paytm', period: '2018-2021' },
  { slug: 'grappus', company: 'Grappus', period: '2017-2018' },
  { slug: 'proprofs', company: 'ProProfs', period: '2016-2017' },
  { slug: 'startup', company: 'Startup', period: '2015-2016' },
]
