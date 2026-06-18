'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientScripts from '@/components/ClientScripts'
import WorkFilters from '@/components/WorkFilters'
import WorkGrid from '@/components/WorkGrid'
import GridToggle from '@/components/GridToggle'
import PortfolioFolderIcon from '@/components/PortfolioFolderIcon'
import TimelineItem from '@/components/TimelineItem'
import { projects } from '@/data/projects'
import { workEmployers } from '@/data/workEmployers'

interface Project {
  video?: string
  image?: string
  title: string
  link: string
  description: string
  tags: string[]
}

export default function Work() {
  const [gridSize, setGridSize] = useState<'1x1' | '2x2'>('2x2')
  const [activeFilter, setActiveFilter] = useState<string>('All')

  // Convert projects data to format needed for WorkGrid
  const allProjects: Project[] = projects.map(project => ({
    video: project.video,
    title: project.title,
    link: `/projects/${project.slug}`,
    description: project.description,
    tags: project.tags,
  }))

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return allProjects
    }
    return allProjects.filter((project) =>
      project.tags.some((tag) => 
        tag.trim().toLowerCase() === activeFilter.trim().toLowerCase()
      )
    )
  }, [activeFilter, allProjects])

  return (
    <div className="page-container">
      <Header />

      <section className="work-page">
        <div className="work-content">
          <div className="page-folder-heading">
            <PortfolioFolderIcon />
            <h1 className="work-page-title">Work</h1>
          </div>
          <div className="work-description">
            <p>
              Right now, I'm building at <strong>Loop Health</strong> (YC 20) as a Staff Product Designer and Technologist, working at the intersection of design, engineering and business.
            </p>
            <p>
              Before that, I led design teams at <strong>ETMoney, HDFC Bank, and Paytm</strong>, shaping products used by millions. My work spans FinTech interfaces, scalable design systems, and cross-platform experiences, with particular focus on motion and interaction detail.
            </p>
            <p>
              As a product designer, I get energy from the technical parts of my process like prototyping, motion design, and design systems. At the same time, I believe that designers should be well-rounded and comfortable wearing many hats. I get excited about diving into new industries and think that doing so has helped me bring fresh ideas to my work. I'm currently interested in exploring artificial intelligence, human knowledge, and interaction design. I like working on small, convicted teams that move fast and believe in the importance of craft.
            </p>
          </div>

          {/* Work Filters with Grid Toggle */}
          <div className="work-controls">
            <WorkFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            <GridToggle gridSize={gridSize} onToggle={setGridSize} />
          </div>

          {/* Work Grid */}
          <WorkGrid projects={filteredProjects} gridSize={gridSize} />
        </div>

        {/* Work Timeline */}
        <div className="work-timeline-section" id="work-companies">
          <div className="work-timeline">
            {workEmployers.map((work) => (
              <TimelineItem
                key={work.slug}
                leftContent={<div className="work-company">{work.company}</div>}
                rightContent={<div className="work-period">{work.period}</div>}
                className="work-item-timeline"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ClientScripts />
    </div>
  )
}
