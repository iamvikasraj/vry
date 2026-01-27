'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientScripts from '@/components/ClientScripts'
import HeroSection from '@/components/HeroSection'
import RecognitionBadges from '@/components/RecognitionBadges'
import HomeWorkshops from '@/components/HomeWorkshops'
import LetsWorkTogether from '@/components/LetsWorkTogether'
import ProcessOverview from '@/components/ProcessOverview'
import SectionHeader from '@/components/SectionHeader'
import WorkGrid from '@/components/WorkGrid'
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
  // Get first 4 projects as featured
  const featuredProjects: Project[] = projects.slice(0, 4).map(project => ({
    video: project.video,
    title: project.title,
    link: `/projects/${project.slug}`,
    description: project.description,
    tags: project.tags,
  }))

  return (
    <div className="page-container">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Projects */}
      <section className="featured-section">
        <SectionHeader
          title="Featured"
          linkHref="/work"
          linkLabel="View all work"
          className="featured-header"
        />
        <WorkGrid projects={featuredProjects} gridSize="2x2" />
      </section>

      {/* Process Overview */}
      <ProcessOverview />

      {/* Recognition Badges */}
      <RecognitionBadges />

      {/* Workshops Section */}
      <HomeWorkshops />

      {/* Let's Work Together Section */}
      <LetsWorkTogether />

      <Footer />
      <ClientScripts />
    </div>
  )
}
