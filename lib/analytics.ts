// Simple GA4 Event Tracking

declare global {
  interface Window {
    gtag: (command: string, targetId: string | object, config?: object) => void
    dataLayer: any[]
  }
}

export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window === 'undefined') return
  
  // Ensure dataLayer exists
  if (!window.dataLayer) {
    window.dataLayer = []
  }
  
  // Use gtag if available, otherwise push to dataLayer
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams || {})
  } else {
    // Push to dataLayer - gtag will process it when loaded
    window.dataLayer.push({
      event: eventName,
      ...(eventParams || {})
    })
  }
}

export const analytics = {
  trackProjectClick: (title: string, slug: string, tags?: string[]) => {
    trackEvent('project_click', { project_title: title, project_slug: slug, project_tags: tags?.join(', ') })
  },
  trackProjectView: (title: string, slug: string) => {
    trackEvent('project_view', { project_title: title, project_slug: slug })
  },
  trackProjectTimeSpent: (title: string, slug: string, seconds: number) => {
    trackEvent('project_time_spent', { project_title: title, project_slug: slug, time_spent_seconds: Math.round(seconds) })
  },
  trackProjectSectionClick: (title: string, slug: string, section: string) => {
    trackEvent('project_section_click', { project_title: title, project_slug: slug, section_name: section })
  },
  trackFilterChange: (filter: string) => {
    trackEvent('filter_change', { filter_name: filter })
  },
  trackGridToggle: (size: '1x1' | '2x2') => {
    trackEvent('grid_toggle', { grid_size: size })
  },
  trackNavigationClick: (page: string, link: string) => {
    trackEvent('navigation_click', { page_name: page, link_text: link })
  },
  trackVideoPlay: (title: string, src: string) => {
    trackEvent('video_play', { video_title: title, video_src: src })
  },
  trackVideoHover: (title: string) => {
    trackEvent('video_hover', { video_title: title })
  },
}
