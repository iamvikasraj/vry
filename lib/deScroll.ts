export type DePortfolioSectionId = 'timeline' | 'playground' | 'workshops' | 'writing' | 'about'

const SECTION_IDS: DePortfolioSectionId[] = ['timeline', 'workshops', 'playground', 'writing', 'about']

export const PORTFOLIO_SECTION_NAV: { id: DePortfolioSectionId; label: string }[] = [
  { id: 'timeline', label: 'Experiences' },
  { id: 'workshops', label: 'Workshop' },
  { id: 'playground', label: 'Interactions' },
  { id: 'writing', label: 'designengineer.ing' },
  { id: 'about', label: 'About' },
]

/** Last section whose heading has scrolled to/past the top edge (mobile chrome + bottom nav). */
export function getPinnedPortfolioSection(): DePortfolioSectionId | null {
  let pinned: DePortfolioSectionId | null = null

  for (const id of SECTION_IDS) {
    const heading = document.getElementById(`${id}-heading`)
    if (!heading) continue

    if (heading.getBoundingClientRect().top <= 0) {
      pinned = id
    }
  }

  return pinned
}

export function getPortfolioSectionTitle(id: DePortfolioSectionId): string {
  return PORTFOLIO_SECTION_NAV.find((section) => section.id === id)?.label ?? id
}

export function getPortfolioSectionIndex(id: DePortfolioSectionId | null): number {
  return id ? SECTION_IDS.indexOf(id) : -1
}

/** Section whose heading is next to arrive — shown pinned in the bottom chrome teaser. */
export function getUpcomingPortfolioSection(
  pinned: DePortfolioSectionId | null
): DePortfolioSectionId | null {
  if (!pinned) return SECTION_IDS[0]
  return SECTION_IDS[SECTION_IDS.indexOf(pinned) + 1] ?? null
}

export const DE_SECTION_HREF: Record<DePortfolioSectionId, string> = {
  timeline: '/#timeline',
  playground: '/#playground',
  workshops: '/#workshops',
  writing: '/#writing',
  about: '/#about',
}

export function isDePortfolioSectionId(value: string): value is DePortfolioSectionId {
  return SECTION_IDS.includes(value as DePortfolioSectionId)
}

function getSectionScrollTarget(sectionId: DePortfolioSectionId): HTMLElement | null {
  return document.getElementById(`${sectionId}-heading`) ?? document.getElementById(sectionId)
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
  const el = getSectionScrollTarget(sectionId)
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
