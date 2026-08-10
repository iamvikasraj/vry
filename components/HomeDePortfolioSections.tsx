import CvSection from '@/components/CvSection'
import DeTimelinePreview from '@/components/DeTimelinePreview'
import HomeDeAboutSection from '@/components/HomeDeAboutSection'
import ProjectListSection from '@/components/ProjectListSection'
import WritingListSection from '@/components/WritingListSection'
import WorkshopListSection from '@/components/WorkshopListSection'
import {
  getDesignSystemProjects,
  getOpenSourceProjects,
  getPlaygroundProjects,
} from '@/data/projects'

export default function HomeDePortfolioSections() {
  const playgroundProjects = getPlaygroundProjects()
  const designSystemProjects = getDesignSystemProjects()
  const openSourceProjects = getOpenSourceProjects()

  return (
    <>
      <CvSection id="timeline" title="Experiences">
        <DeTimelinePreview />
      </CvSection>

      <CvSection id="workshops" title="Workshop">
        <WorkshopListSection layout="grid-2" />
      </CvSection>

      <CvSection id="playground" title="Interactions">
        <ProjectListSection
          projects={playgroundProjects}
          playOnHover
          layout="cards"
        />
      </CvSection>

      <CvSection id="writing" title="Design Engineering">
        <WritingListSection />
      </CvSection>

      <CvSection id="design-systems" title="Design Systems">
        <ProjectListSection
          projects={designSystemProjects}
          playOnHover
          layout="cards"
        />
      </CvSection>

      <CvSection id="open-source" title="Open Source">
        <ProjectListSection
          projects={openSourceProjects}
          playOnHover
          layout="cards"
        />
      </CvSection>

      <HomeDeAboutSection />
    </>
  )
}
