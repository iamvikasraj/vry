import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import EmployerChapterPageShell from '@/components/EmployerChapterPageShell'
import EmployerChapterView from '@/components/EmployerChapterView'
import { getLiveEmployerCardBySlug, getLiveEmployerCards } from '@/data/employerCards'
import { getEmployerChapter } from '@/data/employerChapters'

type PageProps = { params: Promise<{ employer: string }> }

export async function generateStaticParams() {
  return getLiveEmployerCards().map((card) => ({ employer: card.employer.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { employer: slug } = await params
  const card = getLiveEmployerCardBySlug(slug)
  if (!card) return { title: 'Work — Vikas Raj Yadav' }

  return {
    title: `${card.employer.company} — Vikas Raj Yadav`,
    description: getEmployerChapter(slug)?.roleSummary,
  }
}

export default async function EmployerChapterPage({ params }: PageProps) {
  const { employer: slug } = await params
  const card = getLiveEmployerCardBySlug(slug)
  const chapter = getEmployerChapter(slug)

  if (!card || !chapter) {
    notFound()
  }

  return (
    <EmployerChapterPageShell>
      <EmployerChapterView card={card} chapter={chapter} />
    </EmployerChapterPageShell>
  )
}
