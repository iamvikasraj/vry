'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getDeListHref } from '@/lib/deNav'
import { SOCIAL_LINKS } from '@/lib/socialLinks'

export default function ProjectSiteHeader() {
  const listHref = getDeListHref(usePathname())

  return (
    <header className="project-site-header" aria-label="Site">
      <Link href={listHref} className="project-site-header__name">
        Vikas Raj Yadav
      </Link>
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
