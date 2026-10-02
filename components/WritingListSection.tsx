import WritingListRow from '@/components/WritingListRow'
import { getPortfolioWritings } from '@/data/writings'

const PLATFORM_URL = 'https://designengineer.ing'

/** One breakdown video, then a short note on designengineer.ing where the rest live. */
export default function WritingListSection() {
  const [lead] = getPortfolioWritings()

  return (
    <div className="home-de-workshop-stack">
      <div className="home-de-workshop-list home-de-media-grid">
        {lead ? <WritingListRow writing={lead} /> : null}
        <div className="home-de-platform">
          <p className="home-de-platform__lede">
            Design engineering is designing an interface and building it in code yourself, so
            nothing gets lost between the design and the app people use.
          </p>
          <p className="home-de-platform__body">
            I write about it on designengineer.ing: breakdowns of how each piece was designed and
            built in SwiftUI and Rive, open-source apps, and a guide to getting started.
          </p>
          <a
            className="home-de-platform__link"
            href={PLATFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            designengineer.ing
            <span className="home-de-link-list__arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
