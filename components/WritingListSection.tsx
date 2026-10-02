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
          <p className="home-de-platform__body">
            Where I break down how each interface is designed and built in SwiftUI and Rive, with
            open-source apps and a guide to getting started.
          </p>
        </div>
      </div>
    </div>
  )
}
