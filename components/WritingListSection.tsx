import WritingListRow from '@/components/WritingListRow'
import { getPortfolioWritings } from '@/data/writings'

export default function WritingListSection() {
  const items = getPortfolioWritings()

  return (
    <div className="home-de-workshop-stack">
      <div className="home-de-workshop-list home-de-workshop-list--grid-2">
        {items.map((writing) => (
          <WritingListRow key={writing.slug} writing={writing} />
        ))}
      </div>
    </div>
  )
}
