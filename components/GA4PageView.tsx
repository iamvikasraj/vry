'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { GA_MEASUREMENT_ID, GA_DEBUG } from '@/lib/ga'
import '@/lib/analytics' // Initialize analytics global functions

export default function GA4PageView() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

    // Initial config uses send_page_view:false, so we send every page_view
    // here — including the first load. This avoids the double-count that a
    // second gtag('config') on mount would cause.
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_MEASUREMENT_ID,
    })

    if (GA_DEBUG) console.log('📄 GA4 Page View:', pathname)
  }, [pathname])

  return null
}
