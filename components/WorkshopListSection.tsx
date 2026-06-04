import WorkshopListRow from '@/components/WorkshopListRow'
import { getPortfolioWorkshops } from '@/data/workshops'

type WorkshopListSectionProps = {
  /** Two-column grid of compact list rows (home Workshops section). */
  layout?: 'list' | 'grid-2'
}

export default function WorkshopListSection({ layout = 'list' }: WorkshopListSectionProps) {
  const items = getPortfolioWorkshops()

  return (
    <div
      className={`home-de-workshop-list${layout === 'grid-2' ? ' home-de-workshop-list--grid-2' : ''}`}
    >
      {items.map((workshop) => (
        <WorkshopListRow key={`${workshop.year}-${workshop.title}`} workshop={workshop} />
      ))}
    </div>
  )
}
