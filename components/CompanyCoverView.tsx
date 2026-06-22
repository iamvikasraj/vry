import FeaturedProjectCard from '@/components/FeaturedProjectCard'
import HomeDeEmailLink from '@/components/HomeDeEmailLink'
import type { CompanyCover } from '@/data/companyCovers'
import { getCoverFeaturedProjects } from '@/data/companyCovers'

type CompanyCoverViewProps = {
  cover: CompanyCover
}

export default function CompanyCoverView({ cover }: CompanyCoverViewProps) {
  const projects = getCoverFeaturedProjects(cover)

  return (
    <article className="company-cover">
      <header className="company-cover__hero">
        <p className="company-cover__lede">Prepared for {cover.companyName}</p>
        <h1 className="company-cover__headline">{cover.headline}</h1>
        <div className="company-cover__intro">
          {cover.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>

      {cover.relevance && cover.relevance.length > 0 ? (
        <section className="company-cover__section" aria-labelledby="company-cover-relevance">
          <h2 id="company-cover-relevance" className="company-cover__heading">
            Relevant experience
          </h2>
          <ul className="company-cover__list">
            {cover.relevance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="company-cover__section" aria-labelledby="company-cover-work">
          <h2 id="company-cover-work" className="company-cover__heading">
            Selected work
          </h2>
          <div className="home-de-project-list home-de-project-list--cards home-de-media-grid company-cover__grid">
            {projects.map((project) => (
              <FeaturedProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      {cover.cta ? (
        <p className="company-cover__cta">
          {cover.cta.href ? (
            <a href={cover.cta.href}>{cover.cta.label}</a>
          ) : (
            <HomeDeEmailLink className="company-cover__email-link" />
          )}
        </p>
      ) : null}
    </article>
  )
}
