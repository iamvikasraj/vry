'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import LocalTime from '@/components/LocalTime'
import { PORTFOLIO_PROFILE } from '@/data/portfolioProfile'
import { DE_ROUTES } from '@/lib/deRoutes'
import { SOCIAL_LINKS } from '@/lib/socialLinks'

function SidebarCompanyLink({ name, href }: { name: string; href: string }) {
  return (
    <a
      href={href}
      className="home-de-sidebar-company-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  )
}

/** Linked previous employers — 'Paytm, HDFC Bank and ET Money'. */
function formatPreviousLinks(companies: readonly { name: string; linkedIn: string }[]) {
  if (companies.length <= 1) {
    const company = companies[0]
    return company ? <SidebarCompanyLink name={company.name} href={company.linkedIn} /> : null
  }

  return companies.map((company, index) => {
    const isLast = index === companies.length - 1
    const isSecondLast = index === companies.length - 2

    return (
      <Fragment key={company.name}>
        <SidebarCompanyLink name={company.name} href={company.linkedIn} />
        {isLast ? null : isSecondLast ? ' and ' : ', '}
      </Fragment>
    )
  })
}

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
        <SocialLinks className="home-de-sidebar-social--top" />
      </div>
      <div className="home-de-sidebar-intro">
        <p className="home-de-sidebar-role home-de-sidebar-hook">{PORTFOLIO_PROFILE.hook}</p>
        <p className="home-de-sidebar-role">
          Currently {PORTFOLIO_PROFILE.role} at{' '}
          <SidebarCompanyLink
            name={PORTFOLIO_PROFILE.company.name}
            href={PORTFOLIO_PROFILE.company.linkedIn}
          />
          , with {PORTFOLIO_PROFILE.experience}, previously{' '}
          {formatPreviousLinks(PORTFOLIO_PROFILE.previous)}, and a {PORTFOLIO_PROFILE.ambassador}.
          Based in {PORTFOLIO_PROFILE.location},{' '}
          <LocalTime
            className="home-de-sidebar-clock"
            timeZone={PORTFOLIO_PROFILE.timeZone}
            label={PORTFOLIO_PROFILE.timeZoneLabel}
          />
          .
        </p>
      </div>

      <div className="home-de-sidebar-footer">
        <SocialLinks className="home-de-sidebar-social--footer" />
      </div>
    </aside>
  )
}
