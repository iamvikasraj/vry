'use client'

import Link from 'next/link'

export default function LetsWorkTogether() {
  return (
    <section className="lets-work-section">
      <div className="lets-work-content">
        <h2 className="lets-work-title">Let's work together</h2>
        <p className="lets-work-description">
          If you have a website or mobile app idea in mind or you need some advice about product design, feel free to{' '}
          <Link href="/contact" className="lets-work-link">
            contact me
          </Link>
          . Currently my time books quickly, so the sooner you write, the better it is for both of us.
        </p>
        <div className="lets-work-contact">
          <Link href="mailto:hello@vikasrajyadav.com" className="lets-work-email-link">
            <div className="lets-work-email-content">
              <img
                src="/assets/images/vry.jpg"
                alt="Vikas Raj Yadav"
                className="lets-work-profile-img"
              />
              <div className="lets-work-email-info">
                <div className="lets-work-email-address">hello@vikasrajyadav.com</div>
                <div className="lets-work-reply-time">Reply time: within 1-2 working days</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
