'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'

/** Maps a hostname to a coarse category for reporting. */
function categorize(hostname: string): string {
  const h = hostname.toLowerCase()
  if (h.includes('linkedin')) return 'social:linkedin'
  if (h.includes('dribbble')) return 'social:dribbble'
  if (h.includes('behance')) return 'social:behance'
  if (h.includes('instagram')) return 'social:instagram'
  if (h.includes('youtube') || h.includes('youtu.be')) return 'social:youtube'
  if (h.includes('twitter') || h === 'x.com' || h.endsWith('.x.com')) return 'social:x'
  if (h.includes('github')) return 'social:github'
  return 'external'
}

/**
 * Site-wide outbound-link tracking. A single delegated click listener catches
 * every external anchor and mailto: link, so individual components don't need
 * their own analytics wiring and new links are covered automatically.
 */
export default function OutboundLinkTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      const linkText = (anchor.textContent || anchor.getAttribute('aria-label') || '').trim().slice(0, 100)

      // Email links.
      if (href.startsWith('mailto:')) {
        analytics.trackEmailClick(linkText || 'mailto-link')
        return
      }

      // Only outbound http(s) links to a different origin.
      if (!/^https?:\/\//i.test(href)) return

      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }
      if (url.hostname === window.location.hostname) return

      analytics.trackOutboundClick({
        url: url.href,
        domain: url.hostname,
        category: categorize(url.hostname),
        link_text: linkText || undefined,
      })
    }

    // Capture phase so we still record clicks whose default nav starts quickly.
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
