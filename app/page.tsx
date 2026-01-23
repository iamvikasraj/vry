'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientScripts from '@/components/ClientScripts'
import AboutIntro from '@/components/AboutIntro'
import WorkFilters from '@/components/WorkFilters'
import WorkGrid from '@/components/WorkGrid'
import GridToggle from '@/components/GridToggle'

interface Project {
  video?: string
  image?: string
  title: string
  link: string
  description: string
  tags: string[]
}

export default function Home() {
  const [gridSize, setGridSize] = useState<'2x2' | '4x4'>('2x2')
  const [activeFilter, setActiveFilter] = useState<string>('All')

  // Using videos 1-10 in order
  const allProjects: Project[] = [
    {
      video: '/assets/video/1.mp4',
      title: 'ET Money App Onboarding',
      link: '/projects/etmoney',
      description: 'A shareable celebration, fully created in Rive.',
      tags: ['Live Projects', 'Rive'],
    },
    {
      video: '/assets/video/2.mp4',
      title: 'HDFC Bank Digital Banking',
      link: '/projects/hdfc',
      description: 'A new look and feel for one of banking\'s most trusted platforms.',
      tags: ['Live Projects'],
    },
    {
      video: '/assets/video/3.mp4',
      title: 'Rive Animation Tutorials',
      link: '/projects/rive-tutorial',
      description: 'Exploring Rive animation capabilities for product designers.',
      tags: ['Rive'],
    },
    {
      video: '/assets/video/4.mp4',
      title: 'Motion Design Experiments',
      link: '/projects/motion-experiments',
      description: 'Exploring the boundaries of motion design and micro-interactions.',
      tags: ['Rive'],
    },
    {
      video: '/assets/video/5.mp4',
      title: 'HDFC Onboarding Experience',
      link: '/projects/hdfc-onboarding',
      description: 'A streamlined onboarding flow that improved conversion rates.',
      tags: ['Live Projects'],
    },
    {
      video: '/assets/video/6.mp4',
      title: 'Design System Framework',
      link: '/projects/design-system',
      description: 'A comprehensive design system for scalable product development.',
      tags: ['Live Projects'],
    },
    {
      video: '/assets/video/7.mp4',
      title: 'Payment Gateway Redesign',
      link: '/projects/payment-gateway',
      description: 'Innovative design solutions for modern payment experiences.',
      tags: ['Live Projects'],
    },
    {
      video: '/assets/video/8.mp4',
      title: 'Micro-interactions Library',
      link: '/projects/micro-interactions',
      description: 'Pushing boundaries in user experience design.',
      tags: ['Rive'],
    },
    {
      video: '/assets/video/9.mp4',
      title: 'Banking App UI Kit',
      link: '/projects/banking-ui-kit',
      description: 'Creating memorable digital experiences.',
      tags: ['Live Projects'],
    },
    {
      video: '/assets/video/10.mp4',
      title: 'Animation Principles Guide',
      link: '/projects/animation-guide',
      description: 'Design that makes a difference.',
      tags: ['Rive'],
    },
  ]

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return allProjects
    }
    return allProjects.filter((project) =>
      project.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase())
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
