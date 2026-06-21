import type { ReactNode } from 'react'

type CvSectionProps = {
  id: string
  title: string
  /** Narrow reading column for timeline-style sections. */
  narrow?: boolean
  /** Omit the visible section heading (section keeps an accessible name via `title`). */
  hideHeading?: boolean
  /** When hideHeading, use this id for aria-labelledby on a heading inside children. */
  labelledBy?: string
  children: ReactNode
}

export default function CvSection({
  id,
  title,
  narrow = false,
  hideHeading = false,
  labelledBy,
  children,
}: CvSectionProps) {
  return (
    <section
      id={id}
      className={`home-de-portfolio-section home-de-cv-section${narrow ? ' home-de-cv-section--narrow' : ''}`}
      aria-label={hideHeading && !labelledBy ? title : undefined}
      aria-labelledby={hideHeading ? labelledBy : `${id}-heading`}
    >
      {!hideHeading ? (
        <h2 id={`${id}-heading`} className="home-de-cv-section__heading">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  )
}
