import HomeDeLayout from '@/components/HomeDeLayout'
import HomeDePortfolioPage from '@/components/HomeDePortfolioPage'

/** Same single-page portfolio; scrolls to Workshops on load. */
export default function WorkshopsPage() {
  return (
    <HomeDeLayout>
      <HomeDePortfolioPage scrollTo="workshops" />
    </HomeDeLayout>
  )
}
