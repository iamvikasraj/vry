'use client'

import Link from 'next/link'

export default function LetsWorkTogether() {
  return (
    <section className="lets-work-section">
      <div className="lets-work-content">
        <h2 className="lets-work-title">Want to work together?</h2>
        <Link href="/contact" className="lets-work-cta">
          Get in touch
        </Link>
      </div>
    </section>
  )
}
