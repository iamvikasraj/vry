import HomeDeLayout from '@/components/HomeDeLayout'
import ProjectThumbGrid from '@/components/ProjectThumbGrid'
import { getLiveProjects } from '@/data/projects'

export default function LiveProjectsPage() {
  return (
    <HomeDeLayout>
      <section id="work" className="home-de-work home-de-work--only">
        <ProjectThumbGrid projects={getLiveProjects()} />
      </section>
    </HomeDeLayout>
  )
}
