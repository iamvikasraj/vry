'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { projects, type Project } from '@/data/projects'
import PortfolioChat from '@/components/PortfolioChat'

const TAGS = ['All', 'Rive', 'SwiftUI', 'Play', 'Live Projects']

function ProjectThumbCard({ project, featured }: { project: Project; featured?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)

  const onEnter = () => {
    videoRef.current?.play()
    setHovered(true)
  }
  const onLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setHovered(false)
  }

  return (
    <article className={`home-de-thumb-wrap${featured ? ' home-de-thumb-wrap--featured' : ''}`}>
      <Link
        href={`/projects/${project.slug}`}
        className={`home-de-thumb${hovered ? ' home-de-thumb--hover' : ''}`}
        aria-label={project.title}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div className="home-de-thumb-media">
          <video
            ref={videoRef}
            className="home-de-thumb-video"
            src={project.video}
            muted
            playsInline
            loop
            preload="metadata"
          />
        </div>
        <div className="home-de-thumb-overlay">
          <span className="home-de-thumb-title">{project.title}</span>
          <div className="home-de-thumb-tags">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="home-de-thumb-tag">{tag}</span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}

export default function HomePage() {
  const [activeTag, setActiveTag] = useState('All')
  const [showChat, setShowChat] = useState(false)

  const filtered = useMemo(
    () => (activeTag === 'All' ? projects : projects.filter(p => p.tags.includes(activeTag))),
    [activeTag],
  )

  return (
    <div className="home-page home-page--de">
      <main className="home-de-main">
        <aside className="home-de-sidebar" aria-label="Site">
          <Link href="/" className="home-de-sidebar-logo">
            Vikas Raj Yadav
          </Link>
          <p className="home-de-sidebar-role">
            Staff Designer × Technologist @ Loop Health
          </p>
          <p className="home-de-sidebar-pov">
            I care about motion that serves function, not decoration. 10 years in FinTech. Rive &amp; Play Ambassador.
          </p>
          <nav className="home-de-sidebar-nav" aria-label="Filter work by tag">
            {TAGS.map(tag => (
              <button
                key={tag}
                type="button"
                className={`home-de-sidebar-link${activeTag === tag ? ' home-de-sidebar-link--active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag.toUpperCase()}
              </button>
            ))}
          </nav>
        </aside>

        <div className="home-de-main-content">
          <section id="work" className="home-de-work home-de-work--only">
            <div className="home-de-card-grid">
              {filtered.map(p => (
                <ProjectThumbCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        </div>

        <div className={`home-de-chat-panel${showChat ? ' home-de-chat-panel--open' : ''}`}>
          <div className="home-de-chat-panel-inner">
            <div className="home-de-chat-panel-header">
              <span className="home-de-chat-panel-title">
                <svg width="11" height="10" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M0.75 0.75H11.75V8.75H9L6.25 10.75L3.5 8.75H0.75V0.75Z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="3.75" cy="4.75" r="1" fill="currentColor"/>
                  <circle cx="8.75" cy="4.75" r="1" fill="currentColor"/>
                </svg>
                ASK TI
              </span>
              <button
                type="button"
                className="home-de-chat-panel-close"
                onClick={() => setShowChat(false)}
              >
                Close
              </button>
            </div>
            <div className="home-de-chat-panel-body">
              <PortfolioChat />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
