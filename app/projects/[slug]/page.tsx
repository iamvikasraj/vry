import { notFound } from 'next/navigation'
import ClientScripts from '@/components/ClientScripts'
import ProjectSiteHeader from '@/components/ProjectSiteHeader'
import ProjectViewTracker from '@/components/ProjectViewTracker'
import ProjectSectionTracker from '@/components/ProjectSectionTracker'
import ProjectDetailHeader from '@/components/ProjectDetailHeader'
import ProjectDetailLead from '@/components/ProjectDetailLead'
import ProjectGallery from '@/components/ProjectGallery'
import NdaGate from '@/components/NdaGate'
import ProjectArticleFooter from '@/components/ProjectArticleFooter'
import ProjectMoreProjects from '@/components/ProjectMoreProjects'
import ProjectAskTiWidget from '@/components/ProjectAskTiWidget'
import { projects, getProjectBySlug } from '@/data/projects'
import { getProjectThumbMedia } from '@/lib/projectMedia.server'
import { mediaAssetPath } from '@/lib/mediaAssetPath'

async function loadMDX(slug: string) {
  try {
    const mod = await import(`@/content/projects/${slug}.mdx`)
    return mod.default
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[MDX] Failed to load content/projects/${slug}.mdx — showing fallback.`, error)
    }
    return null
  }
}

export async function generateStaticParams() {
  // Export a static page for EVERY project, including `hidden` ones. `hidden`
  // only controls grid visibility — hidden Design Engineering projects are still
  // linked from the Interactions section, so their detail routes must exist in
  // the static export or client navigation/prefetch 404s.
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
  const { thumbSrc, videoAvailable } = getProjectThumbMedia(project)
  const preloadHero =
    !project.nda && !project.detailMediaInContent && videoAvailable && Boolean(project.video)
  const heroCaption = !project.detailMediaInContent ? project.heroCaption : undefined

  return (
    <>
      {preloadHero && thumbSrc ? (
        <link rel="preload" as="image" href={thumbSrc} />
      ) : null}
      {preloadHero ? (
        <link rel="preload" as="video" href={mediaAssetPath(project.video)} type="video/mp4" />
      ) : null}
    <div className="home-page home-page--de home-page--de-detail">
      <ProjectViewTracker projectTitle={project.title} projectSlug={project.slug} />
      <ProjectSectionTracker projectTitle={project.title} projectSlug={project.slug} />
      <main className="project-de-main">
        <ProjectSiteHeader />
        <section className="project-detail">
          <ProjectDetailHeader project={project} />

          {!project.detailMediaInContent ? (
            <ProjectDetailLead project={project} heroCaption={heroCaption} />
          ) : null}

        {project.nda ? (
          <NdaGate slug={project.slug} />
        ) : (
          <>
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
          </>
        )}

        <ProjectMoreProjects project={project} />
        <ProjectArticleFooter />
        </section>
      </main>
      <ClientScripts />
      {slug === 'loop-doctor-on-demand' && (
        <ProjectAskTiWidget projectSlug={slug} projectTitle={project.title} />
      )}
    </div>
    </>
  )
}
