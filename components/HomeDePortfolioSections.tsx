import CvSection from '@/components/CvSection'
import DeTimelinePreview from '@/components/DeTimelinePreview'
import ProjectListSection from '@/components/ProjectListSection'
import WorkshopListSection from '@/components/WorkshopListSection'
import { getPlaygroundProjects } from '@/data/projects'

type HomeDePortfolioSectionsProps = {
  filterCompany?: string
}

export default function HomeDePortfolioSections({ filterCompany }: HomeDePortfolioSectionsProps) {
  const playgroundProjects = getPlaygroundProjects()

  return (
    <>
      <CvSection id="timeline" title="Featured project" hideHeading>
        <DeTimelinePreview filterCompany={filterCompany} />
      </CvSection>

      <CvSection id="playground" title="Interaction Playground">
        <ProjectListSection
          projects={playgroundProjects}
          playOnHover
          layout="cards"
        />
      </CvSection>

      <CvSection id="workshops" title="Workshop">
        <WorkshopListSection featuredFirst />
      </CvSection>
    </>
  )
}
