export type TimelinePlaceholder = {
  /** Global project id — 1 is oldest, increments across all years. */
  id: number
  year: string
  slug: string
}

const TIMELINE_START_YEAR = 2016

function buildTimelinePlaceholders(): TimelinePlaceholder[] {
  const endYear = new Date().getFullYear()
  const items: TimelinePlaceholder[] = []
  let id = 1

  for (let year = TIMELINE_START_YEAR; year <= endYear; year++) {
    for (let slot = 1; slot <= 2; slot++) {
      items.push({
        id,
        year: String(year),
        slug: `timeline-${year}-${slot}`,
      })
      id++
    }
  }

  return items
}

export const timelinePlaceholders: TimelinePlaceholder[] = buildTimelinePlaceholders()

export function getTimelineYears(): number[] {
  const endYear = new Date().getFullYear()
  const years: number[] = []
  for (let y = endYear; y >= TIMELINE_START_YEAR; y -= 1) years.push(y)
  return years
}

export function getTimelineProjectsForYear(year: number): TimelinePlaceholder[] {
  return timelinePlaceholders.filter((p) => Number(p.year) === year)
}
