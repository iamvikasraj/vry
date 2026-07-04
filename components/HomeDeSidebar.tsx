'use client'

import Link from 'next/link'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { PORTFOLIO_PROFILE } from '@/data/portfolioProfile'
import { DE_ROUTES } from '@/lib/deRoutes'
import type { DeNavId } from '@/lib/deNav'
import { getActiveDeNavId } from '@/lib/deNav'
import {
  DE_SECTION_HREF,
  getDeScrollRoot,
  isDePortfolioSectionId,
  scrollToDeSection,
} from '@/lib/deScroll'
import { SOCIAL_LINKS } from '@/lib/socialLinks'

const NAV_LINKS = [
  { sectionId: 'timeline' as const, label: 'Experiences' },
  { sectionId: 'workshops' as const, label: 'Workshop' },
  { sectionId: 'playground' as const, label: 'Interactions' },
  {
    sectionId: 'writing' as const,
    label: 'designengineer.ing',
    shortLabel: 'Design Engineering',
  },
  { sectionId: 'about' as const, label: 'About' },
] as const

type NavLink = (typeof NAV_LINKS)[number]

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
  return path
}

/** Home + section scroll routes that render the full single-page portfolio. */
function isSinglePagePortfolio(pathname: string | null) {
  const path = normalizePath(pathname ?? '')
  return path === '' || path === '/' || path === '/playground' || path === '/workshops'
}

function navHref(sectionId: NavLink['sectionId']) {
  return DE_SECTION_HREF[sectionId]
}

export default function HomeDeSidebar() {
  const pathname = usePathname()
  const onSinglePagePortfolio = isSinglePagePortfolio(pathname)
  const routeNavId = getActiveDeNavId(pathname)
  const [sectionNavId, setSectionNavId] = useState<DeNavId | null>(routeNavId ?? 'timeline')

  useEffect(() => {
    if (!onSinglePagePortfolio) {
      setSectionNavId(routeNavId)
      return
    }

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
          setSectionNavId(top.target.id)
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
  }, [onSinglePagePortfolio, routeNavId, pathname])

  const activeNavId = onSinglePagePortfolio ? sectionNavId : routeNavId

  const onNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: NavLink['sectionId']) => {
      if (!onSinglePagePortfolio) return
      if (!document.getElementById(sectionId)) return
      e.preventDefault()
      scrollToDeSection(sectionId)
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
                href={navHref(sectionId)}
                className={`home-de-sidebar-link${isActive ? ' home-de-sidebar-link--active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => onNavClick(e, sectionId)}
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
                  <span className="home-de-sidebar-link__label home-de-sidebar-link__label--inline">
                    {label}
                  </span>
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
