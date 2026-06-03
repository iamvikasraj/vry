import type { ReactNode } from 'react'

type ProjectFigureGridProps = {
  children: ReactNode
  /** phones = 2×2 mobile screenshots (Twitter, etc.) */
  layout?: 'default' | 'phones'
}

export default function ProjectFigureGrid({ children, layout = 'default' }: ProjectFigureGridProps) {
  const className =
    layout === 'phones' ? 'project-figure-grid project-figure-grid--phones' : 'project-figure-grid'
  return <div className={className}>{children}</div>
}
