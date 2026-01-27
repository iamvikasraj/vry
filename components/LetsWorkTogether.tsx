'use client'

import Link from 'next/link'

export default function LetsWorkTogether() {
  return (
    <section className="lets-work-section">
      <div className="lets-work-content">
        <p className="lets-work-description">
          Have a project in mind?{' '}
          <Link href="mailto:hello@vikasrajyadav.com" className="lets-work-link">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
