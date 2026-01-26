'use client'

import Link from 'next/link'

export default function HeroSection() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/vraj247',
      paths: [
        'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z',
        'M6 9H2v12h4V9z',
        'M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
      ],
    },
    {
      name: 'GitHub',
      url: 'https://github.com/iamvikasraj',
      paths: [
        'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
      ],
    },
    {
      name: 'Twitter',
      url: 'https://x.com/vryworks',
      paths: [
        'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
      ],
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/iamvikasraj/',
      paths: [
        'M12 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8z',
        'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
        'M17.5 6.5h.01',
      ],
    },
  ]

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Staff Product Designer & Technologist
          <br />
          <span className="hero-subtitle">Building at Loop Health (YC 20). Previously led design teams at Paytm, HDFC Bank, and ETMoney—shaping products used by millions.</span>
        </h1>
        <div className="hero-social-icons">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-icon-link"
              aria-label={social.name}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-color)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hero-social-icon"
                style={{ color: 'var(--text-color)' }}
              >
                {social.paths.map((path, idx) => (
                  <path key={idx} d={path} />
                ))}
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
