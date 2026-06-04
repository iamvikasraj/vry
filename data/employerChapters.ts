export type EmployerStoryProse = { type: 'prose'; text: string }

/** Personal reflection — same look as prose; kept as its own block for writing workflow. */
export type EmployerStoryThinking = { type: 'thinking'; text: string }

/** Inline case study — appears in the story where it belongs, not only at the end. */
export type EmployerStoryProject = {
  type: 'project'
  slug: string
  /** Optional line before the card — why this work matters in the arc. */
  lead?: string
}

export type EmployerStoryBlock = EmployerStoryProse | EmployerStoryThinking | EmployerStoryProject

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
  intro?: string
  /** Story body — each item is `home-de-employer-chapter__section` */
  sections: EmployerStorySection[]
}

/** Narrative copy for company chapter pages (`/live-projects/[employer]/`). */
export const employerChapters: Record<string, EmployerChapterContent> = {
  paytm: {
    roleSummary:
      'Lead Product Designer across Paytm Lending, Paytm Travel, and Paytm Central inside the super app.',
    intro:
      'I spent three years inside the Paytm super app — not on one product, but across three PODs. Each one was a different kind of problem: credit in checkout, travel with real-world chaos, and the homepage everyone opens first. The through-line was judgment — what to simplify, what to standardize, and when to let a vertical move fast on its own.',
    sections: [
      {
        id: 'lending',
        title: 'Paytm Lending',
        blocks: [
          {
            type: 'prose',
            text: 'Postpaid and pay-later. The job wasn’t “add BNPL.” It was to make paying on credit feel as normal as UPI — limits, trust, and state visible without turning checkout into a lecture.',
          },
          {
            type: 'thinking',
            text: 'The tension I kept coming back to: marketing wanted Postpaid everywhere; risk and ops needed clarity at the moment money left the user’s account. My bias was to design for the worst state first — limit hit, pending capture, retry — because that’s when people decide if a product is “real” or a gimmick.',
          },
          {
            type: 'project',
            slug: 'paytm-postpaid',
            lead: 'Case study — making Postpaid a first-class payment method.',
          },
        ],
      },
      {
        id: 'travel',
        title: 'Paytm Travel',
        blocks: [
          {
            type: 'prose',
            text: 'Flights, hotels, and IRCTC trains in one vertical. Search, booking, and post-purchase had to stay legible when itineraries, rail rules, and partner APIs disagreed.',
          },
          {
            type: 'thinking',
            text: 'Travel taught me to separate “what the user is trying to do” from “what the system knows.” Status and next steps mattered more than visual polish — especially after booking, when anxiety is highest and support tickets are cheapest to prevent in the UI.',
          },
          {
            type: 'project',
            slug: 'paytm-travel-trains',
            lead: 'Case study — Travel & Trains from search through post-purchase.',
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
            lead: 'Case study — Design System v1.0 and platform patterns.',
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
      'Lead Product Designer at Times Bridge — Gabit D2C brand/product work and SwiftUI exploration for Business Insider India.',
    intro:
      'Times Bridge put me on two different clocks — 0→1 D2C for Gabit and a publisher-grade iOS exploration for Business Insider India. Brand-led commerce on one side, editorial density on the other. Same role, different definitions of “done.”',
    sections: [
      {
        id: 'gabit',
        title: 'Gabit',
        blocks: [
          {
            type: 'prose',
            text: 'Early-stage skincare commerce — brand, PDP, and conversion as one system. The product had to feel like Gabit from the first tap, not logo-on-template.',
          },
          {
            type: 'thinking',
            text: 'D2C work is where brand teams want expression and growth teams want frictionless checkout. I tried to lock a visual rhythm early so new screens didn’t become one-off campaigns.',
          },
          {
            type: 'project',
            slug: 'gabit-early-stage',
          },
        ],
      },
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
