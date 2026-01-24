'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientScripts from '@/components/ClientScripts'
import AboutIntro from '@/components/AboutIntro'
import WorkFilters from '@/components/WorkFilters'
import WorkGrid from '@/components/WorkGrid'
import GridToggle from '@/components/GridToggle'
import { projects } from '@/data/projects'
import '@/lib/analytics' // Initialize analytics global functions

interface Project {
  video?: string
  image?: string
  title: string
  link: string
  description: string
  tags: string[]
}

export default function Home() {
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
  }, [activeFilter])

  return (
    <div className="page-container">
      <Header />

      {/* About Intro */}
      <AboutIntro />

      {/* Work Filters with Grid Toggle */}
      <div className="work-controls">
        <WorkFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <GridToggle gridSize={gridSize} onToggle={setGridSize} />
      </div>

      {/* Work Grid */}
      <WorkGrid projects={filteredProjects} gridSize={gridSize} />

      <Footer />
      <ClientScripts />
    </div>
  )
}
