'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import FeaturedProjectCard from '@/components/FeaturedProjectCard'
import {
  featuredCompanies,
  getDefaultFeaturedCompany,
  getFeaturedCompanyBySlug,
} from '@/data/featuredCompanies'

export default function DeTimelinePreview() {
  const searchParams = useSearchParams()
  const filterCompany = searchParams.get('company')?.trim() || undefined
  const activeCompany =
    (filterCompany ? getFeaturedCompanyBySlug(filterCompany) : undefined) ??
    getDefaultFeaturedCompany()

  return (
    <div className="home-de-timeline-preview">
      <div className="home-de-timeline-preview__companies" aria-label="Filter by company">
        {featuredCompanies.map((company) => (
          <Link
            key={company.slug}
            href={company.slug === activeCompany.slug ? '/' : `/?company=${company.slug}`}
            scroll={false}
            className={`home-de-timeline-preview__company${company.slug === activeCompany.slug ? '' : ' home-de-timeline-preview__company--muted'}`}
            aria-current={company.slug === activeCompany.slug ? 'true' : undefined}
          >
            {company.name}
          </Link>
        ))}
      </div>

      <div className="home-de-project-list home-de-project-list--cards home-de-timeline-featured">
        {activeCompany.projects.map((project) => (
          <FeaturedProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <p className="home-de-timeline-preview__summary">{activeCompany.summary}</p>
    </div>
  )
}
