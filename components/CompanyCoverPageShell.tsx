'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function CompanyCoverPageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="home-page home-page--de home-page--de-detail home-page--company-cover">
      <main className="project-de-main company-cover-page">
        <header className="company-cover-page__header" aria-label="Cover">
          <p className="company-cover-page__brand">Vikas Raj Yadav</p>
        </header>
        {children}
      </main>
    </div>
  )
}
