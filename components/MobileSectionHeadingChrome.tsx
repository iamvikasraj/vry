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

type ChromeState = {
  pinnedId: DePortfolioSectionId | null
  /** Equal to pinnedId once the migration animation has been retired. */
  previousPinnedId: DePortfolioSectionId | null
}

const INITIAL_STATE: ChromeState = { pinnedId: null, previousPinnedId: null }

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
  transient,
}: {
  id: DePortfolioSectionId
  label: string
  pinned: boolean
  transient: 'enter' | 'exit' | null
}) {
  return (
    <Link
      href={DE_SECTION_HREF[id]}
      className={`home-de-section-chrome__title${transient ? ` home-de-section-chrome__title--${transient}` : ''}`}
      aria-current={pinned ? 'true' : undefined}
      aria-hidden={transient === 'exit' ? 'true' : undefined}
      tabIndex={transient === 'exit' ? -1 : undefined}
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
  const [chrome, setChrome] = useState<ChromeState>(INITIAL_STATE)

  useEffect(() => {
    if (!onSinglePagePortfolio) {
      setChrome(INITIAL_STATE)
      return
    }

    return subscribeDeScroll(() => {
      setChrome((state) => {
        const pinnedId = getPinnedPortfolioSection()
        if (pinnedId === state.pinnedId) return state
        return { pinnedId, previousPinnedId: state.pinnedId }
      })
    })
  }, [onSinglePagePortfolio, pathname])

  useEffect(() => {
    if (chrome.previousPinnedId === chrome.pinnedId) return

    const timeout = window.setTimeout(() => {
      setChrome((state) => ({ ...state, previousPinnedId: state.pinnedId }))
    }, 400)

    return () => window.clearTimeout(timeout)
  }, [chrome])

  if (!onSinglePagePortfolio) return null

  const pinnedIndex = getPortfolioSectionIndex(chrome.pinnedId)
  const previousIndex = getPortfolioSectionIndex(chrome.previousPinnedId)
  const lo = Math.min(pinnedIndex, previousIndex)
  const hi = Math.max(pinnedIndex, previousIndex)

  // Sections in (lo, hi] are mid-migration between the two bars.
  const transientFor = (index: number, bar: 'top' | 'bottom'): 'enter' | 'exit' | null => {
    if (pinnedIndex === previousIndex) return null
    if (index <= lo || index > hi) return null
    if (bar === 'top') return pinnedIndex > previousIndex ? 'enter' : 'exit'
    return pinnedIndex > previousIndex ? 'exit' : 'enter'
  }

  const sections = PORTFOLIO_SECTION_NAV.map((section, index) => ({ ...section, index }))
  const topSections = sections.slice(0, hi + 1).reverse()
  // The first section (Experiences) only ever lives in the top bar — the bottom
  // teaser starts at Workshop and only appears once Experiences has pinned up top.
  const bottomSections = sections.slice(Math.max(lo + 1, 1))

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
            <SectionAnchor
              key={id}
              id={id}
              label={label}
              pinned={index === pinnedIndex}
              transient={transientFor(index, 'top')}
            />
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
            <SectionAnchor
              key={id}
              id={id}
              label={label}
              pinned={false}
              transient={transientFor(index, 'bottom')}
            />
          ))}
        </div>
      </nav>
    </>
  )
}
