import { getLiveEmployerCardBySlug } from '@/data/employerCards'
import { getEmployerChapter } from '@/data/employerChapters'
import { employerChapterHref } from '@/lib/deRoutes'

export function employerChapterHrefIfExists(slug: string): string | null {
  if (!getLiveEmployerCardBySlug(slug) || !getEmployerChapter(slug)) return null
  return employerChapterHref(slug)
}
