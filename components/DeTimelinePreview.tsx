import FeaturedProjectCard from '@/components/FeaturedProjectCard'
import { getAllExperienceProjects } from '@/data/featuredCompanies'

export default function DeTimelinePreview() {
  const projects = getAllExperienceProjects()
  const [hero, ...rest] = projects

  return (
    <div className="home-de-timeline-preview">
      {hero ? <FeaturedProjectCard project={hero} variant="hero" /> : null}
      {rest.length > 0 ? (
        <div className="home-de-project-list home-de-project-list--cards home-de-timeline-preview__grid">
          {rest.map((project) => (
            <FeaturedProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
