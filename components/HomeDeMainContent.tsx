'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { getPinnedPortfolioSection } from '@/lib/deScroll'

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

    let raf = 0
    const sync = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setAtSectionEnd(getPinnedPortfolioSection() === 'about')
      })
    }

    sync()
    window.addEventListener('scroll', sync, { passive: true })
    document.addEventListener('scroll', sync, { passive: true, capture: true })
    window.addEventListener('resize', sync, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', sync)
      document.removeEventListener('scroll', sync, { capture: true })
      window.removeEventListener('resize', sync)
    }
  }, [onPortfolio, pathname])

  return (
    <div
      className={`home-de-main-content${atSectionEnd ? ' home-de-main-content--at-section-end' : ''}`}
    >
      {children}
    </div>
  )
}
