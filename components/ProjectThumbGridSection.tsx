import type { Project } from '@/data/projects'
import { getProjectThumbMedia } from '@/lib/projectMedia.server'
import ProjectThumbGrid, { type ProjectThumbGridItem } from '@/components/ProjectThumbGrid'

type ProjectThumbGridSectionProps = {
  projects: Project[]
  playOnHover?: boolean
  gridClassName?: string
}

export default function ProjectThumbGridSection({
  projects,
  playOnHover = false,
  gridClassName,
}: ProjectThumbGridSectionProps) {
  const items: ProjectThumbGridItem[] = projects.map((project) => ({
    project,
    media: getProjectThumbMedia(project),
  }))

  return (
    <ProjectThumbGrid items={items} playOnHover={playOnHover} gridClassName={gridClassName} />
  )
}
