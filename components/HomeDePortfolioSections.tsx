import CvSection from '@/components/CvSection'
import DeTimelinePreview from '@/components/DeTimelinePreview'
import ProjectListSection from '@/components/ProjectListSection'
import WorkshopListSection from '@/components/WorkshopListSection'
import { getPlaygroundProjects } from '@/data/projects'

type HomeDePortfolioSectionsProps = {
  filterYear?: number
}

export default function HomeDePortfolioSections({ filterYear }: HomeDePortfolioSectionsProps) {
  const playgroundProjects = getPlaygroundProjects()

  return (
    <>
      <CvSection id="timeline" title="Timeline">
        <DeTimelinePreview filterYear={filterYear} />
      </CvSection>

      <CvSection id="playground" title="Design Engineering Playground">
        <ProjectListSection projects={playgroundProjects} playOnHover layout="cards" />
      </CvSection>

      <CvSection id="workshops" title="Workshop">
        <WorkshopListSection layout="list" featuredFirst />
      </CvSection>
    </>
  )
}
