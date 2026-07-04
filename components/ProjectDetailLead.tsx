import type { Project } from '@/data/projects'
import ProjectDetailMedia from '@/components/ProjectDetailMedia'

type ProjectDetailLeadProps = {
  project: Project
  heroCaption?: Project['heroCaption']
}

function ProjectDetailOutcome({ heroCaption }: { heroCaption: Project['heroCaption'] }) {
  if (!heroCaption) return null

  if (heroCaption.outcomeParts?.length) {
    return (
      <p className="project-detail-outcome">
        {heroCaption.outcomeParts.map((part, index) =>
          part.bold ? (
            <strong key={index} className="mdx-strong">
              {part.text}
            </strong>
          ) : (
            <span key={index}>{part.text}</span>
          ),
        )}
      </p>
    )
  }

  const outcome = heroCaption.outcome ?? heroCaption.text
  if (!outcome) return null

  return <p className="project-detail-outcome">{outcome}</p>
}

export default function ProjectDetailLead({ project, heroCaption }: ProjectDetailLeadProps) {
  const hasOutcome =
    Boolean(heroCaption?.outcomeParts?.length) ||
    Boolean(heroCaption?.outcome ?? heroCaption?.text)

  return (
    <div className="project-detail-lead">
      <figure className="project-detail-media-figure">
        <ProjectDetailMedia project={project} />
        {heroCaption?.link ? (
          <figcaption className="project-figure-caption">
            <a
              href={heroCaption.link.href}
              className="project-detail-media-caption__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {heroCaption.link.label}
            </a>
          </figcaption>
        ) : null}
      </figure>
      {hasOutcome ? <ProjectDetailOutcome heroCaption={heroCaption} /> : null}
    </div>
  )
}
