// Google Analytics 4 Event Tracking

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      targetId: string | object,
      config?: object
    ) => void
  }
}

// GA4 Event Types
export const trackEvent = (
  eventName: string,
  eventParams?: {
    [key: string]: string | number | boolean | undefined
  }
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...eventParams,
      event_category: eventParams?.event_category || 'engagement',
    })
  }
}

// Specific event tracking functions
export const analytics = {
  // Project interactions
  trackProjectClick: (projectTitle: string, projectSlug: string, projectTags?: string[]) => {
    trackEvent('project_click', {
      project_title: projectTitle,
      project_slug: projectSlug,
      project_tags: projectTags?.join(', ') || '',
      event_category: 'project_interaction',
    })
  },

  trackProjectView: (projectTitle: string, projectSlug: string) => {
    trackEvent('project_view', {
      project_title: projectTitle,
      project_slug: projectSlug,
      event_category: 'project_interaction',
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
      event_category: 'project_interaction',
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
      event_category: 'project_interaction',
    })
  },

  // Filter interactions
  trackFilterChange: (filterName: string) => {
    trackEvent('filter_change', {
      filter_name: filterName,
      event_category: 'navigation',
    })
  },

  // Grid toggle
  trackGridToggle: (gridSize: '1x1' | '2x2') => {
    trackEvent('grid_toggle', {
      grid_size: gridSize,
      event_category: 'navigation',
    })
  },

  // Navigation
  trackNavigationClick: (pageName: string, linkText: string) => {
    trackEvent('navigation_click', {
      page_name: pageName,
      link_text: linkText,
      event_category: 'navigation',
    })
  },

  // Video interactions
  trackVideoPlay: (videoTitle: string, videoSrc: string) => {
    trackEvent('video_play', {
      video_title: videoTitle,
      video_src: videoSrc,
      event_category: 'media_interaction',
    })
  },

  trackVideoHover: (videoTitle: string) => {
    trackEvent('video_hover', {
      video_title: videoTitle,
      event_category: 'media_interaction',
    })
  },
}
