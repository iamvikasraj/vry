'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { projects, type Project } from '@/data/projects'
import { workEmployers } from '@/data/workEmployers'
import PortfolioChat from '@/components/PortfolioChat'
import { useTerminalUiSound } from '@/hooks/useTerminalUiSound'

function Prompt({ cwd, cmd }: { cwd: string; cmd: string }) {
  return (
    <p className="home-terminal-prompt">
      <span className="home-terminal-prompt-user">vry</span>
      <span className="home-terminal-prompt-at">@</span>
      <span className="home-terminal-prompt-host">portfolio</span>
      <span className="home-terminal-prompt-path">:{cwd}$</span>{' '}
      <span className="home-terminal-prompt-cmd">{cmd}</span>
    </p>
  )
}

function IdleCursor() {
  return (
    <p className="home-terminal-prompt home-terminal-prompt-idle">
      <span className="home-terminal-prompt-user">vry</span>
      <span className="home-terminal-prompt-at">@</span>
      <span className="home-terminal-prompt-host">portfolio</span>
      <span className="home-terminal-prompt-path">:~$</span>{' '}
      <span className="home-terminal-cursor" aria-hidden>
        █
      </span>
    </p>
  )
}

const LS_PAGE_SIZE = 5

/** Small ASCII folder for catalog rows (fixed width for alignment). */
const PROJECT_FOLDER_ASCII = ` +---+
 |   +----+
 |        |
 +--------+`

function projectCatalogSubtitle(p: Project): string {
  const d = p.description?.trim()
  if (d) return d.length > 152 ? `${d.slice(0, 149)}…` : d
  const bits = [p.client, p.role].filter(Boolean) as string[]
  if (bits.length > 0) return bits.join(' · ')
  return p.tags.slice(0, 5).join(' · ')
}

export default function HomeTerminalLayout() {
  const [overlaysReady, setOverlaysReady] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [catalogPage, setCatalogPage] = useState(0)
  const sound = useTerminalUiSound()

  useEffect(() => {
    setOverlaysReady(true)
  }, [])

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

  const crtOverlays = (
    <div className="home-terminal-overlays" aria-hidden>
      <div className="home-terminal-vignette" />
      <div className="home-terminal-crt" />
      <div className="home-terminal-scanlines" />
    </div>
  )

  return (
    <div className="home-terminal">
      {overlaysReady ? createPortal(crtOverlays, document.body) : null}

      <div className="home-terminal-shell">
        <div className="home-terminal-body">
          <section className="home-terminal-block home-terminal-welcome" aria-labelledby="home-terminal-hello">
            <Prompt cwd="~" cmd="cat ./welcome.txt" />
            <div className="home-terminal-welcome-lead">
              <p className="home-terminal-greeting" id="home-terminal-hello">
                Hello Internet.
              </p>
              <p className="home-terminal-welcome-line">
                Welcome to the portfolio website of <strong>Vikas Raj Yadav</strong>.
              </p>
            </div>
            <div className="home-terminal-intro">
              <p>
                I’m a staff product designer and technologist in Bengaluru, India. I bridge design and
                engineering — motion, systems thinking, and prototypes you can ship. I’m at{' '}
                <strong>Loop Health</strong> (YC 20); before that, teams like <strong>Paytm</strong>,{' '}
                <strong>HDFC Bank</strong>, and <strong>Times Internet</strong>. I care about FinTech,
                healthcare, and products that feel alive; I’m also a <strong>Rive</strong> and{' '}
                <strong>Play</strong> ambassador.
              </p>
            </div>
            <nav className="home-terminal-routes" aria-label="Site pages">
              <span className="home-terminal-dim">#</span>{' '}
              <Link
                href="/work/"
                className="home-terminal-inline-link"
                onMouseEnter={() => sound.playHover()}
              >
                ./work
              </Link>
              <span className="home-terminal-dim"> · </span>
              <Link
                href="/about/"
                className="home-terminal-inline-link"
                onMouseEnter={() => sound.playHover()}
              >
                ./about
              </Link>
              <span className="home-terminal-dim"> · </span>
              <Link
                href="/workshops/"
                className="home-terminal-inline-link"
                onMouseEnter={() => sound.playHover()}
              >
                ./workshops
              </Link>
              <span className="home-terminal-dim"> · </span>
              <Link
                href="/contact/"
                className="home-terminal-inline-link"
                onMouseEnter={() => sound.playHover()}
              >
                ./contact
              </Link>
            </nav>
          </section>

          <section
            className="home-terminal-block home-terminal-companies"
            aria-labelledby="home-terminal-companies-heading"
          >
            <div className="home-terminal-companies-panel">
              <p className="home-terminal-companies-panel-tag" aria-hidden="true">
                Work history
              </p>
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
            </div>
          </section>

          <section
            className="home-terminal-block home-terminal-ls-section"
            aria-labelledby="home-terminal-ls-heading"
          >
            <Prompt cwd="~/work" cmd="ls -l" />
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
                    <span className="home-terminal-ls-colhead-folder">folder</span>
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
                              <pre className="home-terminal-ls-folder-art" aria-hidden="true">
                                {PROJECT_FOLDER_ASCII}
                              </pre>
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

          <section className="home-terminal-block home-terminal-chat" aria-label="Portfolio chat">
            <div className="home-terminal-chat-panel">
              <p className="home-terminal-chat-panel-tag" aria-hidden="true">
                Live chat
              </p>
              <Prompt cwd="~" cmd="./assistant &amp;" />
              <p className="home-terminal-section-lead home-terminal-dim home-terminal-chat-lead">
                <span className="home-terminal-chat-lead-mark">[CHAT]</span>{' '}
                ask anything about this portfolio
              </p>
              <PortfolioChat terminalSound={sound} />
            </div>
          </section>

          <IdleCursor />
        </div>
      </div>
    </div>
  )
}
