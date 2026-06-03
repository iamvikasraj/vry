import { getProjectBySlug } from '@/data/projects'

export type DeNavId = 'live-projects' | 'playground'

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
  return path
}

/** Which primary nav item is active for design-engineering shell routes. */
export function getActiveDeNavId(pathname: string | null): DeNavId | null {
  const path = normalizePath(pathname ?? '')

  if (path === '/' || path === '/live-projects') return 'live-projects'
  if (path === '/playground') return 'playground'

  if (path.startsWith('/projects/')) {
    const slug = path.slice('/projects/'.length)
    const project = getProjectBySlug(slug)
    if (!project) return null
    if (project.category === 'Design Engineering') return 'playground'
    if (project.tags.includes('Live Projects')) return 'live-projects'
  }

  return null
}
