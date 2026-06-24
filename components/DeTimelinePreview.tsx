import FeaturedProjectCard from '@/components/FeaturedProjectCard'
import { getAllExperienceProjects } from '@/data/featuredCompanies'

export default function DeTimelinePreview() {
  const projects = getAllExperienceProjects()

  return (
    <div className="home-de-timeline-preview">
      <div className="home-de-media-grid">
        {projects.map((project) => (
          <FeaturedProjectCard
            key={project.slug}
            project={project}
            variant={project.hero ? 'hero' : 'default'}
          />
        ))}
      </div>
    </div>
  )
}
