import HomeDeLayout from '@/components/HomeDeLayout'
import HomeDePortfolioPage from '@/components/HomeDePortfolioPage'

/** Same single-page portfolio; scrolls to Interactions on load. */
export default function PlaygroundPage() {
  return (
    <HomeDeLayout>
      <HomeDePortfolioPage scrollTo="playground" />
    </HomeDeLayout>
  )
}
