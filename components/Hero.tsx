import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Vikas Raj Yadav</h1>
        <p className="hero-subtitle">Design Director</p>
        <p className="hero-location">Bengaluru, India</p>
        <div className="hero-cta">
          <Link href="/work" className="cta-primary">
            View Work
          </Link>
        </div>
      </div>
    </section>
  )
}
