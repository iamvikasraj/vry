'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'

interface ProjectSectionTrackerProps {
  projectTitle: string
  projectSlug: string
}

export default function ProjectSectionTracker({ projectTitle, projectSlug }: ProjectSectionTrackerProps) {
  useEffect(() => {
    // Track section visibility using Intersection Observer
    const sections = document.querySelectorAll('.project-section')
    const observedSections = new Set<string>()

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionElement = entry.target as HTMLElement
            const sectionTitle = sectionElement.querySelector('.project-section-title')?.textContent || 'Unknown'
            const sectionId = sectionTitle.toLowerCase().replace(/\s+/g, '_')

            // Only track once per section
            if (!observedSections.has(sectionId)) {
              observedSections.add(sectionId)
              analytics.trackProjectSectionClick(projectTitle, projectSlug, sectionTitle)
            }
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 50% of section is visible
        rootMargin: '-50px 0px', // Start tracking slightly before section is fully visible
      }
    )

    sections.forEach((section) => {
      sectionObserver.observe(section)
    })

    // Also track clicks on section titles
    sections.forEach((section) => {
      const title = section.querySelector('.project-section-title')
      if (title) {
        title.addEventListener('click', () => {
          const sectionTitle = title.textContent || 'Unknown'
          analytics.trackProjectSectionClick(projectTitle, projectSlug, sectionTitle)
        })
      }
    })

    return () => {
      sectionObserver.disconnect()
      sections.forEach((section) => {
        const title = section.querySelector('.project-section-title')
        if (title) {
          title.removeEventListener('click', () => {})
        }
      })
    }
  }, [projectTitle, projectSlug])

  return null
}
