/** Workshop detail URL (`trailingSlash: true` in next.config.js). */
export function workshopHref(slug: string): string {
  return `/workshops/${slug}/`
}
