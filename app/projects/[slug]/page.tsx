import { notFound } from 'next/navigation'
import ClientScripts from '@/components/ClientScripts'
import ProjectSiteHeader from '@/components/ProjectSiteHeader'
import ProjectViewTracker from '@/components/ProjectViewTracker'
import ProjectSectionTracker from '@/components/ProjectSectionTracker'
import ProjectDetailMedia from '@/components/ProjectDetailMedia'
import ProjectGallery from '@/components/ProjectGallery'
import ProjectArticleFooter from '@/components/ProjectArticleFooter'
import ProjectMoreProjects from '@/components/ProjectMoreProjects'
import { projects, getProjectBySlug } from '@/data/projects'

async function loadMDX(slug: string) {
  try {
    const mod = await import(`@/content/projects/${slug}.mdx`)
    return mod.default
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  return projects.filter((p) => !p.hidden).map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const MDXContent = await loadMDX(slug)

  return (
    <div className="home-page home-page--de home-page--de-detail">
      <ProjectViewTracker projectTitle={project.title} projectSlug={project.slug} />
      <ProjectSectionTracker projectTitle={project.title} projectSlug={project.slug} />
      <main className="project-de-main">
        <ProjectSiteHeader />
        <section className="project-detail">
          <header className="project-detail-header">
            <div className="project-detail-hero">
              <h1 className="project-title">{project.title}</h1>
              {(project.client || project.year || project.role) && (
                <p className="project-detail-byline">
                  {[project.client, project.year, project.role].filter(Boolean).join(' · ')}
                </p>
              )}
              {project.tools && project.tools.length > 0 && (
                <p className="project-detail-tools">{project.tools.join(', ')}</p>
              )}
            </div>
          </header>

          <div className="project-detail-media">
            <ProjectDetailMedia project={project} />
          </div>

        {!MDXContent && project.images && project.images.length > 0 && (
          <ProjectGallery
            images={project.images.map((src) => ({
              src,
              alt: project.title,
            }))}
          />
        )}

        <div className="project-content">
          {MDXContent ? (
            <MDXContent />
          ) : (
            <>
              <div className="project-section" id="project-description">
                <p className="project-description">{project.description}</p>
              </div>

              {project.context && (
                <div className="project-section" id="project-context">
                  <h2 className="project-section-title">Context</h2>
                  <p className="project-section-text">{project.context}</p>
                </div>
              )}

              {project.process && project.process.length > 0 && (
                <div className="project-section" id="project-process">
                  <h2 className="project-section-title">Process</h2>
                  <ul className="project-process-list">
                    {project.process.map((step, index) => (
                      <li key={index} className="project-process-item">{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.results && (
                <div className="project-section" id="project-results">
                  <h2 className="project-section-title">Results</h2>
                  <p className="project-section-text">{project.results}</p>
                </div>
              )}
            </>
          )}
        </div>

        <ProjectMoreProjects project={project} />
        <ProjectArticleFooter />
        </section>
      </main>
      <ClientScripts />
    </div>
  )
}
