import { timingSafeEqual } from 'node:crypto'

/**
 * SERVER-ONLY. Confidential case-study content for NDA projects.
 *
 * This module must never be imported by a page or client component — it is read
 * only by the Netlify Function (`netlify/functions/nda-unlock.ts`) in production
 * and the Next route handler (`app/api/nda-unlock/route.ts`) in dev. Keeping it
 * out of the component graph is what stops the content from shipping in the
 * static `out/` bundle.
 *
 * The password lives in the `NDA_PASSWORD` env var (Netlify → Environment
 * variables, scoped to Functions). Edit the HTML below to match exactly what
 * you're cleared to share.
 */

export type NdaEntry = {
  title: string
  /** Trusted, hand-authored HTML injected into `.project-content`. */
  html: string
}

const ndaFooter = `
  <p class="project-section-text"><em>This page is shared privately. Please keep specifics confidential per the NDA.</em></p>
`

const NDA_CONTENT: Record<string, NdaEntry> = {
  'paytm-postpaid': {
    title: 'Paytm Postpaid',
    html: `
      <div class="mdx-content">
        <h2 class="project-section-title">The problem</h2>
        <p class="project-section-text">Buy Now Pay Later inside Paytm had to feel as simple as UPI — not a separate lending product buried in a super app.</p>
        <p class="project-section-text">When I joined in late 2018, BNPL was new in India. Most users didn’t know what Postpaid was or when they had to repay. Paytm already had recharges, travel, movies, and more. The opportunity was to make Postpaid the <strong>default way to pay</strong> in that ecosystem.</p>
        <h2 class="project-section-title">What I owned</h2>
        <p class="project-section-text">As Lead Product Designer, I led Paytm Postpaid from early concept through scale — checkout, repayment, education, and the home dashboard that made limits and balances legible. We designed for use cases at Paytm’s scale: checkout, repayment, and making Postpaid the main payment method in-app.</p>
        <h2 class="project-section-title">Research</h2>
        <p class="project-section-text">We scanned Twitter and YouTube (core audience 16–24). People asked what “Shop now, Pay Later” even was, hit low limits fast, and were frustrated when rejected without a clear reason.</p>
        <p class="project-section-text"><strong>Focus:</strong> simplicity, education, and clear limit information — not another financial product with its own language.</p>
        <h2 class="project-section-title">A decision that stuck</h2>
        <p class="project-section-text">Most flows were fine; the home dashboard was not. I sketched on paper and explored wireframes for the home experience.</p>
        <p class="project-section-text">I used a <strong>bottle metaphor</strong> — total limit as the bottle, available balance as the water level. The shipped dashboard centered on spend limit, pay early, FAQ, and help. Full gamification did not ship, but the team kept the visual spend-and-repay idea.</p>
        <h2 class="project-section-title">Results</h2>
        <p class="project-section-text">Postpaid scaled to <strong>1M+ users in six months</strong>. Clearer limit and repayment UI across onboarding, spend, and account settings — with motion to explain the product in marketing and internal reviews.</p>
        <h2 class="project-section-title">What I learned</h2>
        <h3 class="project-section-subtitle">Design for use cases, not personas</h3>
        <p class="project-section-text">At Paytm’s scale, checkout vs. repayment vs. education were the real journeys — not demographic slices.</p>
        <h3 class="project-section-subtitle">Metaphors beat feature lists for limits</h3>
        <p class="project-section-text">The bottle idea gave members an instant mental model for available credit — faster than paragraphs about eligibility.</p>
        ${ndaFooter}
      </div>
    `,
  },
  'paytm-travel-trains': {
    title: 'Paytm Travel',
    html: `
      <div class="mdx-content">
        <h2 class="project-section-title">The problem</h2>
        <p class="project-section-text">Flights, hotels, and IRCTC train booking inside Paytm — search, booking, and ticket management at super-app scale. Members expected Paytm-simple checkout; trains brought IRCTC constraints, waitlists, and status anxiety that generic commerce patterns didn’t cover.</p>
        <h2 class="project-section-title">What I owned</h2>
        <p class="project-section-text">As Lead Product Designer, I led design for Paytm Travel and Trains — high-volume verticals with complex itineraries, IRCTC rules, and clear status from search through post-purchase.</p>
        <h2 class="project-section-title">The system</h2>
        <h3 class="project-section-subtitle">Search and results</h3>
        <p class="project-section-text">Structured discovery for flights, hotels, and train routes — filters and results that worked at volume without overwhelming first-time bookers.</p>
        <h3 class="project-section-subtitle">Booking funnels</h3>
        <p class="project-section-text">Progressive disclosure for multi-step trips. Fewer decisions per screen when itineraries got complex.</p>
        <h3 class="project-section-subtitle">Train flows</h3>
        <p class="project-section-text">PNR, seat selection, waitlist, and refund states with explicit status — trains fail when members don’t know where they are in the IRCTC lifecycle.</p>
        <h2 class="project-section-title">Results</h2>
        <p class="project-section-text">Shipped travel and train booking patterns adopted across Paytm’s commerce stack — aligned with the Paytm design system as verticals scaled.</p>
        <h2 class="project-section-title">What I learned</h2>
        <h3 class="project-section-subtitle">Status is the product in trains</h3>
        <p class="project-section-text">Waitlist, PNR, and refund states needed as much design attention as search — anxiety lives after the tap.</p>
        <h3 class="project-section-subtitle">Super-app patterns don’t transplant cleanly</h3>
        <p class="project-section-text">IRCTC constraints forced bespoke flows. The design system had to flex without breaking commerce elsewhere.</p>
        ${ndaFooter}
      </div>
    `,
  },
  'paytm-design-system-v1': {
    title: 'Paytm Design System',
    html: `
      <div class="mdx-content">
        <h2 class="project-section-title">The problem</h2>
        <p class="project-section-text">Paytm was dozens of product squads shipping fast — postpaid, travel, trains, recharge, and more. Without shared foundations, every vertical reinvented buttons, spacing, and error states. Velocity looked high; consistency and engineering cost didn’t.</p>
        <h2 class="project-section-title">What I owned</h2>
        <p class="project-section-text">As Lead Product Designer, I built <strong>Paytm Design System V1.0</strong> — foundational components, interaction patterns, and documentation so squads could ship without one-off UI debates in every review.</p>
        <h2 class="project-section-title">The system</h2>
        <h3 class="project-section-subtitle">Audit and scope</h3>
        <p class="project-section-text">Mapped inconsistent patterns across verticals — what repeated, what was truly unique, and what was drift.</p>
        <h3 class="project-section-subtitle">Core components</h3>
        <p class="project-section-text">Typography, spacing, and component APIs for iOS and Android — enough structure to align, enough flexibility for commerce edge cases.</p>
        <h3 class="project-section-subtitle">Governance</h3>
        <p class="project-section-text">Usage guidelines and engineering partnership so adoption wasn’t a PDF — it was how squads actually built.</p>
        <h2 class="project-section-title">Results</h2>
        <p class="project-section-text">V1 became the shared layer as new verticals — travel, trains, postpaid — shipped. Fewer redundant patterns, faster handoffs, and a common language between design and engineering at scale.</p>
        <h2 class="project-section-title">What I learned</h2>
        <h3 class="project-section-subtitle">Systems only work when squads adopt them</h3>
        <p class="project-section-text">Documentation without eng pairing and defaults in code doesn’t scale — the moment a pattern needs a designer in every room, it’s already losing.</p>
        <h3 class="project-section-subtitle">Verticals stress-test the system</h3>
        <p class="project-section-text">Trains and BNPL exposed gaps early — better than discovering them after fifty screens shipped.</p>
        ${ndaFooter}
      </div>
    `,
  },
}

/** Whether a password has been configured for the environment. */
export function isNdaConfigured(): boolean {
  return Boolean(process.env.NDA_PASSWORD && process.env.NDA_PASSWORD.length > 0)
}

/** Constant-time password comparison; false when unset or mismatched. */
export function verifyNdaPassword(input: unknown): boolean {
  const expected = process.env.NDA_PASSWORD
  if (!expected || typeof input !== 'string' || input.length === 0) return false
  const a = Buffer.from(input)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function getNdaEntry(slug: unknown): NdaEntry | null {
  if (typeof slug !== 'string') return null
  return NDA_CONTENT[slug] ?? null
}

export const NDA_ENV_MISSING_MESSAGE =
  'Protected pages are not configured yet (missing NDA_PASSWORD).'
