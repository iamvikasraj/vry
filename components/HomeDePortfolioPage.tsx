import DeSectionScroller from '@/components/DeSectionScroller'
import HomeDePortfolioSections from '@/components/HomeDePortfolioSections'
import type { DePortfolioSectionId } from '@/lib/deScroll'

type HomeDePortfolioPageProps = {
  scrollTo?: DePortfolioSectionId
  filterCompany?: string
}

export default function HomeDePortfolioPage({ scrollTo, filterCompany }: HomeDePortfolioPageProps) {
  return (
    <>
      <DeSectionScroller sectionId={scrollTo} />
      <HomeDePortfolioSections filterCompany={filterCompany} />
    </>
  )
}
