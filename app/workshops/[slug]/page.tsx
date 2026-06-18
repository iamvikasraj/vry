import { notFound } from 'next/navigation'
import ClientScripts from '@/components/ClientScripts'
import ProjectSiteHeader from '@/components/ProjectSiteHeader'
import ProjectArticleFooter from '@/components/ProjectArticleFooter'
import WorkshopDetailMedia from '@/components/WorkshopDetailMedia'
import WorkshopMoreWorkshops from '@/components/WorkshopMoreWorkshops'
import { workshops, getWorkshopBySlug } from '@/data/workshops'

async function loadMDX(slug: string) {
  try {
    const mod = await import(`@/content/workshops/${slug}.mdx`)
    return mod.default
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  return workshops
    .filter((workshop) => workshop.portfolio !== false)
    .map((workshop) => ({
      slug: workshop.slug,
    }))
}

export default async function WorkshopDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const workshop = getWorkshopBySlug(slug)

  if (!workshop) {
    notFound()
  }

  const MDXContent = await loadMDX(slug)

  return (
    <div className="home-page home-page--de home-page--de-detail">
      <main className="project-de-main">
        <ProjectSiteHeader />
        <section className="project-detail">
          <header className="project-detail-header">
            <div className="project-detail-hero">
              <h1 className="project-title">{workshop.title}</h1>
              {(workshop.venue || workshop.year) && (
                <p className="project-detail-byline">
                  {[workshop.venue, workshop.year].filter(Boolean).join(' · ')}
                </p>
              )}
              {workshop.includes && workshop.includes.length > 0 && (
                <p className="project-detail-tools">{workshop.includes.join(', ')}</p>
              )}
            </div>
          </header>

          <div className="project-detail-media">
            <WorkshopDetailMedia workshop={workshop} />
          </div>

          <div className="project-content">
            {MDXContent ? (
              <MDXContent />
            ) : (
              <>
                <div className="project-section" id="workshop-description">
                  <p className="project-description">{workshop.description}</p>
                </div>

                {workshop.eventDescription && (
                  <div className="project-section" id="workshop-event-description">
                    <h2 className="project-section-title">About the session</h2>
                    <p className="project-section-text">{workshop.eventDescription}</p>
                  </div>
                )}
              </>
            )}
          </div>

          <WorkshopMoreWorkshops workshop={workshop} />
          <ProjectArticleFooter />
        </section>
      </main>
      <ClientScripts />
    </div>
  )
}
