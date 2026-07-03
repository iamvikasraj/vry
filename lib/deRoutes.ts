/** Primary shell routes (must match `trailingSlash: true` in next.config.js). */
export const DE_ROUTES = {
  home: '/',
  liveProjects: '/live-projects/',
  playground: '/#playground',
  workshops: '/#workshops',
} as const

export type DeRouteKey = keyof typeof DE_ROUTES

export function employerChapterHref(employerSlug: string): string {
  return `/live-projects/${employerSlug}/`
}
