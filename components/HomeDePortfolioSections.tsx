import EmployerThumbGridSection from '@/components/EmployerThumbGridSection'
import ProjectListSection from '@/components/ProjectListSection'
import WorkshopListSection from '@/components/WorkshopListSection'
import { getPlaygroundProjects } from '@/data/projects'

export default function HomeDePortfolioSections() {
  return (
    <>
      <section
        id="live-projects"
        className="home-de-portfolio-section home-de-work"
        aria-label="Live Projects"
      >
        <EmployerThumbGridSection />
      </section>

      <section
        id="playground"
        className="home-de-portfolio-section home-de-work"
        aria-label="Playground"
      >
        <ProjectListSection projects={getPlaygroundProjects()} playOnHover />
      </section>

      <section
        id="workshops"
        className="home-de-portfolio-section home-de-work"
        aria-label="Workshops"
      >
        <WorkshopListSection />
      </section>
    </>
  )
}
