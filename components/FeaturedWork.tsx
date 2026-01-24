import Link from 'next/link'

interface FeaturedProject {
  video: string
  title: string
  link: string
  year: string
  location: string
  description: string
}

interface FeaturedWorkProps {
  projects: FeaturedProject[]
}

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  return (
    <section id="featured" className="section">
      <h2 className="h2 scroll-reveal">Featured Work</h2>
      <div className="featured-content">
        {projects.map((project, index) => (
          <article
            key={index}
            className={`featured-single scroll-reveal scroll-reveal-delay-${index + 1}`}
          >
            <div className="card-image">
              <video
                loop
                muted
                playsInline
                preload="none"
                className="lazy-video"
              >
                <source data-src={project.video} type="video/mp4" />
              </video>
            </div>
            <div className="project-info">
              <h3 className="h4">
                <Link href={project.link}>{project.title}</Link>
              </h3>
              <div className="body2 text-gray mb-sm">
                {project.year} • {project.location}
              </div>
              <p className="body1">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
