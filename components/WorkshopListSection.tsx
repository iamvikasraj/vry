import WorkshopListRow from '@/components/WorkshopListRow'
import { getPortfolioWorkshops } from '@/data/workshops'

type WorkshopListSectionProps = {
  /** Two-column grid of compact list rows (home Workshops section). */
  layout?: 'list' | 'grid-2'
  /** First item full width, rest in a 2-up grid below. */
  featuredFirst?: boolean
}

export default function WorkshopListSection({
  layout = 'list',
  featuredFirst = false,
}: WorkshopListSectionProps) {
  const items = getPortfolioWorkshops()
  const [featured, ...rest] = items

  if (featuredFirst) {
    return (
      <div className="home-de-workshop-stack">
        <div className="home-de-workshop-list">
          {featured ? <WorkshopListRow workshop={featured} /> : null}
        </div>
        {rest.length > 0 ? (
          <div className="home-de-workshop-list home-de-workshop-list--grid-2">
            {rest.map((workshop) => (
              <WorkshopListRow key={workshop.slug} workshop={workshop} />
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  const listClassName =
    layout === 'grid-2'
      ? 'home-de-workshop-list home-de-workshop-list--grid-2'
      : 'home-de-workshop-list'

  return (
    <div className="home-de-workshop-stack">
      <div className={listClassName}>
        {items.map((workshop) => (
          <WorkshopListRow key={workshop.slug} workshop={workshop} />
        ))}
      </div>
    </div>
  )
}
