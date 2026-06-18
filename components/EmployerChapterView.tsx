import type { LiveEmployerCard } from '@/data/employerCards'
import type { EmployerChapterContent } from '@/data/employerChapters'
import { chapterProjectSlugs } from '@/data/employerChapters'
import { getProjectThumbMedia } from '@/lib/projectMedia.server'
import EmployerStoryStream from '@/components/EmployerStoryStream'
import ProjectThumbGrid from '@/components/ProjectThumbGrid'
import type { ProjectThumbGridItem } from '@/components/ProjectThumbGrid'

type EmployerChapterViewProps = {
  card: LiveEmployerCard
  chapter: EmployerChapterContent
}

export default function EmployerChapterView({ card, chapter }: EmployerChapterViewProps) {
  const { employer, projects } = card
  const projectsBySlug = new Map(projects.map((project) => [project.slug, project]))
  const inlinedSlugs = new Set(chapterProjectSlugs(chapter))
  const remainingProjects = projects.filter((project) => !inlinedSlugs.has(project.slug))

  const remainingItems: ProjectThumbGridItem[] = remainingProjects.map((project) => ({
    project,
    media: getProjectThumbMedia(project),
  }))

  return (
    <article className="home-de-employer-chapter">
      <header className="home-de-employer-chapter__header">
        <h1 className="home-de-employer-chapter__title">{employer.company}</h1>
        <p className="home-de-employer-chapter__position">{employer.position}</p>
        <p className="home-de-employer-chapter__period">{employer.period}</p>
        {chapter.companyImage ? (
          <figure className="home-de-employer-chapter__screen">
            <img
              src={chapter.companyImage}
              alt={chapter.companyImageAlt ?? `${employer.company} product screenshot`}
            />
            {chapter.companyImageCaption ? (
              <figcaption className="home-de-employer-chapter__screen-caption">
                {chapter.companyImageCaption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
        {chapter.companyContext ? (
          <p className="home-de-employer-chapter__context">{chapter.companyContext}</p>
        ) : null}
      </header>

      <EmployerStoryStream
        intro={chapter.intro}
        sections={chapter.sections}
        projectsBySlug={projectsBySlug}
      />

      {remainingItems.length > 0 ? (
        <section className="home-de-employer-chapter__work" aria-labelledby="employer-cases-heading">
          <h2 id="employer-cases-heading" className="home-de-employer-chapter__heading">
            More work
          </h2>
          <ProjectThumbGrid items={remainingItems} />
        </section>
      ) : null}
    </article>
  )
}
