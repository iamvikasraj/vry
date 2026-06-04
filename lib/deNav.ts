import { getProjectBySlug } from '@/data/projects'
import { DE_ROUTES } from '@/lib/deRoutes'

export type DeNavId = 'live-projects' | 'playground'

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

  if (path === '' || path === '/' || path === '/live-projects' || path.startsWith('/live-projects/')) {
    return 'live-projects'
  }
  if (path === '/playground') return 'playground'

  const slug = projectSlugFromPath(path)
  if (!slug) return null

  const project = getProjectBySlug(slug)
  if (!project) return null

  if (project.category === 'Design Engineering') return 'playground'
  return 'live-projects'
}

/** List page to return to from a project (or default live projects). */
export function getDeListHref(pathname: string | null): string {
  const navId = getActiveDeNavId(pathname)
  return navId === 'playground' ? DE_ROUTES.playground : DE_ROUTES.liveProjects
}
