'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ProjectSiteHeader from '@/components/ProjectSiteHeader'
import ProjectArticleFooter from '@/components/ProjectArticleFooter'

export default function EmployerChapterPageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="home-page home-page--de home-page--de-detail">
      <main className="project-de-main">
        <ProjectSiteHeader />
        {children}
        <ProjectArticleFooter />
      </main>
    </div>
  )
}
