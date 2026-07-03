import type { Project } from '@/data/projects'

/** Secondary line on home media cards — category-style label only (years omitted). */
export function getProjectCardMeta(
  project: Pick<Project, 'year' | 'metaLabel' | 'category'>,
): string | undefined {
  return project.metaLabel
}
