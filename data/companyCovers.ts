export type CompanyCoverSection = {
  id: string
  /** Company or section name — shown large on collapsible headers */
  title: string
  /** Role at the company — smaller line below the name */
  role?: string
  /** Years at the company — smaller line below the name */
  period?: string
  paragraphs: string[]
  /** Projects tied to this chapter of the story */
  projects?: CompanyCoverProjectRef[]
  /** Company stints collapse; reflection sections stay open */
  collapsible?: boolean
  /** Initial open state for collapsible sections */
  defaultOpen?: boolean
}

export type CompanyCoverProjectRef = {
  slug: string
  /** Impact line on the project row */
  note?: string
}

export type CompanyCover = {
  /** URL segment — share as `/for/[slug]/` */
  slug: string
  /** Company or team name shown in the letterhead */
  companyName: string
  roleTitle?: string
  location?: string
  /** First beat of the letter — why you're writing */
  opening: string | string[]
  /** Themed body sections — the argument, not a résumé dump */
  sections: CompanyCoverSection[]
  /** Sign-off before the CTA */
  closing?: string
  cta?: {
    label: string
    /** External link; omit for built-in email button */
    href?: string
  }
}

/**
 * Unlisted cover pages — not linked from the public site.
 * Add an entry per company; share the URL directly (e.g. `/for/acme/`).
 */
export const companyCovers: CompanyCover[] = [
  {
    slug: 'acko',
    companyName: 'ACKO',
    roleTitle: 'Director of Product Design',
    location: 'Bengaluru',
    opening: [
      'Over ten years I’ve led product design at Paytm, HDFC, and ET Money. I still ship production code on mobile and web and work day to day with engineers. I set direction clearly, then stay in the work—not reviewing from a distance.',
      'I’m a Rive and Play ambassador in India. I pick up motion, interaction craft, and design engineering early—often before those skills are on every job post—and I’ve taught that work at IIT Delhi, Subko, and inside product teams. At Loop I moved the design org onto Cursor with Figma MCP. I like building that muscle in a team before the industry catches up.',
      'Below is my work, newest first—the projects that best show how I think.',
    ],
    sections: [
      {
        id: 'loop',
        title: 'Loop Health',
        role: 'Staff Product Designer & Technologist',
        period: '2025–now',
        collapsible: true,
        defaultOpen: true,
        paragraphs: [
          'Members arrive with coverage, confusion, and urgency — not unlike fintech or insurance, honestly.',
          'Launched Doctor on Demand — 30% more bookings when the flow stopped feeling like paperwork. I brought the design team onto Cursor with Figma MCP, wrote production PRs for our HRD site, and I’m design-engineering an AI chat experience on the app (in testing), with voice experiments on the side.',
        ],
        projects: [
          {
            slug: 'loop-doctor-on-demand',
            note: '30% more bookings — booking a doctor without the insurance-form feeling.',
          },
          {
            slug: 'loop-ai-assistant',
            note: 'AI chat on the app — in testing; design-engineered with the team.',
          },
        ],
      },
      {
        id: 'et-money',
        title: 'ET Money',
        role: 'Principal Product Designer',
        period: '2024–2025',
        collapsible: true,
        paragraphs: [
          'Finance apps are full of compliance and not much user patience — investing, insurance, money management. I mentored a team of four and ran weekly design critiques.',
          'Redesigned goal-based investing — 8% lift in investment completions. Integrated Rive and SwiftUI into onboarding and first-run. Worked with product marketing to tie design metrics to business KPIs.',
        ],
        projects: [
          {
            slug: 'etmoney-rive',
            note: '8% lift in investment completions — motion that teaches, not decorates.',
          },
          {
            slug: 'et-money-1',
            note: 'Onboarding across investing and insurance under compliance.',
          },
        ],
      },
      {
        id: 'times-bridge',
        title: 'Times Bridge',
        role: 'Product Design Consultant',
        period: '2022–2024',
        collapsible: true,
        paragraphs: [
          'Consulting across media brands entering India — Smule, Business Insider, and others. Token-based design systems, localized product strategy, and a lot of “will this work for Indian users?” before anyone committed to build.',
          'Built a SwiftUI prototype for Business Insider India to pressure-test IA and reading flows before the org picked a direction.',
        ],
        projects: [
          {
            slug: 'business-insider',
            note: 'SwiftUI prototype for BI India — publisher-grade mobile before the org committed.',
          },
        ],
      },
      {
        id: 'hdfc',
        title: 'HDFC Bank',
        role: 'UX Design Manager',
        period: '2021–2022',
        collapsible: true,
        paragraphs: [
          'Banking, regulated — every screen had to earn trust before it asked for anything.',
          'I led design on PayZapp — 5M+ users, 4.8★ on the store. Ran workshops on Figma and design process across teams. Same lesson as everywhere else: clarity before chrome.',
        ],
      },
      {
        id: 'paytm',
        title: 'Paytm',
        role: 'Lead Product Designer',
        period: '2018–2021',
        collapsible: true,
        paragraphs: [
          'I joined Paytm on 8th October 2018. I remember the date because it was a dream job — I’d been a Paytm user since 2016. I started in Paytm Lending, and the first project I got was Postpaid.',
          'We had a hacky version that inherited the passbook design. People didn’t trust the limits, didn’t get the product, didn’t know where they could use it. We changed the framing — not just the screens. Postpaid eventually scaled to 8M+ customers and 15M+ merchants. Then RBI rules shifted and we had to rethink onboarding again. I learned early that the UI is rarely the actual problem.',
          'I built Paytm’s first design system — unified language across 10+ verticals for 350M+ users — and worked on Trains, where we cut drop-offs by 8% through better navigation and form defaults.',
        ],
        projects: [
          {
            slug: 'paytm-postpaid',
            note: '8M+ customers — reframed trust and spend limits, not just the screens.',
          },
          {
            slug: 'paytm-travel-trains',
            note: '8% fewer drop-offs on India’s largest private train booking flow.',
          },
        ],
      },
      {
        id: 'grappus',
        title: 'Grappus',
        role: 'Product Designer',
        period: '2017–2018',
        collapsible: true,
        paragraphs: [
          'My first real stint after college — Grappus Studios, an agency where we designed and built products that used to live only on Dribbble. I worked with the Uber India team on driver onboarding, referral flows, and training tools across 15+ metros.',
          'It’s where I learned to design for production — not hero screens, but flows engineers could actually ship. I left for Paytm in October 2018, but Grappus is where the craft-and-code habit started.',
        ],
      },
    ],
    closing:
      'I’m in Bengaluru and I’ve led design teams before. I still care most about whether we’re solving the right problem — happy to go deeper on any of this.',
    cta: { label: 'Email me' },
  },
  {
    slug: 'sample',
    companyName: 'Your team',
    roleTitle: 'Staff product design & design engineering',
    location: 'Bengaluru',
    opening:
      'Thanks for taking a look — this page is a focused snapshot of work most relevant to what you’re building.',
    sections: [
      {
        id: 'what-i-do',
        title: 'What I do',
        collapsible: false,
        paragraphs: [
          'I’m a staff product designer and design technologist in Bengaluru, shipping native-first products at the intersection of design, motion, and engineering.',
        ],
      },
      {
        id: 'strengths',
        title: 'Relevant strengths',
        collapsible: true,
        defaultOpen: true,
        paragraphs: [
          'Native iOS flows prototyped in SwiftUI before engineering handoff. Motion-led interaction design with Rive in production. Healthcare and fintech experience at scale.',
        ],
        projects: [{ slug: 'loop-doctor-on-demand' }, { slug: 'loop-ai-assistant' }],
      },
    ],
    cta: { label: 'Email me' },
  },
]

export function getCompanyCoverBySlug(slug: string): CompanyCover | undefined {
  return companyCovers.find((cover) => cover.slug === slug)
}

export function getCompanyCoverSlugs(): string[] {
  return companyCovers.map((cover) => cover.slug)
}
