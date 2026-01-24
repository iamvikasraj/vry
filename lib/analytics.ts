// Google Analytics 4 Event Tracking

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      targetId: string | object,
      config?: object
    ) => void
    dataLayer: any[]
  }
}

// GA4 Event Types
// Following GA4 best practices: https://support.google.com/analytics/answer/9355848
export const trackEvent = (
  eventName: string,
  eventParams?: {
    [key: string]: string | number | boolean | undefined
  }
) => {
  if (typeof window !== 'undefined') {
    // Check if gtag is available
    if (window.gtag) {
      // GA4 doesn't use event_category - use custom parameters instead
      window.gtag('event', eventName, {
        ...eventParams,
      })
      // Debug logging (remove in production if needed)
      if (process.env.NODE_ENV === 'development') {
        console.log('GA4 Event:', eventName, eventParams)
      }
    } else {
      // Fallback: try to use dataLayer directly
      if (window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          ...eventParams,
        })
        if (process.env.NODE_ENV === 'development') {
          console.log('GA4 Event (dataLayer):', eventName, eventParams)
        }
      } else {
        console.warn('GA4 not initialized. gtag and dataLayer not found.')
      }
    }
  }
}

// Specific event tracking functions
export const analytics = {
  // Project interactions
  // These are key events for portfolio - track important user actions
  trackProjectClick: (projectTitle: string, projectSlug: string, projectTags?: string[]) => {
    trackEvent('project_click', {
      project_title: projectTitle,
      project_slug: projectSlug,
      project_tags: projectTags?.join(', ') || '',
      interaction_type: 'project_interaction',
    })
  },

  trackProjectView: (projectTitle: string, projectSlug: string) => {
    trackEvent('project_view', {
      project_title: projectTitle,
      project_slug: projectSlug,
      interaction_type: 'project_interaction',
    })
  },

  trackProjectTimeSpent: (
    projectTitle: string,
    projectSlug: string,
    timeSpentSeconds: number
  ) => {
    trackEvent('project_time_spent', {
      project_title: projectTitle,
      project_slug: projectSlug,
      time_spent_seconds: Math.round(timeSpentSeconds),
      time_spent_minutes: Math.round(timeSpentSeconds / 60 * 10) / 10, // Round to 1 decimal
      interaction_type: 'project_interaction',
    })
  },

  trackProjectSectionClick: (
    projectTitle: string,
    projectSlug: string,
    sectionName: string
  ) => {
    trackEvent('project_section_click', {
      project_title: projectTitle,
      project_slug: projectSlug,
      section_name: sectionName,
      interaction_type: 'project_interaction',
    })
  },

  // Filter interactions
  trackFilterChange: (filterName: string) => {
    trackEvent('filter_change', {
      filter_name: filterName,
      interaction_type: 'navigation',
    })
  },

  // Grid toggle
  trackGridToggle: (gridSize: '1x1' | '2x2') => {
    trackEvent('grid_toggle', {
      grid_size: gridSize,
      interaction_type: 'navigation',
    })
  },

  // Navigation
  trackNavigationClick: (pageName: string, linkText: string) => {
    trackEvent('navigation_click', {
      page_name: pageName,
      link_text: linkText,
      interaction_type: 'navigation',
    })
  },

  // Video interactions
  trackVideoPlay: (videoTitle: string, videoSrc: string) => {
    trackEvent('video_play', {
      video_title: videoTitle,
      video_src: videoSrc,
      interaction_type: 'media_interaction',
    })
  },

  trackVideoHover: (videoTitle: string) => {
    trackEvent('video_hover', {
      video_title: videoTitle,
      interaction_type: 'media_interaction',
    })
  },

  // Test function to verify GA4 is working
  testTracking: () => {
    trackEvent('test_event', {
      test_param: 'tracking_test',
      interaction_type: 'debug',
    })
    console.log('Test event sent to GA4. Check Realtime reports in GA4 dashboard.')
  },
}
