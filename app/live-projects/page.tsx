import HomeDeLayout from '@/components/HomeDeLayout'
import HomeDePortfolioPage from '@/components/HomeDePortfolioPage'

/** Same single-page portfolio; Live Projects is the first section. */
export default function LiveProjectsPage() {
  return (
    <HomeDeLayout>
      <HomeDePortfolioPage scrollTo="live-projects" />
    </HomeDeLayout>
  )
}
