import type { Project } from '@/data/projects'

/** Secondary line on home media cards — year preferred over legacy meta labels. */
export function getProjectCardMeta(
  project: Pick<Project, 'year' | 'metaLabel' | 'category'>,
): string | undefined {
  return project.year ?? project.metaLabel
}
