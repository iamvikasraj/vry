import HomeDeLayout from '@/components/HomeDeLayout'
import ProjectThumbGridSection from '@/components/ProjectThumbGridSection'
import { getPlaygroundProjects } from '@/data/projects'

export default function PlaygroundPage() {
  return (
    <HomeDeLayout>
      <section id="work" className="home-de-work home-de-work--only">
        <ProjectThumbGridSection projects={getPlaygroundProjects()} />
      </section>
    </HomeDeLayout>
  )
}
