'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'
import { getPortfolioSectionTitle, isDePortfolioSectionId } from '@/lib/deScroll'

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
  return path || '/'
}

/**
 * Site-wide internal navigation tracking. Catches hash section links and key
 * portfolio routes so individual nav components don't each wire analytics.
 */
export default function NavigationLinkTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('mailto:') || /^https?:\/\//i.test(href)) return

      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }

      if (url.origin !== window.location.origin) return

      const linkText = (anchor.textContent || anchor.getAttribute('aria-label') || '').trim().slice(0, 100)
      const hashId = url.hash.replace(/^#/, '')

      if (isDePortfolioSectionId(hashId)) {
        analytics.trackNavigationClick(hashId, linkText || getPortfolioSectionTitle(hashId))
        return
      }

      const path = normalizePath(url.pathname)
      if (path.startsWith('/projects/')) return

      if (path === '/') {
        analytics.trackNavigationClick('home', linkText || 'home')
        return
      }
      if (path === '/playground') {
        analytics.trackNavigationClick('playground', linkText || 'Playground')
        return
      }
      if (path === '/workshops' || path.startsWith('/workshops/')) {
        analytics.trackNavigationClick('workshops', linkText || 'Workshops')
        return
      }
      if (path === '/chat') {
        analytics.trackNavigationClick('chat', linkText || 'Chat')
        return
      }
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
