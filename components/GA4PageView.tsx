'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import '@/lib/analytics' // Initialize analytics global functions

export default function GA4PageView() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-SYDGLK4LKX', {
        page_path: pathname,
      })
      console.log('📄 GA4 Page View:', pathname)
    }
  }, [pathname])

  return null
}
