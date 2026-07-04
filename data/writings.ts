export type Writing = {
  slug: string
  title: string
  /** Shorter label on home grid cards (defaults to `title`). */
  cardTitle?: string
  /** Full URL on designengineer.ing */
  url: string
  thumbnail?: string
  video?: string
}

export const writings: Writing[] = [
  {
    slug: 'dawn-aesthetics-design',
    title: 'The dawn of new aesthetics — the design breakdown',
    cardTitle: 'The dawn of new aesthetics',
    url: 'https://designengineer.ing/the-dawn-of-new-aesthetics-the-design-breakdown',
    thumbnail: 'https://designengineer.ing/videos/oi0WKYQ1ee_hQ8kx-poster.jpg',
  },
  {
    slug: 'rive-swiftui-balloons',
    title: 'Floating Balloon using Rive Scripting and Prototyped using SwiftUI',
    cardTitle: 'Floating Balloons — Rive & SwiftUI',
    url: 'https://designengineer.ing/rive-swiftui-balloons',
    video: '/assets/video/Interactive Balloons with Rive and Swiftui for the Contra challenge.mp4',
    thumbnail: 'https://designengineer.ing/videos/Rive%20balloon-poster.jpg',
  },
]

export function getPortfolioWritings(): Writing[] {
  return writings
}
