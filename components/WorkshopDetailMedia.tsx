import type { Workshop } from '@/data/workshops'
import MediaPlaceholder from '@/components/MediaPlaceholder'
import ProjectHero from '@/components/ProjectHero'
import ProjectVideo from '@/components/ProjectVideo'

export default function WorkshopDetailMedia({ workshop }: { workshop: Workshop }) {
  if (workshop.video) {
    return <ProjectVideo src={workshop.video} poster={workshop.thumbnail} />
  }

  if (workshop.thumbnail) {
    return <ProjectHero src={workshop.thumbnail} alt={workshop.title} />
  }

  return (
    <div className="project-video-container project-video-container--bleed">
      <div className="project-media-placeholder-wrap">
        <MediaPlaceholder label="" className="project-media-placeholder" />
      </div>
    </div>
  )
}
