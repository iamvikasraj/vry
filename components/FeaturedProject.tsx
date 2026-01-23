import Link from 'next/link'

interface FeaturedProjectProps {
  video?: string
  image?: string
  title: string
  link: string
  client: string
  year: string
  role: string
  description: string
  tags: string[]
}

export default function FeaturedProject({
  video,
  image,
  title,
  link,
  client,
  year,
  role,
  description,
  tags,
}: FeaturedProjectProps) {
  return (
    <section className="featured-project-section">
      <div className="featured-project-content">
        <div className="featured-project-media">
          {video ? (
            <video
              loop
              muted
              playsInline
              preload="none"
              className="lazy-video featured-video"
            >
              <source data-src={video} type="video/mp4" />
            </video>
          ) : image ? (
            <img src={image} alt={title} className="featured-image" />
          ) : null}
        </div>
        <div className="featured-project-info">
          <div className="featured-project-meta">
            <span className="featured-client">{client}</span>
            <span className="featured-year">{year}</span>
            <span className="featured-role">{role}</span>
          </div>
          <h2 className="featured-project-title">
            <Link href={link}>{title}</Link>
          </h2>
          <p className="featured-project-description">{description}</p>
          <div className="featured-project-tags">
            {tags.map((tag, index) => (
              <span key={index} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
          <Link href={link} className="featured-project-cta">
            View Case Study →
          </Link>
        </div>
      </div>
    </section>
  )
}
