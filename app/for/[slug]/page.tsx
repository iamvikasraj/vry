import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ClientScripts from '@/components/ClientScripts'
import CompanyCoverPageShell from '@/components/CompanyCoverPageShell'
import CompanyCoverView from '@/components/CompanyCoverView'
import { getCompanyCoverBySlug, getCompanyCoverSlugs } from '@/data/companyCovers'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getCompanyCoverSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const cover = getCompanyCoverBySlug(slug)
  if (!cover) return { title: 'Not found' }

  return {
    title: `${cover.companyName} — Vikas Raj Yadav`,
    robots: { index: false, follow: false },
  }
}

export default async function CompanyCoverPage({ params }: PageProps) {
  const { slug } = await params
  const cover = getCompanyCoverBySlug(slug)

  if (!cover) {
    notFound()
  }

  return (
    <>
      <CompanyCoverPageShell>
        <CompanyCoverView cover={cover} />
      </CompanyCoverPageShell>
      <ClientScripts />
    </>
  )
}
