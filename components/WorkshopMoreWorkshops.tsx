import type { Workshop } from '@/data/workshops'
import { getPortfolioWorkshops } from '@/data/workshops'
import Link from 'next/link'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import { workshopHref } from '@/lib/workshopHref'

type WorkshopMoreWorkshopsProps = {
  workshop: Workshop
}

export default function WorkshopMoreWorkshops({ workshop }: WorkshopMoreWorkshopsProps) {
  const related = getPortfolioWorkshops()
    .filter((item) => item.slug !== workshop.slug)
    .slice(0, 2)

  if (related.length === 0) return null

  return (
    <aside className="de-more-projects" aria-labelledby="de-more-workshops-heading">
      <h2 id="de-more-workshops-heading" className="de-more-projects__heading">
        More workshops
      </h2>
      <div className="de-more-projects__list">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={workshopHref(item.slug)}
            className="de-more-projects__preview"
            aria-label={item.title}
          >
            <div className="de-more-projects__preview-thumb" style={{ aspectRatio: '16 / 9' }}>
              {item.video ? (
                <video
                  src={mediaAssetPath(item.video)}
                  className="de-more-projects__preview-video"
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden
                />
              ) : item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt=""
                  className="de-more-projects__preview-image"
                  loading="lazy"
                />
              ) : (
                <MediaPlaceholder className="de-more-projects__preview-placeholder" label="" />
              )}
            </div>
            <div className="de-more-projects__preview-content">
              <h3 className="de-more-projects__preview-title">{item.title}</h3>
              <p className="de-more-projects__preview-desc">{item.description}</p>
              <span className="de-more-projects__preview-cta">View workshop</span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}
