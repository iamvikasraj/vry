type ProjectGalleryProps = {
  images: { src: string; alt: string }[]
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  if (images.length === 0) return null

  return (
    <div className="project-gallery">
      {images.map((image) => (
        <figure key={image.src} className="project-gallery-item">
          <div className="project-gallery-media">
            <img
              src={image.src}
              alt={image.alt}
              className="project-gallery-image"
              loading="lazy"
            />
          </div>
        </figure>
      ))}
    </div>
  )
}
