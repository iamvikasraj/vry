'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', margin: 0 }}>
        <h1>Something went wrong</h1>
        <p style={{ marginTop: '0.75rem', color: '#444' }}>
          {error.message || 'An unexpected error occurred.'}
        </p>
        <p style={{ marginTop: '1.25rem' }}>
          <button type="button" onClick={() => reset()}>
            Try again
          </button>
        </p>
      </body>
    </html>
  )
}
