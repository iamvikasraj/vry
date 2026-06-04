export type DePortfolioSectionId = 'live-projects' | 'playground' | 'workshops'

const SECTION_IDS: DePortfolioSectionId[] = ['live-projects', 'playground', 'workshops']

export const DE_SECTION_HREF: Record<DePortfolioSectionId, string> = {
  'live-projects': '/#live-projects',
  playground: '/#playground',
  workshops: '/#workshops',
}

export function isDePortfolioSectionId(value: string): value is DePortfolioSectionId {
  return SECTION_IDS.includes(value as DePortfolioSectionId)
}

/** Scroll container for the DE shell (viewport on mobile, main column on desktop). */
export function getDeScrollRoot(): HTMLElement | null {
  const main = document.querySelector<HTMLElement>('.home-de-main-content')
  if (!main) return null
  const { overflowY } = getComputedStyle(main)
  if (overflowY === 'auto' || overflowY === 'scroll') return main
  return null
}

export function scrollToDeSection(
  sectionId: DePortfolioSectionId,
  options?: { behavior?: ScrollBehavior; updateHash?: boolean }
) {
  const el = document.getElementById(sectionId)
  if (!el) return

  const behavior = options?.behavior ?? 'smooth'
  const root = getDeScrollRoot()

  if (root) {
    const rootRect = root.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const top = root.scrollTop + (elRect.top - rootRect.top)
    root.scrollTo({ top, behavior })
  } else {
    el.scrollIntoView({ behavior, block: 'start' })
  }

  if (options?.updateHash !== false) {
    const hash = `#${sectionId}`
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', `${window.location.pathname}${hash}`)
    }
  }
}

export function scrollToDeSectionFromHash(behavior: ScrollBehavior = 'auto') {
  const raw = window.location.hash.replace(/^#/, '')
  if (!isDePortfolioSectionId(raw)) return
  scrollToDeSection(raw, { behavior, updateHash: false })
}
