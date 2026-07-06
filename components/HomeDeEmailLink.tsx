'use client'

import { analytics } from '@/lib/analytics'

type HomeDeEmailLinkProps = {
  className?: string
}

/** Opens mailto without putting the address in static HTML. */
export default function HomeDeEmailLink({ className }: HomeDeEmailLinkProps) {
  const openEmail = () => {
    analytics.trackEmailClick('home_email_button')
    const local = 'hello'
    const domain = ['vikasrajyadav', 'com'].join('.')
    window.location.href = `mailto:${local}@${domain}`
  }

  return (
    <button type="button" className={className} onClick={openEmail}>
      Email me
    </button>
  )
}
