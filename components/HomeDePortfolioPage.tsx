import DeSectionScroller from '@/components/DeSectionScroller'
import HomeDePortfolioSections from '@/components/HomeDePortfolioSections'
import type { DePortfolioSectionId } from '@/lib/deScroll'

type HomeDePortfolioPageProps = {
  scrollTo?: DePortfolioSectionId
  filterYear?: number
}

export default function HomeDePortfolioPage({ scrollTo, filterYear }: HomeDePortfolioPageProps) {
  return (
    <>
      <DeSectionScroller sectionId={scrollTo} />
      <HomeDePortfolioSections filterYear={filterYear} />
    </>
  )
}
