'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getActiveDeNavId } from '@/lib/deNav'
import { SOCIAL_LINKS } from '@/lib/socialLinks'

const NAV_LINKS = [
  { href: '/live-projects', label: 'Live Projects', id: 'live-projects' as const },
  { href: '/playground', label: 'Playground', id: 'playground' as const },
] as const

export default function ProjectSiteHeader() {
  const pathname = usePathname()
  const activeNavId = getActiveDeNavId(pathname)

  return (
    <header className="project-site-header" aria-label="Site">
      <div className="project-site-header__start">
        <Link href="/" className="project-site-header__name">
          Vikas Raj Yadav
        </Link>
        <nav className="project-site-header__nav" aria-label="Primary">
          {NAV_LINKS.map(({ href, label, id }) => {
            const isActive = activeNavId === id
            return (
              <Link
                key={href}
                href={href}
                className={`project-site-header__nav-link${isActive ? ' project-site-header__nav-link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
      <nav className="project-site-header__social" aria-label="Social links">
        {SOCIAL_LINKS.map(({ href, label, icon }) => (
          <a
            key={href}
            href={href}
            className="project-site-header__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <i className={icon} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </header>
  )
}
