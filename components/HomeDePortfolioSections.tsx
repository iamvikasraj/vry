import CvSection from '@/components/CvSection'
import DeTimelinePreview from '@/components/DeTimelinePreview'
import HomeDeAboutSection from '@/components/HomeDeAboutSection'
import ProjectListSection from '@/components/ProjectListSection'
import WritingListSection from '@/components/WritingListSection'
import WorkshopListSection from '@/components/WorkshopListSection'
import { getPlaygroundProjects } from '@/data/projects'

export default function HomeDePortfolioSections() {
  const playgroundProjects = getPlaygroundProjects()

  return (
    <>
      <CvSection id="timeline" title="Experiences">
        <DeTimelinePreview />
      </CvSection>

      <CvSection id="playground" title="Interactions">
        <ProjectListSection
          projects={playgroundProjects}
          playOnHover
          layout="cards"
        />
      </CvSection>

      <CvSection id="workshops" title="Workshop">
        <WorkshopListSection layout="grid-2" />
      </CvSection>

      <CvSection id="writing" title="designengineer.ing">
        <WritingListSection />
      </CvSection>

      <HomeDeAboutSection />
    </>
  )
}
