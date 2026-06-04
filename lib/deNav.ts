import { getProjectBySlug } from '@/data/projects'
import { DE_ROUTES } from '@/lib/deRoutes'
import type { DePortfolioSectionId } from '@/lib/deScroll'

export type DeNavId = DePortfolioSectionId

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
  return path
}

function projectSlugFromPath(path: string): string | null {
  const normalized = normalizePath(path)
  if (!normalized.startsWith('/projects/')) return null
  const slug = normalized.slice('/projects/'.length)
  return slug.length > 0 ? slug : null
}

/** Which primary nav item is active for design-engineering shell routes. */
export function getActiveDeNavId(pathname: string | null): DeNavId | null {
  const path = normalizePath(pathname ?? '')

  if (path.startsWith('/live-projects/')) return 'live-projects'
  if (path === '/playground') return 'playground'
  if (path === '/workshops') return 'workshops'
  if (path === '' || path === '/' || path === '/live-projects') return 'live-projects'

  const slug = projectSlugFromPath(path)
  if (!slug) return null

  const project = getProjectBySlug(slug)
  if (!project) return null

  if (project.category === 'Design Engineering') return 'playground'
  return 'live-projects'
}

/** Home list anchor to return to from a project (or default live projects). */
export function getDeListHref(pathname: string | null): string {
  const navId = getActiveDeNavId(pathname)
  if (navId === 'playground') return DE_ROUTES.playground
  if (navId === 'workshops') return DE_ROUTES.workshops
  return DE_ROUTES.liveProjects
}
