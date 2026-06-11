import type { ReactNode } from 'react'

type CvSectionProps = {
  id: string
  title: string
  /** Narrow reading column for timeline-style sections. */
  narrow?: boolean
  children: ReactNode
}

export default function CvSection({ id, title, narrow = false, children }: CvSectionProps) {
  return (
    <section
      id={id}
      className={`home-de-portfolio-section home-de-cv-section${narrow ? ' home-de-cv-section--narrow' : ''}`}
      aria-labelledby={`${id}-heading`}
    >
      <h2 id={`${id}-heading`} className="home-de-cv-section__heading">
        {title}
      </h2>
      {children}
    </section>
  )
}
