import HomeDeLayout from '@/components/HomeDeLayout'
import HomeDePortfolioPage from '@/components/HomeDePortfolioPage'

type PageProps = {
  searchParams?: Promise<{ company?: string }>
}

export default async function Home({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {}
  const filterCompany = params.company?.trim() || undefined

  return (
    <HomeDeLayout>
      <HomeDePortfolioPage filterCompany={filterCompany} />
    </HomeDeLayout>
  )
}
