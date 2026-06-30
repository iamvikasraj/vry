'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="home-page home-page--de">
      <main className="home-de-main" style={{ padding: '2rem', maxWidth: '40rem' }}>
        <h1 className="home-de-section-title">Something went wrong</h1>
        <p className="home-de-section-text" style={{ marginTop: '0.75rem' }}>
          The page hit an error. Try again or return home.
        </p>
        <p style={{ marginTop: '1.25rem', display: 'flex', gap: '1rem' }}>
          <button type="button" className="home-de-project-list__link" onClick={() => reset()}>
            Try again
          </button>
          <a href="/" className="home-de-project-list__link">
            Home
          </a>
        </p>
      </main>
    </div>
  )
}
