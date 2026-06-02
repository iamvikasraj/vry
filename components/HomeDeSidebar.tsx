'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLiveProjects, getPlaygroundProjects, getProjectBySlug } from '@/data/projects'

const NAV_LINKS = [
  { href: '/live-projects', label: 'Live Projects', id: 'live-projects' as const, count: getLiveProjects().length },
  { href: '/playground', label: 'Playground', id: 'playground' as const, count: getPlaygroundProjects().length },
] as const

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
  return path
}

function getActiveNavId(pathname: string | null): 'live-projects' | 'playground' | null {
  const path = normalizePath(pathname ?? '')

  if (path === '/' || path === '/live-projects') return 'live-projects'
  if (path === '/playground') return 'playground'

  if (path.startsWith('/projects/')) {
    const slug = path.slice('/projects/'.length)
    const project = getProjectBySlug(slug)
    if (!project) return null
    if (project.category === 'Design Engineering') return 'playground'
    if (project.tags.includes('Live Projects')) return 'live-projects'
  }

  return null
}

const EXTERNAL_LINK = {
  href: 'https://designengineer.ing',
  label: 'Design Engineer.ing',
}

const SOCIAL_LINKS = [
  { href: 'https://x.com/vryworks', label: 'X', icon: 'fa-brands fa-x-twitter' },
  { href: 'https://linkedin.com/in/vraj247', label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in' },
  { href: 'https://dribbble.com/Vraj247', label: 'Dribbble', icon: 'fa-brands fa-dribbble' },
  { href: 'https://github.com/vraj247', label: 'GitHub', icon: 'fa-brands fa-github' },
]

export default function HomeDeSidebar() {
  const pathname = usePathname()
  const activeNavId = getActiveNavId(pathname)

  return (
    <aside className="home-de-sidebar" aria-label="Site">
      <Link href="/live-projects" className="home-de-sidebar-logo">
        Vikas Raj Yadav
      </Link>
      <p className="home-de-sidebar-role">
        Staff Designer × Technologist @ Loop Health. 10+ years in fintech. Previously Paytm, HDFC &amp; ET Money. Rive &amp; Play Ambassador.
      </p>

      <div className="home-de-sidebar-footer">
        <nav className="home-de-sidebar-nav" aria-label="Primary">
          {NAV_LINKS.map(({ href, label, id, count }) => {
            const isActive = activeNavId === id
            return (
              <Link
                key={href}
                href={href}
                className={`home-de-sidebar-link${isActive ? ' home-de-sidebar-link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{label}</span>
                <span className="home-de-sidebar-link-count" aria-hidden="true">{count}</span>
              </Link>
            )
          })}
          <a
            href={EXTERNAL_LINK.href}
            className="home-de-sidebar-link home-de-sidebar-link--external"
            target="_blank"
            rel="noopener noreferrer"
          >
            {EXTERNAL_LINK.label}
          </a>
        </nav>

        <nav className="home-de-sidebar-social" aria-label="Social links">
          {SOCIAL_LINKS.map(({ href, label, icon }) => (
            <a
              key={href}
              href={href}
              className="home-de-sidebar-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <i className={icon} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
