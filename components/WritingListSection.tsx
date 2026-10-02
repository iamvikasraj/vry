import HomeDeLinkList from '@/components/HomeDeLinkList'
import WritingListRow from '@/components/WritingListRow'
import { getOpenSourceRepos } from '@/data/projects'
import { getPortfolioWritings } from '@/data/writings'

/** One breakdown video; beside it, the open-source apps. */
export default function WritingListSection() {
  const [lead] = getPortfolioWritings()

  return (
    <div className="home-de-workshop-stack">
      <div className="home-de-workshop-list home-de-media-grid">
        {lead ? <WritingListRow writing={lead} /> : null}
        <div className="home-de-platform">
          {/* Keeps old /#open-source links landing here. */}
          <span id="open-source" className="home-de-platform__anchor" aria-hidden="true" />
          <HomeDeLinkList items={getOpenSourceRepos()} />
        </div>
      </div>
    </div>
  )
}
