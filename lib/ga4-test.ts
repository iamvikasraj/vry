// GA4 Event Testing Utility
// Run this in browser console to test all events

export const testAllGA4Events = () => {
  console.log('🧪 Testing GA4 Events...\n')
  
  // Check if GA4 is loaded
  const gtagAvailable = typeof window !== 'undefined' && typeof (window as any).gtag === 'function'
  const dataLayerAvailable = typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)
  
  console.log('GA4 Status:')
  console.log('  ✅ gtag available:', gtagAvailable)
  console.log('  ✅ dataLayer available:', dataLayerAvailable)
  console.log('  📊 dataLayer entries:', dataLayerAvailable ? (window as any).dataLayer.length : 0)
  
  if (!gtagAvailable && !dataLayerAvailable) {
    console.error('❌ GA4 not loaded! Check script implementation.')
    return
  }
  
  console.log('\n📤 Sending test events...\n')
  
  // Test all event types
  const testEvents = [
    {
      name: 'project_click',
      params: { project_title: 'Test Project', project_slug: 'test-project', project_tags: 'Test, Demo' }
    },
    {
      name: 'project_view',
      params: { project_title: 'Test Project', project_slug: 'test-project' }
    },
    {
      name: 'project_time_spent',
      params: { project_title: 'Test Project', project_slug: 'test-project', time_spent_seconds: 45 }
    },
    {
      name: 'project_section_click',
      params: { project_title: 'Test Project', project_slug: 'test-project', section_name: 'Context' }
    },
    {
      name: 'filter_change',
      params: { filter_name: 'All' }
    },
    {
      name: 'grid_toggle',
      params: { grid_size: '1x1' }
    },
    {
      name: 'navigation_click',
      params: { page_name: 'work', link_text: 'Work' }
    },
    {
      name: 'video_play',
      params: { video_title: 'Test Video', video_src: '/test.mp4' }
    },
    {
      name: 'video_hover',
      params: { video_title: 'Test Video' }
    },
  ]
  
  testEvents.forEach((event, index) => {
    setTimeout(() => {
      if (gtagAvailable) {
        (window as any).gtag('event', event.name, event.params)
        console.log(`✅ Sent: ${event.name}`, event.params)
      } else if (dataLayerAvailable) {
        (window as any).dataLayer.push({
          event: event.name,
          ...event.params
        })
        console.log(`✅ Queued: ${event.name}`, event.params)
      }
    }, index * 500) // Stagger events by 500ms
  })
  
  console.log('\n✅ All test events sent!')
  console.log('📊 Check GA4 Realtime reports: https://analytics.google.com')
  console.log('   Go to: Reports → Realtime → Event count by Event name')
  console.log('\n💡 Tip: Events may take 30-60 seconds to appear in Realtime')
  
  // Show dataLayer contents
  if (dataLayerAvailable) {
    console.log('\n📋 Current dataLayer entries:')
    console.table((window as any).dataLayer.slice(-10)) // Last 10 entries
  }
}

// Make it available globally for easy console access
if (typeof window !== 'undefined') {
  (window as any).testGA4Events = testAllGA4Events
  console.log('💡 Run testGA4Events() in console to test all events')
}
