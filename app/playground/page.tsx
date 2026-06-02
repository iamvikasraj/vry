import HomeDeLayout from '@/components/HomeDeLayout'
import ProjectThumbGrid from '@/components/ProjectThumbGrid'
import { getPlaygroundProjects } from '@/data/projects'

export default function PlaygroundPage() {
  return (
    <HomeDeLayout>
      <section id="work" className="home-de-work home-de-work--only">
        <ProjectThumbGrid projects={getPlaygroundProjects()} />
      </section>
    </HomeDeLayout>
  )
}
