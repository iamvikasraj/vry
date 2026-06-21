import WorkshopListRow from '@/components/WorkshopListRow'
import { getPortfolioWorkshops } from '@/data/workshops'

type WorkshopListSectionProps = {
  /** Compact list rows or responsive grid (home Workshops section). */
  layout?: 'list' | 'grid-2' | 'grid-3'
}

export default function WorkshopListSection({ layout = 'list' }: WorkshopListSectionProps) {
  const items = getPortfolioWorkshops()

  const listClassName =
    layout === 'grid-3'
      ? 'home-de-workshop-list home-de-workshop-list--grid-3'
      : layout === 'grid-2'
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
