'use client'

import { analytics } from '@/lib/analytics'

type HomeDeEmailLinkProps = {
  className?: string
  variant?: 'text' | 'icon'
  label?: string
  analyticsLocation?: string
}

/** Opens mailto without putting the address in static HTML. */
export default function HomeDeEmailLink({
  className,
  variant = 'text',
  label = 'Email me',
  analyticsLocation = 'home_email_button',
}: HomeDeEmailLinkProps) {
  const openEmail = () => {
    analytics.trackEmailClick(analyticsLocation)
    const local = 'hello'
    const domain = ['vikasrajyadav', 'com'].join('.')
    window.location.href = `mailto:${local}@${domain}`
  }

  return (
    <button
      type="button"
      className={className}
      onClick={openEmail}
      aria-label={variant === 'icon' ? label : undefined}
    >
      {variant === 'icon' ? <i className="fa-regular fa-envelope" aria-hidden="true" /> : label}
    </button>
  )
}
