'use client'

import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import { projects, type Project } from '@/data/projects'

const TAGS = ['All', 'Rive', 'SwiftUI', 'Play', 'Live Projects']

function ProjectThumbCard({ project }: { project: Project }) {
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
    <article className="home-de-thumb-wrap">
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
      </Link>
    </article>
  )
}

/**
 * Design-engineering shell + vry videos: keep the layout, but the grid uses `projects` from this repo.
 */
export default function HomePage() {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = useMemo(
    () => (activeTag === 'All' ? projects : projects.filter(p => p.tags.includes(activeTag))),
    [activeTag],
  )

  const visibleProjects = filtered

  return (
    <div className="home-page home-page--de">
      <main className="home-de-main">
        <aside className="home-de-sidebar" aria-label="Site">
          <Link href="/" className="home-de-sidebar-logo">
            Vikas Raj Yadav
          </Link>
          <div className="home-de-sidebar-quote">
            <p className="home-de-sidebar-quote-text">
              Staff Designer × Technologist @ Loop Health. 10 years in FinTech. Rive & Play Ambassador.
            </p>
          </div>
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
              {visibleProjects.map(p => (
                <ProjectThumbCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
