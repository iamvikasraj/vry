import CvSection from '@/components/CvSection'
import ProjectListSection from '@/components/ProjectListSection'
import { getPlaygroundProjects } from '@/data/projects'

export default function PlaygroundPageContent() {
  return (
    <CvSection id="playground" title="Playground">
      <ProjectListSection projects={getPlaygroundProjects()} playOnHover layout="cards" />
    </CvSection>
  )
}
