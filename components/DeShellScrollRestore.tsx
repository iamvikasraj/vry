'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Resets scroll when entering the sidebar shell (e.g. from project detail). */
export default function DeShellScrollRestore() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
    const main = document.querySelector<HTMLElement>('.home-de-main-content')
    main?.scrollTo(0, 0)
  }, [pathname])

  return null
}
