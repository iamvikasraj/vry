'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { PORTFOLIO_PROFILE } from '@/data/portfolioProfile'
import { DE_ROUTES } from '@/lib/deRoutes'
import type { DeNavId } from '@/lib/deNav'
import { getActiveDeNavId } from '@/lib/deNav'
import type { DePortfolioSectionId } from '@/lib/deScroll'
import { DE_SECTION_HREF, getDeScrollRoot, isDePortfolioSectionId, scrollToDeSection } from '@/lib/deScroll'
import { SOCIAL_LINKS } from '@/lib/socialLinks'

const NAV_LINKS = [
  { sectionId: 'timeline' as const, label: 'Experiences' },
  { sectionId: 'playground' as const, label: 'Interactions' },
  { sectionId: 'workshops' as const, label: 'Workshop' },
  {
    sectionId: 'writing' as const,
    label: 'designengineer.ing',
    shortLabel: 'Writing',
  },
  { sectionId: 'about' as const, label: 'About' },
] as const

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
  return path
}

/** Home + section scroll routes that render the full single-page portfolio. */
function isSinglePagePortfolio(pathname: string | null) {
  const path = normalizePath(pathname ?? '')
  return path === '' || path === '/' || path === '/playground' || path === '/workshops'
}

export default function HomeDeSidebar() {
  const pathname = usePathname()
  const onSinglePagePortfolio = isSinglePagePortfolio(pathname)
  const routeNavId = getActiveDeNavId(pathname)
  const [scrollNavId, setScrollNavId] = useState<DeNavId | null>(routeNavId)

  useEffect(() => {
    if (!onSinglePagePortfolio) {
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
  }, [onSinglePagePortfolio, routeNavId, pathname])

  useEffect(() => {
    if (!onSinglePagePortfolio) return

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
  }, [onSinglePagePortfolio, pathname])

  const activeNavId = onSinglePagePortfolio ? scrollNavId ?? routeNavId : routeNavId

  const sectionHref = (sectionId: DePortfolioSectionId) => DE_SECTION_HREF[sectionId]

  const onSectionClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: DePortfolioSectionId) => {
      if (!onSinglePagePortfolio) return
      if (!document.getElementById(sectionId)) return
      e.preventDefault()
      scrollToDeSection(sectionId)
      setScrollNavId(sectionId)
    },
    [onSinglePagePortfolio]
  )

  return (
    <aside className="home-de-sidebar" aria-label="Site">
      <Link href={DE_ROUTES.home} className="home-de-sidebar-logo">
        Vikas Raj Yadav
      </Link>
      <p className="home-de-sidebar-role">
        <span className="home-de-sidebar-role__desktop">{PORTFOLIO_PROFILE.bio}</span>
        <span className="home-de-sidebar-role__mobile">
          {PORTFOLIO_PROFILE.bioLines.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))}
        </span>
      </p>

      <div className="home-de-sidebar-footer">
        <nav className="home-de-sidebar-nav" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const { sectionId, label } = link
            const shortLabel = 'shortLabel' in link ? link.shortLabel : undefined
            const isActive = activeNavId === sectionId
            return (
              <Link
                key={sectionId}
                href={sectionHref(sectionId)}
                className={`home-de-sidebar-link${isActive ? ' home-de-sidebar-link--active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => onSectionClick(e, sectionId)}
              >
                {shortLabel ? (
                  <>
                    <span className="home-de-sidebar-link__label home-de-sidebar-link__label--long">
                      {label}
                    </span>
                    <span className="home-de-sidebar-link__label home-de-sidebar-link__label--short">
                      {shortLabel}
                    </span>
                  </>
                ) : (
                  <span>{label}</span>
                )}
              </Link>
            )
          })}
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
