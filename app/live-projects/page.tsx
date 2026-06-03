import HomeDeLayout from '@/components/HomeDeLayout'
import ProjectThumbGridSection from '@/components/ProjectThumbGridSection'
import { getLiveProjects } from '@/data/projects'

export default function LiveProjectsPage() {
  return (
    <HomeDeLayout>
      <section id="work" className="home-de-work home-de-work--only">
        <ProjectThumbGridSection projects={getLiveProjects()} />
      </section>
    </HomeDeLayout>
  )
}
