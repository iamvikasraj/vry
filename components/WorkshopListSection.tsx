import WorkshopListRow from '@/components/WorkshopListRow'
import { getPortfolioWorkshops } from '@/data/workshops'

export default function WorkshopListSection() {
  const items = getPortfolioWorkshops()

  return (
    <div className="home-de-workshop-list">
      {items.map((workshop) => (
        <WorkshopListRow key={`${workshop.year}-${workshop.title}`} workshop={workshop} />
      ))}
    </div>
  )
}
