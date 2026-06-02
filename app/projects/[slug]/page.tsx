import { notFound } from 'next/navigation'
import Link from 'next/link'
import ClientScripts from '@/components/ClientScripts'
import ProjectViewTracker from '@/components/ProjectViewTracker'
import ProjectSectionTracker from '@/components/ProjectSectionTracker'
import ProjectVideo from '@/components/ProjectVideo'
import { projects, getProjectBySlug, getProjectListHref } from '@/data/projects'

async function loadMDX(slug: string) {
  try {
    const mod = await import(`@/content/projects/${slug}.mdx`)
    return mod.default
  } catch {
    return null
  }
}

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

  const MDXContent = await loadMDX(slug)

  return (
    <div className="home-page home-page--de">
      <ProjectViewTracker projectTitle={project.title} projectSlug={project.slug} />
      <ProjectSectionTracker projectTitle={project.title} projectSlug={project.slug} />
      <main className="project-de-main">
        <section className="project-detail">
        <Link href={getProjectListHref(project)} className="project-back-link">
          Back
        </Link>

        <h1 className="project-title">{project.title}</h1>

        <ProjectVideo src={project.video} />

        {(project.year || project.client || project.role) && (
          <div className="project-meta-grid">
            {project.year && (
              <div className="project-meta-block">
                <span className="project-meta-label">Year</span>
                <span className="project-meta-value">{project.year}</span>
              </div>
            )}
            {project.client && (
              <div className="project-meta-block">
                <span className="project-meta-label">Client</span>
                <span className="project-meta-value">{project.client}</span>
              </div>
            )}
            {project.role && (
              <div className="project-meta-block">
                <span className="project-meta-label">Role</span>
                <span className="project-meta-value">{project.role}</span>
              </div>
            )}
            {project.tags && (
              <div className="project-meta-block">
                <span className="project-meta-label">Tools</span>
                <span className="project-meta-value">{project.tags.join(', ')}</span>
              </div>
            )}
          </div>
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
        </section>
      </main>
      <ClientScripts />
    </div>
  )
}
