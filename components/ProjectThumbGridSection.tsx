import type { Project } from '@/data/projects'
import { getProjectThumbMedia } from '@/lib/projectMedia.server'
import ProjectThumbGrid, { type ProjectThumbGridItem } from '@/components/ProjectThumbGrid'

export default function ProjectThumbGridSection({ projects }: { projects: Project[] }) {
  const items: ProjectThumbGridItem[] = projects.map((project) => ({
    project,
    media: getProjectThumbMedia(project),
  }))

  return <ProjectThumbGrid items={items} />
}
