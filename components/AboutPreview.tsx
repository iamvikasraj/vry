import Link from 'next/link'

export default function AboutPreview() {
  return (
    <section className="about-preview-section">
      <div className="about-preview-content">
        <div className="about-preview-text">
          <h2 className="h2">About Me</h2>
          <p className="body1">
            <strong>Vikas Raj Yadav</strong> is a Staff Product Designer at{' '}
            <strong>Loop Health</strong>, where he crafts intuitive and impactful digital health 
            experiences. With 10+ years of expertise in interaction design, motion systems, and 
            prototyping, Vikas brings ideas to life through detail-driven and human-centered design.
          </p>
          <p className="body1">
            Previously, he led design teams at <strong>ETMoney, HDFC Bank, and Paytm</strong>, 
            shaping products used by millions. As a <strong>Rive and Play ambassador</strong>, 
            he champions the future of interactive design.
          </p>
          <Link href="/about" className="about-preview-link">
            Read Full Story →
          </Link>
        </div>
        <div className="about-preview-image">
          <img
            src="/assets/images/vry.jpg"
            alt="Vikas Raj Yadav"
            className="about-preview-img"
          />
        </div>
      </div>
    </section>
  )
}
