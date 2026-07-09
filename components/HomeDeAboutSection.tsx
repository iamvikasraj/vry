import { Fragment } from 'react'
import CvSection from '@/components/CvSection'
import {
  PORTFOLIO_ABOUT,
  flattenAboutSegments,
  type AboutSegment,
  type AboutWorkItem,
} from '@/data/portfolioProfile'

function AboutRichText({ segments }: { segments: AboutSegment[] }) {
  return (
    <>
      {segments.map((segment, index) => {
        if (typeof segment === 'string') {
          return <Fragment key={index}>{segment}</Fragment>
        }

        if (segment.emphasis === 'Vikas Raj Yadav') {
          return (
            <span key={index} className="home-de-about__name" tabIndex={0}>
              <span itemProp="name">{segment.emphasis}</span>
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
            </span>
          )
        }

        if (segment.href) {
          return (
            <a
              key={index}
              className="home-de-about__link"
              href={segment.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {segment.emphasis}
            </a>
          )
        }

        return (
          <strong key={index} className="home-de-about__emph">
            {segment.emphasis}
          </strong>
        )
      })}
    </>
  )
}

export default function HomeDeAboutSection() {
  const description = `${flattenAboutSegments(PORTFOLIO_ABOUT.lede)} ${PORTFOLIO_ABOUT.paragraphs
    .map(flattenAboutSegments)
    .join(' ')}`

  const workItems = 'work' in PORTFOLIO_ABOUT ? PORTFOLIO_ABOUT.work : null

  return (
    <CvSection id="about" title="About">
      <div className="home-de-about home-de-cv-about" itemScope itemType="https://schema.org/Person">
        <meta itemProp="jobTitle" content="Staff Product Designer & Technologist" />
        <meta itemProp="addressLocality" content="Bengaluru" />
        <meta itemProp="addressCountry" content="IN" />
        <meta itemProp="image" content={PORTFOLIO_ABOUT.photo} />
        <meta itemProp="description" content={description} />

        <div className="home-de-about__body">
          <div className="home-de-about__story">
            <p className="home-de-about__lede">
              <AboutRichText segments={PORTFOLIO_ABOUT.lede} />
            </p>
            {PORTFOLIO_ABOUT.paragraphs.map((paragraph, index) => (
              <p key={index}>
                <AboutRichText segments={paragraph} />
              </p>
            ))}
          </div>

          <aside className="home-de-about__aside" aria-label="Work history">
            {workItems?.length ? (
              <div className="home-de-about__block">
                <ul className="home-de-about__list home-de-about__work-list">
                  {(workItems as AboutWorkItem[]).map((item) => (
                    <li key={`${item.company}-${item.role}-${item.years}`}>
                      <span className="home-de-about__work-head">
                        <span className="home-de-about__work-company">{item.company}</span>
                        <span className="home-de-about__work-leader" aria-hidden="true" />
                        <span className="home-de-about__work-years">{item.years}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </CvSection>
  )
}
