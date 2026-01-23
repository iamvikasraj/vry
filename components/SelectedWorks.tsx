import ProjectCard from './ProjectCard'

interface Project {
  video?: string
  image?: string
  title: string
  link: string
  tags: string
  description: string
  isLarge?: boolean
  overlay?: boolean
}

interface SelectedWorksProps {
  leadProject: Project
  gridProjects: Project[]
}

export default function SelectedWorks({ leadProject, gridProjects }: SelectedWorksProps) {
  return (
    <section id="projects" className="section">
      <h2 className="h2 scroll-reveal">Selected Works</h2>
      <div className="projects-content">
        {/* Lead Project */}
        <ProjectCard
          {...leadProject}
          isLarge={true}
          delay={1}
          overlay={true}
        />

        {/* Three Column Projects */}
        <div className="projects-grid flex gap-md mb-lg">
          {gridProjects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              delay={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
