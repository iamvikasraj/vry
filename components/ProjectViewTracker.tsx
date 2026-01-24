'use client'

import { useEffect, useRef } from 'react'
import { analytics } from '@/lib/analytics'

interface ProjectViewTrackerProps {
  projectTitle: string
  projectSlug: string
}

export default function ProjectViewTracker({ projectTitle, projectSlug }: ProjectViewTrackerProps) {
  const startTimeRef = useRef<number>(Date.now())
  const hasTrackedRef = useRef(false)

  useEffect(() => {
    // Track page view
    analytics.trackProjectView(projectTitle, projectSlug)
    startTimeRef.current = Date.now()

    // Track time spent when user leaves the page
    const handleBeforeUnload = () => {
      if (!hasTrackedRef.current) {
        const timeSpent = (Date.now() - startTimeRef.current) / 1000 // Convert to seconds
        analytics.trackProjectTimeSpent(projectTitle, projectSlug, timeSpent)
        hasTrackedRef.current = true
      }
    }

    // Track time spent when page becomes hidden (tab switch, minimize, etc.)
    const handleVisibilityChange = () => {
      if (document.hidden && !hasTrackedRef.current) {
        const timeSpent = (Date.now() - startTimeRef.current) / 1000
        analytics.trackProjectTimeSpent(projectTitle, projectSlug, timeSpent)
        hasTrackedRef.current = true
      }
    }

    // Track time spent periodically (every 30 seconds) for long sessions
    const intervalId = setInterval(() => {
      if (!hasTrackedRef.current) {
        const timeSpent = (Date.now() - startTimeRef.current) / 1000
        // Only track if user has been on page for at least 10 seconds
        if (timeSpent >= 10) {
          analytics.trackProjectTimeSpent(projectTitle, projectSlug, timeSpent)
        }
      }
    }, 30000) // Every 30 seconds

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      
      // Final time tracking on component unmount
      if (!hasTrackedRef.current) {
        const timeSpent = (Date.now() - startTimeRef.current) / 1000
        analytics.trackProjectTimeSpent(projectTitle, projectSlug, timeSpent)
      }
    }
  }, [projectTitle, projectSlug])

  return null
}
