import { notFound } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'
import ClientScripts from '@/components/ClientScripts'
import { projects, getProjectBySlug } from '@/data/projects'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="page-container">
      <section className="project-detail">
        <Link href="/" className="project-back-link">
          Back
        </Link>
        
        <div className="project-header">
          <h1 className="project-title">{project.title}</h1>
          {(project.year || project.client || project.role) && (
            <div className="project-meta">
              {project.year && <span className="project-meta-item">{project.year}</span>}
              {project.client && <span className="project-meta-item">{project.client}</span>}
              {project.role && <span className="project-meta-item">{project.role}</span>}
            </div>
          )}
        </div>
        
        <div className="project-video-container">
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="project-video"
          >
            <source src={project.video} type="video/mp4" />
          </video>
        </div>
        
        <div className="project-content">
          <p className="project-description">{project.description}</p>
          
          {project.context && (
            <div className="project-section">
              <h2 className="project-section-title">Context</h2>
              <p className="project-section-text">{project.context}</p>
            </div>
          )}
          
          {project.process && project.process.length > 0 && (
            <div className="project-section">
              <h2 className="project-section-title">Process</h2>
              <ul className="project-process-list">
                {project.process.map((step, index) => (
                  <li key={index} className="project-process-item">{step}</li>
                ))}
              </ul>
            </div>
          )}
          
          {project.results && (
            <div className="project-section">
              <h2 className="project-section-title">Results</h2>
              <p className="project-section-text">{project.results}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ClientScripts />
    </div>
  )
}
