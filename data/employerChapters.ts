export type EmployerStoryProse = { type: 'prose'; text: string }

/** Personal reflection — same look as prose; kept as its own block for writing workflow. */
export type EmployerStoryThinking = { type: 'thinking'; text: string }

/** Inline case study — appears in the story where it belongs, not only at the end. */
export type EmployerStoryProject = {
  type: 'project'
  slug: string
  /** Label above the project row; defaults to "Case study" in the story stream. */
  heading?: string
}

export type EmployerStorySource = {
  url: string
  /** Publication name — row title */
  outlet: string
  /** Article headline — row meta */
  headline: string
  /** Logo or cover under `public/assets/press/` */
  image?: string
}

export function pressImagePath(slug: string): string {
  return `/assets/press/${slug}.png`
}

export type EmployerStorySources = {
  type: 'sources'
  label?: string
  items: EmployerStorySource[]
}

export type EmployerStoryBlock =
  | EmployerStoryProse
  | EmployerStoryThinking
  | EmployerStoryProject
  | EmployerStorySources

/** One chapter in the stint (e.g. a POD) — spacing is controlled per section in CSS. */
export type EmployerStorySection = {
  id: string
  /** Optional label, e.g. "Paytm Lending" */
  title?: string
  blocks: EmployerStoryBlock[]
}

export type EmployerChapterContent = {
  /** SEO / meta only */
  roleSummary: string
  /** Opening paragraph(s) below the hero — `home-de-employer-chapter__intro` */
  intro?: string | string[]
  /** Story body — each item is `home-de-employer-chapter__section` */
  sections: EmployerStorySection[]
}

/** Narrative copy for company chapter pages (`/live-projects/[employer]/`). */
export const employerChapters: Record<string, EmployerChapterContent> = {
  paytm: {
    roleSummary:
      'Lead Product Designer across Paytm Lending, Paytm Travel, and Paytm Central inside the super app.',
    intro: [
      'I joined Paytm as a senior product designer on 8th October in 2018. I remember this because it was one of my dream jobs back then. I was a Paytm user from 2016 and a big advocate of the product.',
      'It was right after my stint at Grappus Studios. We used to design and develop product experiences that people used to dream of only on Dribbble.',
      'Anyway, I moved to Bengaluru and started working with a POD called Paytm Lending.',
    ],
    sections: [
      {
        id: 'lending',
        title: 'Paytm Lending',
        blocks: [
          {
            type: 'prose',
            text: 'Paytm Lending consists of products like Paytm Loans, Paytm Postpaid (BNPL), and a few credit card services. The very first project I got to work on was Paytm Postpaid.',
          },
          {
            type: 'prose',
            text: 'Paytm Postpaid was the answer to the Paytm wallet and a different answer to UPI. I’m talking about early 2019 — UPI was new to the market, and PhonePe had implemented it earlier, so we wanted to take up that space.',
          },
          {
            type: 'prose',
            text: 'My role was to design for the scale of Paytm Postpaid. We had a very hacky version that inherited Paytm’s passbook design and a simple form to apply. We used to market it as get up to ₹60,000 in spending, but it was very hard to give users a limit above ₹500–2,000',
          },
          {
            type: 'prose',
            text: 'I was able to design the MVP with all the scale features in 1.5 months, and we were able to ship.',
          },
          {
            type: 'prose',
            text: 'We did a sentiment analysis and found that most people were complaining about smaller spend limits, inconsistency with spend limits, not being able to understand the offering, where they could use it, and so on.',
          },
          {
            type: 'prose',
            text: 'So I came up with a gamification model. The idea was to increase daily active users and monthly active users on the product. We implemented logic to increment the spend limit by letting users top up — paying bills before the monthly bill was due.',
          },
          {
            type: 'prose',
            text: 'But later we got a notice from RBI that we could not lend money if we operated a bank. So we had to bring in a co-lending partner, Clix Capital, and design a new onboarding for that.',
          },
          {
            type: 'prose',
            text: 'There we needed users to link their PAN, which led to an increase in spend limit — so we had to drop the gamification idea but carried the interaction forward.',
          },
          {
            type: 'prose',
            text: 'We were able to launch and onboard 1 million active users by August 2019.',
          },
          {
            type: 'project',
            slug: 'paytm-postpaid',
          },
          {
            type: 'prose',
            text: 'By mid-2019, regulatory pressure caught up with us. A PIL in the Delhi High Court argued that Paytm Postpaid violated RBI rules for payments banks — Section 1.6 forbids them from lending to customers. Press coverage questioned whether credit could sit inside a payments bank at all, whether Clix Capital’s role was disclosed clearly enough, and whether the product should keep running while that was unresolved. Postpaid was briefly suspended in August; we had to pause the work.',
          },
          {
            type: 'prose',
            text: 'I was asked to either join the Noida Central team or the Paytm Travel team in Bengaluru. Since I was already in the Bengaluru building, I chose Paytm Travel.',
          },
          {
            type: 'sources',
            label: 'Press',
            items: [
              {
                outlet: 'Business Today',
                headline: 'Paytm Postpaid launch (Dec 2018, up to ₹60,000 limit)',
                image: pressImagePath('business-today'),
                url: 'https://www.businesstoday.in/technology/news/story/paytm-postpaid-launched-spend-up-to-rs-60000-pay-next-month-124742-2018-12-28',
              },
              {
                outlet: 'Paytm',
                headline: 'Postpaid listed under 2018 milestones',
                image: pressImagePath('paytm'),
                url: 'https://paytm.com/about-us',
              },
              {
                outlet: 'MediaNama',
                headline: 'PIL on Postpaid vs payments-bank lending rules (May 2019)',
                image: pressImagePath('medianama'),
                url: 'https://www.medianama.com/2019/05/223-petition-alleges-paytm-payments-banks-postpaid-lending-service-violates-rbi-operating-guidelines/',
              },
              {
                outlet: 'Economic Times',
                headline: 'Paytm Postpaid loan book moved to Clix Capital (Jun 2019)',
                image: pressImagePath('economic-times'),
                url: 'https://economictimes.indiatimes.com/small-biz/startups/newsbuzz/paytm-postpaid-to-move-its-loan-book-to-clix/articleshow/69920769.cms',
              },
              {
                outlet: 'Entrackr',
                headline: 'Postpaid service suspended, then clarified (Aug 2019)',
                image: pressImagePath('entrackr'),
                url: 'https://entrackr.com/2019/08/paytm-shuts-down-paytm-postpaid/',
              },
            ],
          },
        ],
      },
      {
        id: 'travel',
        title: 'Paytm Travel',
        blocks: [
          {
            type: 'project',
            slug: 'paytm-travel-trains',
          },
        ],
      },
      {
        id: 'central',
        title: 'Paytm Central',
        blocks: [
          {
            type: 'prose',
            text: 'The pod behind the main homepage and shared platform. What millions see first, and the patterns every other vertical plugs into.',
          },
          {
            type: 'thinking',
            text: 'Central is where local vs global fights actually happen. I pushed for a system that squads could adopt without feeling boxed in — enough governance to stop drift, enough flexibility that Lending and Travel didn’t fork every component.',
          },
          {
            type: 'project',
            slug: 'paytm-design-system-v1',
          },
        ],
      },
    ],
  },
  'et-money': {
    roleSummary:
      'Lead Product Designer for motion-led onboarding and core investment surfaces — Rive and SwiftUI shipped in production.',
    intro:
      'ET Money was a short, focused stint — one big bet on first-run. Finance apps fail when motion performs but doesn’t teach. My job was to make onboarding explain the product while people moved, and to keep engineering aligned so Rive and SwiftUI weren’t two separate truths.',
    sections: [
      {
        id: 'onboarding',
        title: 'Onboarding & first-run',
        blocks: [
          {
            type: 'prose',
            text: 'A new app onboarding built in Rive and shipped with SwiftUI — motion as hierarchy, not spectacle. Every beat had to answer “what should I do next?” before it asked for trust or data.',
          },
          {
            type: 'thinking',
            text: 'The fight was always time-to-value vs. brand delight. I cut loops that looked polished in review but didn’t move completion. Engineering pairs mattered — if a state machine in Rive didn’t map to SwiftUI, we fixed it in the tool, not in a handoff doc.',
          },
          {
            type: 'project',
            slug: 'etmoney-rive',
          },
        ],
      },
    ],
  },
  'loop-health': {
    roleSummary:
      'Staff Product Designer & Technologist at Loop Health — member-facing healthcare journeys with SwiftUI prototyping alongside engineering.',
    intro:
      'Loop is employer-sponsored care — not a wellness app. Members arrive with coverage, confusion, and urgency. I worked across telehealth and care pathways, with clinical and ops reality showing up in states, copy, and what we could promise on screen.',
    sections: [
      {
        id: 'doctor-on-demand',
        title: 'Doctor on Demand',
        blocks: [
          {
            type: 'prose',
            text: 'Discovery through consultation handoff — booking a doctor without making people feel like they were filling a form for insurance. The flow had to work for members and for the operations team watching queue health.',
          },
          {
            type: 'thinking',
            text: 'Healthcare UI fails when it hides uncertainty. I prototyped in SwiftUI early so “pending,” “matched,” and “in session” weren’t design fiction — engineering and clinical ops weighed in before we polished pixels.',
          },
          {
            type: 'project',
            slug: 'loop-doctor-on-demand',
          },
        ],
      },
      {
        id: 'care-journey',
        title: 'Care Journey',
        blocks: [
          {
            type: 'prose',
            text: 'Multi-step care pathways with clear status and next steps — less “where am I in this process?” and more confidence that Loop was tracking the thread, even when the backend was messy.',
          },
          {
            type: 'thinking',
            text: 'Progressive disclosure was the lever: not fewer steps, but fewer decisions per screen. The hardest calls were what to show employers vs. members — same journey, different anxiety.',
          },
          {
            type: 'project',
            slug: 'loop-care-journey',
          },
        ],
      },
    ],
  },
  'time-bridge': {
    roleSummary:
      'Lead Product Designer at Times Bridge — SwiftUI exploration for Business Insider India.',
    intro:
      'Times Bridge was publisher-grade mobile work — a SwiftUI prototype for Business Insider India to pressure-test IA, reading flows, and native affordances before the org committed to a direction.',
    sections: [
      {
        id: 'business-insider',
        title: 'Business Insider India',
        blocks: [
          {
            type: 'prose',
            text: 'A SwiftUI prototype for BI India — feed, reading view, gestures — to pressure-test what a native publisher app could feel like before the org committed to a direction.',
          },
          {
            type: 'thinking',
            text: 'Editorial apps break when product navigation competes with content hierarchy. The prototype was a way to argue with real affordances, not slides — scroll, back, save, and density that still felt intentional on a phone.',
          },
          {
            type: 'project',
            slug: 'business-insider',
          },
        ],
      },
    ],
  },
  grappus: {
    roleSummary:
      'Product Designer with Uber’s Design Technology Initiative — interaction craft and prototypes built for production constraints.',
    intro:
      'Grappus was my entry into design-tech at global scale — work with Uber DTI on interaction patterns, tooling, and prototypes that engineering could actually use. Less hero concept, more “can this ship?”',
    sections: [
      {
        id: 'dti',
        title: 'Uber DTI',
        blocks: [
          {
            type: 'prose',
            text: 'Prototyping and interaction work for DTI-led experiments — motion, components, and flows that matched how Uber ships, not a separate design fantasy layer.',
          },
          {
            type: 'thinking',
            text: 'DTI is only useful if squads adopt it. I cared about documentation and defaults — the moment a pattern needs a designer in the room every time, it won’t scale across teams.',
          },
          {
            type: 'project',
            slug: 'uber-dti',
          },
        ],
      },
    ],
  },
}

export function getEmployerChapter(slug: string): EmployerChapterContent | undefined {
  return employerChapters[slug]
}

export function sectionProjectSlugs(blocks: EmployerStoryBlock[]): string[] {
  return blocks
    .filter((block): block is EmployerStoryProject => block.type === 'project')
    .map((block) => block.slug)
}

export function chapterProjectSlugs(chapter: EmployerChapterContent): string[] {
  return chapter.sections.flatMap((section) => sectionProjectSlugs(section.blocks))
}
