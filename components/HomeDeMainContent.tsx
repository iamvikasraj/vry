'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { getPinnedPortfolioSection, subscribeDeScroll } from '@/lib/deScroll'

function isSinglePagePortfolio(pathname: string | null) {
  const path = pathname?.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname ?? ''
  return path === '' || path === '/' || path === '/playground' || path === '/workshops'
}

/** Main scroll column — trims bottom padding on mobile once About is the pinned section. */
export default function HomeDeMainContent({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const onPortfolio = isSinglePagePortfolio(pathname)
  const [atSectionEnd, setAtSectionEnd] = useState(false)

  useEffect(() => {
    if (!onPortfolio) {
      setAtSectionEnd(false)
      return
    }

    return subscribeDeScroll(() => {
      setAtSectionEnd(getPinnedPortfolioSection() === 'about')
    })
  }, [onPortfolio, pathname])

  return (
    <div
      className={`home-de-main-content${atSectionEnd ? ' home-de-main-content--at-section-end' : ''}`}
    >
      {children}
    </div>
  )
}
