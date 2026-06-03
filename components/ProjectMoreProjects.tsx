import type { Project } from '@/data/projects'
import { getRelatedProjects } from '@/data/projects'
import ProjectPreviewCard from '@/components/ProjectPreviewCard'

type ProjectMoreProjectsProps = {
  project: Project
}

export default function ProjectMoreProjects({ project }: ProjectMoreProjectsProps) {
  const related = getRelatedProjects(project, 2)
  if (related.length === 0) return null

  const heading =
    project.category === 'Design Engineering' ? 'More experiments' : 'More projects'

  return (
    <aside className="de-more-projects" aria-labelledby="de-more-projects-heading">
      <h2 id="de-more-projects-heading" className="de-more-projects__heading">
        {heading}
      </h2>
      <div className="de-more-projects__list">
        {related.map((item) => (
          <ProjectPreviewCard key={item.slug} project={item} />
        ))}
      </div>
    </aside>
  )
}
