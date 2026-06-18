import type { Project } from '@/data/projects'
import type { EmployerStoryBlock, EmployerStorySection } from '@/data/employerChapters'
import { getProjectThumbMedia } from '@/lib/projectMedia.server'
import PressListLink from '@/components/PressListLink'
import ProjectListLink from '@/components/ProjectListLink'

type EmployerStoryStreamProps = {
  intro?: string | string[]
  sections: EmployerStorySection[]
  projectsBySlug: Map<string, Project>
}

function StoryBlocks({
  blocks,
  projectsBySlug,
}: {
  blocks: EmployerStoryBlock[]
  projectsBySlug: Map<string, Project>
}) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'prose':
            return (
              <p key={`prose-${index}`} className="home-de-employer-chapter__text">
                {block.text}
              </p>
            )
          case 'thinking':
            return (
              <p key={`thinking-${index}`} className="home-de-employer-chapter__text">
                {block.text}
              </p>
            )
          case 'project': {
            const project = projectsBySlug.get(block.slug)
            if (!project) return null
            const caseStudyLabel = block.heading ?? 'Case study'
            return (
              <div
                key={`project-${block.slug}`}
                className="home-de-employer-chapter__case-study"
                aria-label={caseStudyLabel}
              >
                <p className="home-de-employer-chapter__story-label">{caseStudyLabel}</p>
                <ProjectListLink project={project} media={getProjectThumbMedia(project)} />
              </div>
            )
          }
          case 'sources': {
            const pressLabel = block.label ?? 'Press'
            return (
              <aside
                key={`sources-${index}`}
                className="home-de-employer-chapter__press"
                aria-label={pressLabel}
              >
                <p className="home-de-employer-chapter__story-label">{pressLabel}</p>
                <div className="home-de-press-list home-de-employer-chapter__press-list">
                  {block.items.map((item) => (
                    <PressListLink key={item.url} item={item} />
                  ))}
                </div>
              </aside>
            )
          }
          default:
            return null
        }
      })}
    </>
  )
}

export default function EmployerStoryStream({ intro, sections, projectsBySlug }: EmployerStoryStreamProps) {
  return (
    <div className="home-de-employer-chapter__story">
      {intro ? (
        <section className="home-de-employer-chapter__intro" aria-label="Introduction">
          {(Array.isArray(intro) ? intro : [intro]).map((paragraph, index) => (
            <p key={`intro-${index}`} className="home-de-employer-chapter__text">
              {paragraph}
            </p>
          ))}
        </section>
      ) : null}

      {sections.map((section) => {
        const headingId = section.title ? `employer-section-${section.id}` : undefined
        return (
          <section
            key={section.id}
            className="home-de-employer-chapter__section"
            aria-labelledby={headingId}
          >
            {section.title ? (
              <h2 id={headingId} className="home-de-employer-chapter__section-title">
                {section.title}
              </h2>
            ) : null}
            <div className="home-de-employer-chapter__section-body">
              <StoryBlocks blocks={section.blocks} projectsBySlug={projectsBySlug} />
            </div>
          </section>
        )
      })}
    </div>
  )
}
