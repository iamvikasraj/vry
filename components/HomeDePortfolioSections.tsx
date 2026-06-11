import CvSection from '@/components/CvSection'
import ProjectListSection from '@/components/ProjectListSection'
import WorkshopListSection from '@/components/WorkshopListSection'
import { getPlaygroundPreviewProjects } from '@/data/projects'

export default function HomeDePortfolioSections() {
  const playgroundPreview = getPlaygroundPreviewProjects()

  return (
    <>
      <CvSection id="playground" title="Playground">
        <ProjectListSection projects={playgroundPreview} playOnHover layout="cards" />
      </CvSection>

      <CvSection id="workshops" title="Workshop">
        <WorkshopListSection layout="list" />
      </CvSection>
    </>
  )
}
