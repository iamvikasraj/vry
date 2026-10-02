import CvSection from '@/components/CvSection'
import DeTimelinePreview from '@/components/DeTimelinePreview'
import HomeDeAboutSection from '@/components/HomeDeAboutSection'
import ProjectListSection from '@/components/ProjectListSection'
import WritingListSection from '@/components/WritingListSection'
import WorkshopListSection from '@/components/WorkshopListSection'
import { getPlaygroundProjects } from '@/data/projects'

export default function HomeDePortfolioSections() {
  // 3 · 1 · 3 · 1 on desktop.
  const playgroundProjects = getPlaygroundProjects().slice(0, 8)

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

      <HomeDeAboutSection />
    </>
  )
}
