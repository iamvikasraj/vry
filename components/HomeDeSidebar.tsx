'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { getLiveEmployerCards } from '@/data/employerCards'
import { getPlaygroundProjects } from '@/data/projects'
import { DE_ROUTES } from '@/lib/deRoutes'
import type { DeNavId } from '@/lib/deNav'
import { getActiveDeNavId } from '@/lib/deNav'
import type { DePortfolioSectionId } from '@/lib/deScroll'
import { DE_SECTION_HREF, getDeScrollRoot, isDePortfolioSectionId, scrollToDeSection } from '@/lib/deScroll'
import { SOCIAL_LINKS } from '@/lib/socialLinks'

const NAV_LINKS = [
  { sectionId: 'live-projects' as const, label: 'Live Projects', count: getLiveEmployerCards().length },
  { sectionId: 'playground' as const, label: 'Playground', count: getPlaygroundProjects().length },
  { sectionId: 'workshops' as const, label: 'Workshops' },
] as const

const EXTERNAL_LINK = {
  href: 'https://designengineer.ing',
  label: 'Design Engineer.ing',
}

function isPortfolioPage(pathname: string | null) {
  const path = pathname ?? ''
  return (
    path === '/' ||
    path === '/live-projects' ||
    path === '/live-projects/' ||
    path === '/playground' ||
    path === '/playground/' ||
    path === '/workshops' ||
    path === '/workshops/'
  )
}

export default function HomeDeSidebar() {
  const pathname = usePathname()
  const onPortfolioPage = isPortfolioPage(pathname)
  const routeNavId = getActiveDeNavId(pathname)
  const [scrollNavId, setScrollNavId] = useState<DeNavId | null>(routeNavId)

  useEffect(() => {
    if (!onPortfolioPage) {
      setScrollNavId(routeNavId)
      return
    }

    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '')
      if (isDePortfolioSectionId(hash)) setScrollNavId(hash)
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [onPortfolioPage, routeNavId, pathname])

  useEffect(() => {
    if (!onPortfolioPage) return

    const sections = NAV_LINKS.map(({ sectionId }) => document.getElementById(sectionId)).filter(
      Boolean
    ) as HTMLElement[]

    if (sections.length === 0) return

    const root = getDeScrollRoot()

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const top = visible[0]
        if (top?.target.id && isDePortfolioSectionId(top.target.id)) {
          setScrollNavId(top.target.id)
        }
      },
      {
        root,
        threshold: [0, 0.2, 0.4, 0.6],
        rootMargin: '-10% 0px -55% 0px',
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [onPortfolioPage, pathname])

  const activeNavId = onPortfolioPage ? scrollNavId ?? routeNavId : routeNavId

  const onSectionClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: DePortfolioSectionId) => {
      if (!onPortfolioPage) return
      e.preventDefault()
      scrollToDeSection(sectionId)
      setScrollNavId(sectionId)
    },
    [onPortfolioPage]
  )

  return (
    <aside className="home-de-sidebar" aria-label="Site">
      <Link href={DE_ROUTES.home} className="home-de-sidebar-logo">
        Vikas Raj Yadav
      </Link>
      <p className="home-de-sidebar-role">
        Staff Product Designer · Design Engineer · Rive Ambassador · 10+ years in product · Prev. Paytm, HDFC, Loop, Grappus Studios
      </p>

      <div className="home-de-sidebar-footer">
        <nav className="home-de-sidebar-nav" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const { sectionId, label } = link
            const count = 'count' in link ? link.count : undefined
            const isActive = activeNavId === sectionId
            return (
              <Link
                key={sectionId}
                href={DE_SECTION_HREF[sectionId]}
                className={`home-de-sidebar-link${isActive ? ' home-de-sidebar-link--active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => onSectionClick(e, sectionId)}
              >
                <span>{label}</span>
                {count != null ? (
                  <span className="home-de-sidebar-link-count" aria-hidden="true">
                    {count}
                  </span>
                ) : null}
              </Link>
            )
          })}
          <a
            href={EXTERNAL_LINK.href}
            className="home-de-sidebar-link home-de-sidebar-link--external"
            target="_blank"
            rel="noopener noreferrer"
          >
            {EXTERNAL_LINK.label}
          </a>
        </nav>

        <nav className="home-de-sidebar-social" aria-label="Social links">
          {SOCIAL_LINKS.map(({ href, label, icon }) => (
            <a
              key={href}
              href={href}
              className="home-de-sidebar-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <i className={icon} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
