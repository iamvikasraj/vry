import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="home-page home-page--de">
      <main className="home-de-main" style={{ padding: '2rem', maxWidth: '40rem' }}>
        <h1 className="home-de-section-title">Page not found</h1>
        <p className="home-de-section-text" style={{ marginTop: '0.75rem' }}>
          That route doesn&apos;t exist. Head back to the portfolio home.
        </p>
        <p style={{ marginTop: '1.25rem' }}>
          <Link href="/" className="home-de-project-list__link">
            ← Home
          </Link>
        </p>
      </main>
    </div>
  )
}
