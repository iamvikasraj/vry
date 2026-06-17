import WorkshopListRow from '@/components/WorkshopListRow'
import { getPortfolioWorkshops } from '@/data/workshops'

type WorkshopListSectionProps = {
  /** Two-column grid of compact list rows (home Workshops section). */
  layout?: 'list' | 'grid-2'
  /** First item as featured card, rest in a 2-up grid below. */
  featuredFirst?: boolean
}

export default function WorkshopListSection({
  layout = 'list',
  featuredFirst = false,
}: WorkshopListSectionProps) {
  const items = getPortfolioWorkshops()
  const [featured, ...rest] = items

  return (
    <div className="home-de-workshop-stack">
      <div className="home-de-workshop-list">
        {(featuredFirst ? [featured] : items).filter(Boolean).map((workshop) => (
          <WorkshopListRow key={`${workshop.year}-${workshop.title}`} workshop={workshop} />
        ))}
      </div>

      {featuredFirst ? (
        <div className={`home-de-workshop-list home-de-workshop-list--grid-2`}>
          {rest.map((workshop) => (
            <WorkshopListRow key={`${workshop.year}-${workshop.title}`} workshop={workshop} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
