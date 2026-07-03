'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { isDePortfolioSectionId, scrollToDeSectionFromHash } from '@/lib/deScroll'

function isPortfolioShellPath(pathname: string) {
  const path = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
  return path === '' || path === '/' || path === '/playground' || path === '/workshops'
}

/** Resets scroll when entering the sidebar shell; honors `#playground` / `#workshops` on home. */
export default function DeShellScrollRestore() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')

    if (isPortfolioShellPath(pathname) && isDePortfolioSectionId(hash)) {
      const t = window.setTimeout(() => scrollToDeSectionFromHash('auto'), 0)
      return () => window.clearTimeout(t)
    }

    window.scrollTo(0, 0)
    const main = document.querySelector<HTMLElement>('.home-de-main-content')
    main?.scrollTo(0, 0)
  }, [pathname])

  return null
}
