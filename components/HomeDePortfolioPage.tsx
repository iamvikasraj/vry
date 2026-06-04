import DeSectionScroller from '@/components/DeSectionScroller'
import HomeDePortfolioSections from '@/components/HomeDePortfolioSections'
import type { DePortfolioSectionId } from '@/lib/deScroll'

type HomeDePortfolioPageProps = {
  scrollTo?: DePortfolioSectionId
}

export default function HomeDePortfolioPage({ scrollTo }: HomeDePortfolioPageProps) {
  return (
    <>
      <DeSectionScroller sectionId={scrollTo} />
      <HomeDePortfolioSections />
    </>
  )
}
