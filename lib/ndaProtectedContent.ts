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

const NDA_CONTENT: Record<string, NdaEntry> = {
  'paytm-postpaid': {
    title: 'Paytm Postpaid',
    html: `
      <div class="project-section">
        <p class="project-description">Buy Now Pay Later inside Paytm — making postpaid the default payment method across the super app. Scaled to 1M+ users in six months.</p>
      </div>
      <div class="project-section">
        <h2 class="project-section-title">Context</h2>
        <p class="project-section-text">Led design for Paytm Postpaid — scaling BNPL to 1M+ users in six months and embedding lending as a default payment path across the super app.</p>
      </div>
      <div class="project-section">
        <h2 class="project-section-title">Process</h2>
        <ul class="project-process-list">
          <li class="project-process-item">Designed checkout and repayment flows that made postpaid feel native to Paytm payments</li>
          <li class="project-process-item">Balanced credit limits, eligibility, and trust signals for first-time BNPL users</li>
          <li class="project-process-item">Partnered with product and engineering through rapid iteration as adoption scaled</li>
        </ul>
      </div>
      <div class="project-section">
        <p class="project-section-text"><em>This page is shared privately. Please keep specifics confidential per the NDA.</em></p>
      </div>
    `,
  },
  'paytm-travel-trains': {
    title: 'Paytm Travel',
    html: `
      <div class="project-section">
        <p class="project-description">Flights, hotels, and IRCTC train booking inside Paytm — search, booking, and ticket management at super-app scale.</p>
      </div>
      <div class="project-section">
        <h2 class="project-section-title">Context</h2>
        <p class="project-section-text">Led design for Paytm Travel and Trains — high-volume booking verticals with complex itineraries, IRCTC constraints, and clear status from search through post-purchase.</p>
      </div>
      <div class="project-section">
        <h2 class="project-section-title">Process</h2>
        <ul class="project-process-list">
          <li class="project-process-item">Structured search and results for flights, hotels, and train routes</li>
          <li class="project-process-item">Designed booking funnels with progressive disclosure for complex trips</li>
          <li class="project-process-item">Built train flows for PNR, seat selection, waitlist, and refunds</li>
          <li class="project-process-item">Aligned patterns with the Paytm design system across commerce verticals</li>
        </ul>
      </div>
      <div class="project-section">
        <p class="project-section-text"><em>This page is shared privately. Please keep specifics confidential per the NDA.</em></p>
      </div>
    `,
  },
  'paytm-design-system-v1': {
    title: 'Paytm Design System',
    html: `
      <div class="project-section">
        <p class="project-description">First-generation Paytm design system — components, patterns, and documentation for product teams at scale.</p>
      </div>
      <div class="project-section">
        <h2 class="project-section-title">Context</h2>
        <p class="project-section-text">Built Paytm Design System V1.0 to unify dozens of product squads — foundational components, interaction patterns, and governance as the app scaled.</p>
      </div>
      <div class="project-section">
        <h2 class="project-section-title">Process</h2>
        <ul class="project-process-list">
          <li class="project-process-item">Audited inconsistent UI patterns across Paytm verticals</li>
          <li class="project-process-item">Defined core components, typography, and spacing for iOS and Android</li>
          <li class="project-process-item">Documented usage guidelines and partnered with engineering on adoption</li>
          <li class="project-process-item">Evolved the system as new verticals — travel, trains, postpaid — shipped</li>
        </ul>
      </div>
      <div class="project-section">
        <p class="project-section-text"><em>This page is shared privately. Please keep specifics confidential per the NDA.</em></p>
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
