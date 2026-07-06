type LinkedInEmbedProps = {
  /** Post URN, e.g. "urn:li:activity:7429072060917907456" (from the activity id in the post URL). */
  urn: string
  title?: string
  /** Iframe height in px — LinkedIn embeds don't auto-size, so tune per post. */
  height?: number
}

/** Live LinkedIn post embed via LinkedIn's official iframe endpoint. */
export default function LinkedInEmbed({
  urn,
  title = 'LinkedIn post',
  height = 640,
}: LinkedInEmbedProps) {
  const src = `https://www.linkedin.com/embed/feed/update/${urn}`

  return (
    <figure className="linkedin-embed">
      <iframe
        src={src}
        title={title}
        height={height}
        className="linkedin-embed__frame"
        loading="lazy"
        allowFullScreen
      />
    </figure>
  )
}
