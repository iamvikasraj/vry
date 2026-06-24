import WorkshopListRow from '@/components/WorkshopListRow'
import { getPortfolioWorkshops } from '@/data/workshops'

type WorkshopListSectionProps = {
  /** Compact list rows or responsive grid (home Workshops section). */
  layout?: 'list' | 'grid-2' | 'grid-3'
}

export default function WorkshopListSection({ layout = 'list' }: WorkshopListSectionProps) {
  const items = getPortfolioWorkshops()

  const listClassName =
    layout === 'list'
      ? 'home-de-workshop-list'
      : 'home-de-workshop-list home-de-media-grid'

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
