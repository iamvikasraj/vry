import CvSection from '@/components/CvSection'
import HomeDeEmailLink from '@/components/HomeDeEmailLink'
import { PORTFOLIO_ABOUT } from '@/data/portfolioProfile'

export default function HomeDeAboutSection() {
  return (
    <CvSection id="about" title="About">
      <div className="home-de-about home-de-cv-about" itemScope itemType="https://schema.org/Person">
        <meta itemProp="jobTitle" content="Staff Product Designer & Technologist" />
        <meta itemProp="addressLocality" content="Bengaluru" />
        <meta itemProp="addressCountry" content="IN" />
        <meta itemProp="image" content={PORTFOLIO_ABOUT.photo} />
        <p itemProp="description">
          <span className="home-de-about__name" tabIndex={0}>
            <span itemProp="name">Vikas Raj Yadav</span>
            <span className="home-de-about__name-photo" aria-hidden="true">
              <img
                src={PORTFOLIO_ABOUT.photo}
                alt=""
                width={160}
                height={200}
                loading="lazy"
                decoding="async"
              />
            </span>
          </span>{' '}
          is a {PORTFOLIO_ABOUT.lede}
        </p>
        {PORTFOLIO_ABOUT.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="home-de-about__availability">
          {PORTFOLIO_ABOUT.contact} <HomeDeEmailLink className="home-de-about__email-link" />
        </p>
      </div>
    </CvSection>
  )
}
