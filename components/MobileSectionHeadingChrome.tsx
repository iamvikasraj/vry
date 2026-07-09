'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  DE_SECTION_HREF,
  getPinnedPortfolioSection,
  getPortfolioSectionIndex,
  PORTFOLIO_SECTION_NAV,
  scrollToDeSection,
  subscribeDeScroll,
  type DePortfolioSectionId,
} from '@/lib/deScroll'

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
  return path
}

function isSinglePagePortfolio(pathname: string | null) {
  const path = normalizePath(pathname ?? '')
  return path === '' || path === '/' || path === '/playground' || path === '/workshops'
}

function SectionAnchor({
  id,
  label,
  pinned,
}: {
  id: DePortfolioSectionId
  label: string
  pinned: boolean
}) {
  return (
    <Link
      href={DE_SECTION_HREF[id]}
      className="home-de-section-chrome__title"
      aria-current={pinned ? 'true' : undefined}
      onClick={(e) => {
        if (!document.getElementById(id)) return
        e.preventDefault()
        scrollToDeSection(id)
      }}
    >
      <span className="home-de-section-chrome__title-inner">{label}</span>
    </Link>
  )
}

export default function MobileSectionHeadingChrome() {
  const pathname = usePathname()
  const onSinglePagePortfolio = isSinglePagePortfolio(pathname)
  const [pinnedId, setPinnedId] = useState<DePortfolioSectionId | null>(null)

  useEffect(() => {
    if (!onSinglePagePortfolio) {
      setPinnedId(null)
      return
    }

    return subscribeDeScroll(() => {
      setPinnedId(getPinnedPortfolioSection())
    })
  }, [onSinglePagePortfolio, pathname])

  if (!onSinglePagePortfolio) return null

  const pinnedIndex = getPortfolioSectionIndex(pinnedId)
  const sections = PORTFOLIO_SECTION_NAV.map((section, index) => ({ ...section, index }))
  const topSections = sections.slice(0, pinnedIndex + 1).reverse()
  const bottomSections = sections.slice(Math.max(pinnedIndex + 1, 1))

  const topVisible = pinnedIndex >= 0
  const bottomVisible = pinnedIndex >= 0 && bottomSections.length > 0

  return (
    <>
      <nav
        className={`home-de-section-chrome home-de-section-chrome--top${topVisible ? ' home-de-section-chrome--visible' : ''}`}
        aria-hidden={!topVisible}
        aria-label="Sections above"
      >
        <div className="home-de-section-chrome__label">
          {topSections.map(({ id, label, index }) => (
            <SectionAnchor key={id} id={id} label={label} pinned={index === pinnedIndex} />
          ))}
        </div>
      </nav>
      <nav
        className={`home-de-section-chrome home-de-section-chrome--bottom${bottomVisible ? ' home-de-section-chrome--visible' : ''}`}
        aria-hidden={!bottomVisible}
        aria-label="Upcoming sections"
      >
        <div className="home-de-section-chrome__label">
          {bottomSections.map(({ id, label, index }) => (
            <SectionAnchor key={id} id={id} label={label} pinned={index === pinnedIndex} />
          ))}
        </div>
      </nav>
    </>
  )
}
