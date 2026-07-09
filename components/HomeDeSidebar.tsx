'use client'

import Link from 'next/link'
import HomeDeEmailLink from '@/components/HomeDeEmailLink'
import { PORTFOLIO_PROFILE } from '@/data/portfolioProfile'
import { DE_ROUTES } from '@/lib/deRoutes'
import { SOCIAL_LINKS } from '@/lib/socialLinks'

function SocialLinks({ className }: { className?: string }) {
  return (
    <nav
      className={`home-de-sidebar-social${className ? ` ${className}` : ''}`}
      aria-label="Social links"
    >
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
  )
}

export default function HomeDeSidebar() {
  return (
    <aside className="home-de-sidebar" aria-label="Site">
      <div className="home-de-sidebar-topline">
        <Link href={DE_ROUTES.home} className="home-de-sidebar-logo">
          Vikas Raj Yadav
        </Link>
        <nav className="home-de-sidebar-social home-de-sidebar-social--top" aria-label="Let's talk">
          <HomeDeEmailLink
            className="home-de-sidebar-social-link home-de-sidebar-email-link"
            label="Let's talk"
            analyticsLocation="sidebar_top_email"
          />
        </nav>
      </div>
      <div className="home-de-sidebar-intro">
        <p className="home-de-sidebar-role home-de-sidebar-hook">{PORTFOLIO_PROFILE.hook}</p>
        <SocialLinks className="home-de-sidebar-social--footer" />
      </div>
    </aside>
  )
}
