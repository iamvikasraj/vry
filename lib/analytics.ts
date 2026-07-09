// Simple GA4 Event Tracking

import { GA_MEASUREMENT_ID, GA_DEBUG } from '@/lib/ga'

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
  
  const params = eventParams || {}
  
  // Wait a bit for gtag to be ready, then send
  const sendEvent = () => {
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', eventName, params)
        if (GA_DEBUG) console.log('✅ GA4 Event sent:', eventName, params)
      } catch (error) {
        if (GA_DEBUG) console.error('❌ GA4 Event error:', error)
      }
    } else {
      // Push to dataLayer - gtag will process when ready
      window.dataLayer.push({
        event: eventName,
        ...params
      })
      if (GA_DEBUG) console.log('📤 GA4 Event queued:', eventName, params)
    }
  }
  
  // If gtag is ready, send immediately
  if (typeof window.gtag === 'function') {
    sendEvent()
  } else {
    // Wait for gtag to load (max 5 seconds)
    let attempts = 0
    const checkGtag = setInterval(() => {
      attempts++
      if (typeof window.gtag === 'function') {
        clearInterval(checkGtag)
        sendEvent()
      } else if (attempts >= 10) {
        // After 5 seconds, just queue to dataLayer
        clearInterval(checkGtag)
        window.dataLayer.push({
          event: eventName,
          ...params
        })
        if (GA_DEBUG) console.warn('⚠️ GA4 gtag not loaded after 5s, queued to dataLayer:', eventName)
      }
    }, 500)
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
  /** Portfolio LLM chat: user sent a message (no message content — privacy) */
  trackChatMessageSent: (charLength?: number) => {
    trackEvent('portfolio_chat_message', {
      message_length_bucket:
        charLength == null
          ? 'unknown'
          : charLength < 50
            ? 'short'
            : charLength < 200
              ? 'medium'
              : 'long',
    })
  },
  /** Ti chat opened. surface: 'global' (site chat) or 'project' (case-study widget) */
  trackChatOpen: (surface: 'global' | 'project', projectSlug?: string) => {
    trackEvent('portfolio_chat_open', { chat_surface: surface, project_slug: projectSlug })
  },
  /** Outbound click to an external site. Fired site-wide by OutboundLinkTracker. */
  trackOutboundClick: (params: { url: string; domain: string; category: string; link_text?: string }) => {
    trackEvent('outbound_click', {
      link_url: params.url,
      link_domain: params.domain,
      link_category: params.category,
      link_text: params.link_text,
    })
  },
  /** Email / contact intent (mailto). location = where it was clicked. */
  trackEmailClick: (location: string) => {
    trackEvent('email_click', { link_location: location })
  },

  // Test all events - available in browser console
  testAll: () => {
    console.log('🧪 Testing all GA4 events...')
    analytics.trackProjectClick('Test Project', 'test-project', ['Test', 'Demo'])
    analytics.trackProjectView('Test Project', 'test-project')
    analytics.trackProjectTimeSpent('Test Project', 'test-project', 45)
    analytics.trackProjectSectionClick('Test Project', 'test-project', 'Context')
    analytics.trackFilterChange('All')
    analytics.trackGridToggle('1x1')
    analytics.trackNavigationClick('timeline', 'Experiences')
    analytics.trackVideoPlay('Test Video', '/test.mp4')
    analytics.trackVideoHover('Test Video')
    analytics.trackChatMessageSent(42)
    analytics.trackChatOpen('project', 'test-project')
    analytics.trackOutboundClick({ url: 'https://example.com', domain: 'example.com', category: 'other', link_text: 'Example' })
    analytics.trackEmailClick('test')
    console.log('✅ All test events sent! Check GA4 Realtime reports.')
  },
}

// Make analytics available globally for testing
// This runs when the module is imported in a client component
if (typeof window !== 'undefined') {
  (window as any).analytics = analytics
  
  // Add status check function
  ;(window as any).checkGA4Status = () => {
    const status = {
      gtag: typeof (window as any).gtag === 'function',
      dataLayer: Array.isArray((window as any).dataLayer),
      dataLayerLength: (window as any).dataLayer?.length || 0,
      propertyId: GA_MEASUREMENT_ID
    }
    console.table(status)
    return status
  }
  
  // Only log once to avoid spam (dev only)
  if (GA_DEBUG && !(window as any).__ga4Initialized) {
    (window as any).__ga4Initialized = true
    console.log('💡 GA4 Testing:')
    console.log('   - Run analytics.testAll() to test all events')
    console.log('   - Run checkGA4Status() to check GA4 status')
  }
}
