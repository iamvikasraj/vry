'use client'

import { useEffect } from 'react'
import type { DePortfolioSectionId } from '@/lib/deScroll'
import { isDePortfolioSectionId, scrollToDeSection, scrollToDeSectionFromHash } from '@/lib/deScroll'

type DeSectionScrollerProps = {
  /** Scroll here on mount (e.g. `/playground/` route). Hash in the URL wins when present. */
  sectionId?: DePortfolioSectionId
}

export default function DeSectionScroller({ sectionId }: DeSectionScrollerProps) {
  useEffect(() => {
    const run = () => {
      const hash = window.location.hash.replace(/^#/, '')
      if (isDePortfolioSectionId(hash)) {
        scrollToDeSection(hash, { behavior: 'auto', updateHash: false })
        return
      }
      if (sectionId) {
        scrollToDeSection(sectionId, { behavior: 'auto', updateHash: true })
      }
    }

    run()
    const t = window.setTimeout(run, 50)
    return () => window.clearTimeout(t)
  }, [sectionId])

  useEffect(() => {
    const onHashChange = () => scrollToDeSectionFromHash('smooth')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return null
}
