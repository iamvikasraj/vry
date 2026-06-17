import HomeDeLayout from '@/components/HomeDeLayout'
import HomeDePortfolioPage from '@/components/HomeDePortfolioPage'

type PageProps = {
  searchParams?: Promise<{ year?: string }>
}

export default async function Home({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {}
  const year = params.year ? Number(params.year) : undefined
  const filterYear = Number.isFinite(year) ? year : undefined

  return (
    <HomeDeLayout>
      <HomeDePortfolioPage filterYear={filterYear} />
    </HomeDeLayout>
  )
}
