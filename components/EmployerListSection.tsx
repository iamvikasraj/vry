import { getLiveEmployerCards } from '@/data/employerCards'
import EmployerListLink from '@/components/EmployerListLink'

type EmployerListSectionProps = {
  layout?: 'list' | 'grid-2'
}

export default function EmployerListSection({ layout = 'grid-2' }: EmployerListSectionProps) {
  const cards = getLiveEmployerCards()

  return (
    <div
      className={`home-de-project-list${layout === 'grid-2' ? ' home-de-project-list--grid-2' : ''}`}
    >
      {cards.map((card) => (
        <EmployerListLink key={card.employer.slug} card={card} />
      ))}
    </div>
  )
}
