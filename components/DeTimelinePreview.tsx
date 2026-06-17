import Link from 'next/link'
import {
  getTimelineProjectsForYear,
  getTimelineYears,
  type TimelinePlaceholder,
} from '@/data/timelineProjects'

function TimelineProjectCard({ project }: { project: TimelinePlaceholder }) {
  return (
    <div
      className="home-de-timeline-featured__placeholder"
      aria-label={`Project ${project.id}`}
    >
      <span className="home-de-timeline-featured__placeholder-text">Project {project.id}</span>
    </div>
  )
}

type DeTimelinePreviewProps = {
  filterYear?: number
}

export default function DeTimelinePreview({ filterYear }: DeTimelinePreviewProps) {
  const years = getTimelineYears()
  const activeYear = filterYear ?? years[0]
  const yearProjects = getTimelineProjectsForYear(activeYear)

  return (
    <div className="home-de-timeline-preview" aria-label="Timeline">
      <div className="home-de-timeline-preview__years" aria-label="Filter by year">
        {years.map((year, idx) => (
          <Link
            key={`${year}-${idx}`}
            href={year === activeYear ? '/' : `/?year=${year}`}
            scroll={false}
            className={`home-de-timeline-preview__year${year === activeYear ? '' : ' home-de-timeline-preview__year--muted'}`}
            aria-current={year === activeYear ? 'true' : undefined}
          >
            {year}
          </Link>
        ))}
      </div>

      <div className="home-de-project-list home-de-project-list--cards home-de-timeline-featured">
        {yearProjects.map((project) => (
          <TimelineProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
