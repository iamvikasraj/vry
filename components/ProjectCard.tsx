import Link from 'next/link'

interface ProjectCardProps {
  video?: string
  image?: string
  title: string
  link: string
  tags: string
  description: string
  isLarge?: boolean
  delay?: number
  overlay?: boolean
}

export default function ProjectCard({
  video,
  image,
  title,
  link,
  tags,
  description,
  isLarge = false,
  delay = 1,
  overlay = false,
}: ProjectCardProps) {
  return (
    <article
      className={`card hover-lift ${isLarge ? 'mb-lg' : 'flex-1'} scroll-reveal scroll-reveal-delay-${delay}`}
    >
      <div className={`card-image ${isLarge ? 'large relative' : ''}`}>
        {video ? (
          <video
            loop
            muted
            playsInline
            preload="none"
            className="lazy-video"
          >
            <source data-src={video} type="video/mp4" />
          </video>
        ) : image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : null}
        {overlay && (
          <div className="project-overlay absolute bottom-0 left-0 w-full p-md text-white">
            <h3 className="h3">
              <Link href={link}>{title}</Link>
            </h3>
            <div className="overline opacity-90">{tags}</div>
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="h4">
          <Link href={link}>{title}</Link>
        </h3>
        <div className="overline">{tags}</div>
        <p className="body1">{description}</p>
      </div>
    </article>
  )
}
