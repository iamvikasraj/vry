import { getLiveEmployerCards } from '@/data/employerCards'
import { getProjectThumbMedia } from '@/lib/projectMedia.server'
import EmployerThumbGrid, { type EmployerThumbGridItem } from '@/components/EmployerThumbGrid'

export default function EmployerThumbGridSection() {
  const items: EmployerThumbGridItem[] = getLiveEmployerCards().map((card) => ({
    ...card,
    media: getProjectThumbMedia(card.featuredProject),
  }))

  return <EmployerThumbGrid items={items} />
}
