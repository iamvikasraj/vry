type ProjectFigureProps = {
  src: string
  alt: string
  caption?: string
  /** phone = mobile screens; wide = tall boards; collage = dark process board; compact = small inline */
  variant?: 'default' | 'phone' | 'wide' | 'collage' | 'compact'
}

export default function ProjectFigure({
  src,
  alt,
  caption,
  variant = 'default',
}: ProjectFigureProps) {
  return (
    <figure className={`project-figure project-figure--${variant}`}>
      <div className={`project-figure-media project-figure-media--${variant}`}>
        <img src={src} alt={alt} className="project-figure-image" loading="lazy" decoding="async" />
      </div>
      {caption && <figcaption className="project-figure-caption">{caption}</figcaption>}
    </figure>
  )
}
