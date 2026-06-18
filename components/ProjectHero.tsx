type ProjectHeroProps = {
  src: string
  alt: string
}

/** Static image hero — no client JS, safe when video file is not available yet. */
export default function ProjectHero({ src, alt }: ProjectHeroProps) {
  const brandCover = src.endsWith('.svg')

  return (
    <div className="project-video-container project-video-container--bleed">
      <div className={`project-cover-wrap${brandCover ? ' project-cover-wrap--brand' : ''}`}>
        <img src={src} alt={alt} className="project-cover-image" />
      </div>
    </div>
  )
}
