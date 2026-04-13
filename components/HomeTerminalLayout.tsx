'use client'

import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'
import { projects, type Project } from '@/data/projects'
import { workshops } from '@/data/workshops'
import { workEmployers } from '@/data/workEmployers'
import PortfolioFolderIcon from '@/components/PortfolioFolderIcon'
import type { GitHubContributionsPayload } from '@/lib/githubContributions'
import { useTerminalUiSound } from '@/hooks/useTerminalUiSound'

const HOME_TERMINAL_ROUTES = [
  { href: '/work/', label: 'projects', counts: 'projects' as const },
  { href: '/work/#work-companies', label: 'companies', counts: 'companies' as const },
  { href: '/workshops/', label: 'workshops', counts: 'workshops' as const },
] as const

function IdleCursor() {
  return (
    <div className="home-terminal-idle-assistant">
      <p className="home-terminal-sr-only">
        Ti, Vikas&apos;s assistant. For questions or hiring, use the contact page.
      </p>
      <div className="home-terminal-idle-assistant-card">
        <div className="home-terminal-idle-assistant-content" aria-label="About Ti">
          <p className="home-terminal-idle-assistant-blurb home-terminal-dim">
            I&apos;m <span className="ti-name">ti</span> — I can walk through Vikas&apos;s work, projects, and how he tends to
            operate day to day.
          </p>
          <p className="home-terminal-idle-assistant-blurb home-terminal-idle-assistant-blurb--follow home-terminal-dim">
            If you&apos;re hiring, reach out via the contact page—I&apos;ll help you get a useful first-round picture from what&apos;s
            on this site.
          </p>
        </div>
      </div>
    </div>
  )
}

const LS_PAGE_SIZE = 5

function projectCatalogSubtitle(p: Project): string {
  const d = p.description?.trim()
  if (d) return d.length > 152 ? `${d.slice(0, 149)}…` : d
  const bits = [p.client, p.role].filter(Boolean) as string[]
  if (bits.length > 0) return bits.join(' · ')
  return p.tags.slice(0, 5).join(' · ')
}

/** Off until explicitly enabled (set `NEXT_PUBLIC_HOME_TERMINAL_SHOW_COMPANIES=true` when building). */
const showHomeTerminalCompanies =
  process.env.NEXT_PUBLIC_HOME_TERMINAL_SHOW_COMPANIES === 'true'

/** Off until explicitly enabled (set `NEXT_PUBLIC_HOME_TERMINAL_SHOW_PROJECT_INDEX=true` when building). */
const showHomeTerminalProjectIndex =
  process.env.NEXT_PUBLIC_HOME_TERMINAL_SHOW_PROJECT_INDEX === 'true'

export default function HomeTerminalLayout({
  githubContributions = null,
}: {
  githubContributions?: GitHubContributionsPayload | null
}) {
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [catalogPage, setCatalogPage] = useState(0)
  const sound = useTerminalUiSound()

  useEffect(() => {
    const unlock = () => {
      void sound.primeAudio()
    }
    window.addEventListener('pointerdown', unlock, { once: true })
    return () => window.removeEventListener('pointerdown', unlock)
  }, [sound])

  const sorted = [...projects].sort((a, b) => {
    const ya = parseInt(a.year ?? '0', 10) || 0
    const yb = parseInt(b.year ?? '0', 10) || 0
    return yb - ya
  })

  const yearHeadingId = (y: string, page: number) =>
    y === '—'
      ? `home-terminal-ls-year-unknown-p${page}`
      : `home-terminal-ls-year-${y.replace(/\W/g, '')}-p${page}`

  const yearLabel = (y: string) => (y === '—' ? 'Year unknown' : y)

  const pageCount = Math.max(1, Math.ceil(sorted.length / LS_PAGE_SIZE))

  useEffect(() => {
    setCatalogPage((p) => Math.min(p, Math.max(0, pageCount - 1)))
  }, [pageCount])

  const pageItems = sorted.slice(
    catalogPage * LS_PAGE_SIZE,
    catalogPage * LS_PAGE_SIZE + LS_PAGE_SIZE
  )

  const yearsOnPage: string[] = []
  const yearSeen = new Set<string>()
  for (const p of pageItems) {
    const y = p.year ?? '—'
    if (!yearSeen.has(y)) {
      yearSeen.add(y)
      yearsOnPage.push(y)
    }
  }

  const projectsOnPageByYear = pageItems.reduce<Record<string, typeof sorted>>((acc, p) => {
    const y = p.year ?? '—'
    if (!acc[y]) acc[y] = []
    acc[y].push(p)
    return acc
  }, {})

  return (
    <div className="home-terminal">
      <div className="home-terminal-shell">
        <div className="home-terminal-body">
          <div className="home-terminal-split">
            <div className="home-terminal-split-layout home-terminal-bento">
              <div className="home-terminal-split-main">
                <div className="home-terminal-bento-tile home-terminal-bento-tile--main">
                  <section className="home-terminal-block home-terminal-welcome" aria-labelledby="home-terminal-hello">
                  <div className="home-terminal-welcome-lead">
                    <p className="home-terminal-greeting" id="home-terminal-hello">
                      hello internet!
                    </p>
                  </div>
                  <div className="home-terminal-intro home-terminal-intro--compact">
                    <p className="home-terminal-intro-title">
                      My name is <strong>Vikas Raj Yadav</strong>. I&apos;m a staff product designer and technologist at{' '}
                      <strong>Loop Health</strong> <span className="home-terminal-dim">(YC 20)</span>, and I&apos;m{' '}
                      <span className="home-terminal-dim">based in Bengaluru</span>.
                      <br />
                      I&apos;ve spent <span className="home-terminal-dim">10+ years in product</span>, mostly in{' '}
                      <span className="home-terminal-dim">fintech and regulated spaces</span>
                      {' — '}think <strong>ETMoney</strong>, <strong>HDFC Bank</strong>, and <strong>Paytm</strong>.
                      <br />
                      I care about{' '}
                      <span className="home-terminal-dim">
                        motion, interaction craft, prototyping (including SwiftUI), and design systems
                      </span>
                      —not as buzzwords, but as the work I actually ship.
                      <br />
                      I&apos;m also a <span className="home-terminal-dim">Rive and Play ambassador</span> in India.
                    </p>
                  </div>
                  <nav className="home-terminal-routes" aria-label="Site pages">
                    <div className="home-terminal-routes-list">
                      {HOME_TERMINAL_ROUTES.map((route) => {
                        const pc = projects.length
                        const cc = workEmployers.length
                        const wc = workshops.length
                        const projectNoun = pc === 1 ? 'project' : 'projects'
                        const companyNoun = cc === 1 ? 'company' : 'companies'
                        const workshopNoun = wc === 1 ? 'workshop' : 'workshops'

                        let meta: string | null = null
                        let ariaMeta = ''
                        if (route.counts === 'projects') {
                          meta = `${pc} ${projectNoun}`
                          ariaMeta = `, ${pc} ${projectNoun}`
                        } else if (route.counts === 'companies') {
                          meta = `${cc} ${companyNoun}`
                          ariaMeta = `, ${cc} ${companyNoun}`
                        } else if (route.counts === 'workshops') {
                          meta = `${wc} ${workshopNoun}`
                          ariaMeta = `, ${wc} ${workshopNoun}`
                        }

                        return (
                          <Link
                            key={route.href}
                            href={route.href}
                            className="home-terminal-route-link"
                            aria-label={`${route.label}${ariaMeta}`}
                            onMouseEnter={() => sound.playHover()}
                          >
                            <PortfolioFolderIcon className="home-terminal-route-folder-icon" />
                            <span className="home-terminal-route-stack">
                              <span className="home-terminal-route-label">{route.label}</span>
                              {meta ? (
                                <span className="home-terminal-route-meta home-terminal-dim">{meta}</span>
                              ) : null}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  </nav>
                  </section>

                  {showHomeTerminalCompanies ? (
                  <section
                    className="home-terminal-block home-terminal-companies"
                    aria-labelledby="home-terminal-companies-heading"
                  >
                    <p className="home-terminal-section-lead home-terminal-dim">
                      Companies and teams I’ve been part of. Each line links to the work page if you want more
                      detail.
                    </p>
                    <h2 id="home-terminal-companies-heading" className="home-terminal-h2 home-terminal-h2--plain">
                      Companies I’ve worked with
                    </h2>
                    <ul className="home-terminal-companies-simple">
                      {workEmployers.map((e) => (
                        <li key={e.slug}>
                          <Link
                            href="/work/"
                            className="home-terminal-companies-simple-link"
                            aria-label={`${e.company}, ${e.period} — open work page`}
                            onMouseEnter={() => sound.playHover()}
                          >
                            <span className="home-terminal-companies-simple-name">{e.company}</span>
                            <span className="home-terminal-companies-simple-period">{e.period}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                  ) : null}

                  {showHomeTerminalProjectIndex ? (
                  <section
                    className="home-terminal-block home-terminal-ls-section"
                    aria-labelledby="home-terminal-ls-heading"
                  >
                    <p className="home-terminal-section-lead home-terminal-dim">
                      Case studies and experiments, newest first. Each row opens the project page.
                    </p>
                    <h2 id="home-terminal-ls-heading" className="home-terminal-h2 home-terminal-h2--plain">
                      Project index
                    </h2>
                    <p className="home-terminal-ls-total">total {sorted.length}</p>
                    <p className="home-terminal-ls-catalog-hint home-terminal-dim">
                      {LS_PAGE_SIZE} projects per page when the catalog is open.
                    </p>
                    <button
                      type="button"
                      className="home-terminal-ls-toggle"
                      aria-expanded={catalogOpen}
                      aria-controls="home-terminal-ls-panel"
                      onMouseEnter={() => sound.playHover()}
                      onClick={() => {
                        setCatalogOpen((o) => {
                          if (o) {
                            sound.playClose()
                            setCatalogPage(0)
                          } else {
                            sound.playOpen()
                          }
                          return !o
                        })
                      }}
                    >
                      {catalogOpen ? (
                        <>
                          <span className="home-terminal-dim">$</span> catalog —close
                        </>
                      ) : (
                        <>
                          <span className="home-terminal-dim">$</span> catalog —open{' '}
                          <span className="home-terminal-ls-toggle-meta">
                            ({sorted.length} entries, {pageCount} page{pageCount === 1 ? '' : 's'})
                          </span>
                        </>
                      )}
                    </button>
                    {catalogOpen ? (
                      <nav className="home-terminal-ls-nav" aria-label="Project case studies">
                        <div id="home-terminal-ls-panel" className="home-terminal-ls-panel">
                          <p className="home-terminal-ls-panel-tag" aria-hidden="true">
                            Project catalog
                          </p>
                          <div className="home-terminal-ls-colhead" aria-hidden="true">
                            <span className="home-terminal-ls-colhead-folder">
                              <PortfolioFolderIcon className="home-terminal-ls-colhead-folder-icon" />
                            </span>
                            <span className="home-terminal-ls-colhead-project">project</span>
                          </div>
                          {yearsOnPage.map((year) => (
                            <div key={year} className="home-terminal-ls-year-block">
                              <h3
                                className="home-terminal-ls-year-heading"
                                id={yearHeadingId(year, catalogPage)}
                              >
                                {yearLabel(year)}
                              </h3>
                              <ul
                                className="home-terminal-ls-year-list"
                                aria-labelledby={yearHeadingId(year, catalogPage)}
                              >
                                {projectsOnPageByYear[year].map((p) => (
                                  <li key={p.slug}>
                                    <Link
                                      href={`/projects/${p.slug}/`}
                                      className="home-terminal-ls-row"
                                      title={p.title}
                                      aria-label={`Open ${p.title}${p.year ? `, ${p.year}` : ''}`}
                                      onMouseEnter={() => sound.playHover()}
                                    >
                                      <span className="home-terminal-ls-folder-wrap" aria-hidden="true">
                                        <PortfolioFolderIcon className="home-terminal-ls-folder-icon" />
                                      </span>
                                      <div className="home-terminal-ls-copy">
                                        <span className="home-terminal-ls-proj-title">{p.title}</span>
                                        <span className="home-terminal-ls-proj-sub">
                                          {projectCatalogSubtitle(p)}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <div className="home-terminal-ls-pager" aria-label="Catalog pagination">
                            <button
                              type="button"
                              className="home-terminal-ls-pager-btn"
                              disabled={catalogPage <= 0}
                              onMouseEnter={() => sound.playHover()}
                              onClick={() => {
                                sound.playActivate()
                                setCatalogPage((p) => Math.max(0, p - 1))
                              }}
                            >
                              prev
                            </button>
                            <span className="home-terminal-ls-pager-status" aria-live="polite">
                              page {catalogPage + 1} / {pageCount}
                            </span>
                            <button
                              type="button"
                              className="home-terminal-ls-pager-btn"
                              disabled={catalogPage >= pageCount - 1}
                              onMouseEnter={() => sound.playHover()}
                              onClick={() => {
                                sound.playActivate()
                                setCatalogPage((p) => Math.min(pageCount - 1, p + 1))
                              }}
                            >
                              next
                            </button>
                          </div>
                        </div>
                      </nav>
                    ) : null}
                    <p className="home-terminal-more">
                      <Link
                        href="/work/"
                        className="home-terminal-inline-link"
                        onMouseEnter={() => sound.playHover()}
                      >
                        ./work --all
                      </Link>{' '}
                      <span className="home-terminal-dim"># full archive</span>
                    </p>
                  </section>
                  ) : null}
                </div>
              </div>
              <aside
                className="home-terminal-split-assistant home-terminal-bento-rail"
                aria-label="Ti, Vikas's assistant"
              >
                <div className="home-terminal-assistant-stack">
                  <div className="home-terminal-bento-tile home-terminal-bento-tile--ti">
                    <IdleCursor />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
