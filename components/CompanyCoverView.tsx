import ProjectListLink from '@/components/ProjectListLink'
import HomeDeEmailLink from '@/components/HomeDeEmailLink'
import CompanyCoverCollapsibleSection from '@/components/CompanyCoverCollapsibleSection'
import CompanyCoverSectionsStagger from '@/components/CompanyCoverSectionsStagger'
import type { CompanyCover, CompanyCoverProjectRef, CompanyCoverSection } from '@/data/companyCovers'
import { getProjectBySlug } from '@/data/projects'
import { getProjectThumbMedia } from '@/lib/projectMedia.server'

type CompanyCoverViewProps = {
  cover: CompanyCover
}

function CoverProjectList({ projects }: { projects: CompanyCoverProjectRef[] }) {
  if (projects.length === 0) return null

  return (
    <div className="home-de-project-list company-cover__projects">
      {projects.map(({ slug, note }) => {
        const project = getProjectBySlug(slug)
        if (!project) return null

        return (
          <ProjectListLink
            key={slug}
            project={project}
            media={getProjectThumbMedia(project)}
            impact={note}
          />
        )
      })}
    </div>
  )
}

function CoverSectionBody({ section }: { section: CompanyCoverSection }) {
  return (
    <div className="company-cover__section-body">
      <div className="company-cover__prose">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {section.projects ? <CoverProjectList projects={section.projects} /> : null}
    </div>
  )
}

export default function CompanyCoverView({ cover }: CompanyCoverViewProps) {
  const meta = [cover.companyName, cover.location].filter(Boolean).join(' · ')

  return (
    <article className="company-cover">
      <header className="company-cover__letterhead">
        {cover.roleTitle ? <h1 className="company-cover__role">{cover.roleTitle}</h1> : null}
        {meta ? <p className="company-cover__meta">{meta}</p> : null}
      </header>

      <div className="company-cover__opening">
        {(Array.isArray(cover.opening) ? cover.opening : [cover.opening]).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <CompanyCoverSectionsStagger>
        {cover.sections.map((section) =>
          section.collapsible === false ? (
            <section
              key={section.id}
              data-cover-section
              className="company-cover__section"
              aria-labelledby={`cover-${section.id}`}
            >
              <h2 id={`cover-${section.id}`} className="company-cover__section-title">
                {section.title}
              </h2>
              <CoverSectionBody section={section} />
            </section>
          ) : (
            <CompanyCoverCollapsibleSection
              key={section.id}
              id={section.id}
              title={section.title}
              role={section.role}
              period={section.period}
              defaultOpen={section.defaultOpen}
            >
              <CoverSectionBody section={section} />
            </CompanyCoverCollapsibleSection>
          ),
        )}
      </CompanyCoverSectionsStagger>

      {cover.closing ? <p className="company-cover__closing">{cover.closing}</p> : null}

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
