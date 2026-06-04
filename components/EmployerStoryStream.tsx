import type { Project } from '@/data/projects'
import type { EmployerStoryBlock, EmployerStorySection } from '@/data/employerChapters'
import { getProjectThumbMedia } from '@/lib/projectMedia.server'
import ProjectListLink from '@/components/ProjectListLink'

type EmployerStoryStreamProps = {
  intro?: string
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
            return (
              <ProjectListLink
                key={`project-${block.slug}`}
                project={project}
                media={getProjectThumbMedia(project)}
              />
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
          <p className="home-de-employer-chapter__text">{intro}</p>
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
