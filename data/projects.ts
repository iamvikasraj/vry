export type ProjectCategory = 'Work' | 'Design Engineering'

export interface Project {
  slug: string
  title: string
  video: string
  /** Hero / grid thumbnail when set (e.g. converted from camera RAW) */
  coverImage?: string
  /** Additional images shown in the case study gallery */
  images?: string[]
  description: string
  tags: string[]
  category: ProjectCategory
  hidden?: boolean
  featured?: boolean
  metaLabel?: string
  year?: string
  client?: string
  role?: string
  context?: string
  process?: string[]
  results?: string
  /** Design / craft tools shown in project meta (optional) */
  tools?: string[]
}

export const projects: Project[] = [
  {
    slug: 'loop-doctor-on-demand',
    title: 'Loop Health — Doctor on Demand',
    video: '/assets/video/loop-doctor-on-demand.mp4',
    description: 'Telehealth experience for booking and connecting with doctors on demand within the Loop Health app.',
    tags: ['Live Projects', 'Healthcare'],
    category: 'Work',
    year: '2025',
    client: 'Loop Health',
    role: 'Staff Product Designer & Technologist',
    context: 'Designed the end-to-end Doctor on Demand flow — from discovery and booking to consultation handoff — for Loop Health members and their employers.',
    process: [
      'Mapped member and employer journeys for on-demand care',
      'Prototyped key flows in SwiftUI for rapid iteration with engineering',
      'Refined booking, wait-time, and consultation states with the product team',
      'Shipped production-ready patterns across iOS and web surfaces'
    ]
  },
  {
    slug: 'loop-care-journey',
    title: 'Loop Health — Care Journey',
    video: '/assets/video/loop-care-journey.mp4',
    description: 'Care pathway experience that guides members through their health journey with clear status and next steps.',
    tags: ['Live Projects', 'Healthcare', 'SwiftUI'],
    category: 'Work',
    year: '2025',
    client: 'Loop Health',
    role: 'Staff Product Designer & Technologist',
    context: 'Built the Care Journey feature to help members understand where they are in their care plan and what to do next — reducing confusion in a complex healthcare product.',
    process: [
      'Synthesized care pathway requirements with clinical and ops stakeholders',
      'Designed progressive disclosure for multi-step care flows',
      'Prototyped interactions in SwiftUI to validate timing and hierarchy',
      'Aligned design system components with engineering for scale'
    ]
  },
  {
    slug: 'loop-dependent-invite',
    title: 'Loop Health — Dependent Invite',
    video: '/assets/video/loop-dependent-invite.mp4',
    description: 'Flow for employees to invite and onboard dependents onto their Loop Health benefits plan.',
    tags: ['Live Projects', 'Healthcare'],
    category: 'Work',
    hidden: true,
    year: '2026',
    client: 'Loop Health',
    role: 'Staff Product Designer & Technologist',
    context: 'Designed the Dependent Invite experience so employees can add family members to their corporate health plan with minimal friction and clear verification steps.',
    process: [
      'Audited existing invite and enrollment pain points',
      'Designed invite, verification, and onboarding states',
      'Prototyped edge cases — expired invites, partial completion, re-send',
      'Collaborated with engineering on API constraints and error handling'
    ]
  },
  {
    slug: 'business-insider',
    title: 'Business Insider Prototype with SwiftUI',
    video: '/assets/video/Business Insider Prototype with SwiftUI.mp4',
    description:
      'SwiftUI prototype of the Business Insider India app — editorial layout, navigation, and reading experience for Times Bridge.',
    tags: ['Live Projects', 'SwiftUI'],
    category: 'Work',
    metaLabel: 'App Redesign · SwiftUI',
    year: '2024',
    client: 'Times Bridge',
    role: 'Lead Product Designer',
    context:
      'Built a high-fidelity SwiftUI prototype of the Business Insider app while at Times Bridge — validating IA, component structure, and motion for a publisher-grade mobile experience.',
    process: [
      'Audited Business Insider mobile patterns and editorial hierarchy',
      'Designed component structure and navigation in SwiftUI',
      'Prototyped key reading and discovery flows',
      'Refined interactions and transitions for handoff',
    ],
  },
  {
    slug: 'interactive-balloons',
    title: 'Interactive Balloons with Rive and SwiftUI for the Contra Challenge',
    video: '/assets/video/Interactive Balloons with Rive and Swiftui for the Contra challenge.mp4',
    description: 'Interactive balloons animation created with Rive and SwiftUI for the Contra challenge.',
    tags: ['Rive', 'SwiftUI', 'Contra'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer & Developer',
    context: 'Created an interactive balloons animation using Rive and SwiftUI as part of the Contra challenge.',
    process: [
      'Designed balloon interaction concept',
      'Created animations in Rive',
      'Integrated with SwiftUI',
      'Refined interactions and timing'
    ]
  },
  {
    slug: 'etmoney-rive',
    title: 'ET Money — New App Onboarding with Rive & SwiftUI',
    video: '/assets/video/Et money onboarding with Rive & SwiftUI.mp4',
    description:
      'New app onboarding for ET Money — a motion-led first-run experience built in Rive and shipped with SwiftUI.',
    tags: ['Live Projects', 'Rive', 'SwiftUI'],
    category: 'Work',
    metaLabel: 'App Design · Rive & SwiftUI',
    year: '2024',
    client: 'ET Money',
    role: 'Lead Product Designer',
    context:
      'Led Rive-driven onboarding and microinteraction work for ET Money — from first-run education through delightful feedback across core investment surfaces.',
    process: [
      'Researched onboarding pain points and key interaction moments in the journey',
      'Prototyped onboarding and micro-animations in Rive',
      'Iterated with user testing and engineering on timing and hierarchy',
      'Integrated motion with SwiftUI for production rollout',
    ],
    results: 'Improved onboarding completion rate by 47% and reduced time-to-value for new users.',
  },
  {
    slug: 'gabit-early-stage',
    title: 'Gabit - Early Stage Branding and Product Experiences',
    video: '/assets/video/gabit-branding.mp4',
    coverImage: '/assets/projects/gabit-early-stage/cover.svg',
    description:
      'Early-stage brand identity and product experiences for Gabit — visual system, PDP storytelling, and conversion-focused skincare commerce.',
    tags: ['Branding', 'E-commerce'],
    category: 'Work',
    hidden: true,
    metaLabel: 'Branding · Product Design',
    year: '2022',
    client: 'Gabit',
    role: 'Lead Product Designer',
    context:
      'Led Gabit\'s early D2C skincare work — from brand identity through product detail experiences that connected storytelling, ingredients, and purchase flow.',
    process: [
      'Researched brand positioning in the D2C skincare market',
      'Delivered logo, palette, typography, and application guidelines',
      'Structured PDP hierarchy for ingredients, benefits, and social proof',
      'Applied the brand system across photography, type, and CTAs',
    ],
  },
  {
    slug: 'paytm-postpaid',
    title: 'Paytm Postpaid',
    video: '/assets/video/paytm-postpaid.mp4',
    coverImage: '/assets/projects/paytm-postpaid/02.jpg',
    description: 'Buy Now Pay Later inside Paytm — making postpaid the default payment method across the super app.',
    tags: ['Live Projects', 'FinTech'],
    category: 'Work',
    featured: true,
    metaLabel: 'App Design',
    year: '2018–2019',
    client: 'Paytm',
    role: 'Lead Product Designer',
    tools: ['Pen & Paper', 'Sketch', 'Illustrator', 'After Effects'],
  },
  {
    slug: 'paytm-travel-trains',
    title: 'Paytm — Travel & Trains',
    video: '/assets/video/paytm-travel.mp4',
    description:
      'Flights, hotels, and IRCTC train booking inside Paytm — search, booking, and ticket management at super-app scale.',
    tags: ['Live Projects', 'FinTech'],
    category: 'Work',
    metaLabel: 'App Design',
    year: '2019–2020',
    client: 'Paytm',
    role: 'Lead Product Designer',
    context:
      'Led design for Paytm Travel and Trains — high-volume booking verticals with complex itineraries, IRCTC constraints, and clear status from search through post-purchase.',
    process: [
      'Structured search and results for flights, hotels, and train routes',
      'Designed booking funnels with progressive disclosure for complex trips',
      'Built train flows for PNR, seat selection, waitlist, and refunds',
      'Aligned patterns with the Paytm design system across commerce verticals',
    ],
  },
  {
    slug: 'paytm-design-system-v1',
    title: 'Paytm Design System V1.0',
    video: '/assets/video/paytm-design-system-v1.mp4',
    description: 'First-generation Paytm design system — components, patterns, and documentation for product teams at scale.',
    tags: ['Live Projects', 'Design Systems'],
    category: 'Work',
    metaLabel: 'Design System',
    year: '2018–2021',
    client: 'Paytm',
    role: 'Lead Product Designer',
    context: 'Built Paytm Design System V1.0 to unify dozens of product squads — foundational components, interaction patterns, and governance as the app scaled.',
    process: [
      'Audited inconsistent UI patterns across Paytm verticals',
      'Defined core components, typography, and spacing for iOS and Android',
      'Documented usage guidelines and partnered with engineering on adoption',
      'Evolved the system as new verticals — travel, trains, postpaid — shipped'
    ]
  },
  {
    slug: 'uber-dti',
    title: 'Uber DTI',
    video: '/assets/video/uber-dti.mp4',
    description: 'Design technology work with Uber DTI — tooling, prototypes, and interaction design.',
    tags: ['Live Projects'],
    category: 'Work',
    metaLabel: 'DTI',
    year: '2017',
    client: 'Uber',
    role: 'Product Designer',
    context: 'Contributed to Uber DTI initiatives in 2017 — design technology, prototyping, and interaction craft for product teams.',
    process: [
      'Collaborated with design and engineering on DTI-led experiments',
      'Prototyped interaction patterns and design tooling workflows',
      'Documented patterns for handoff across product surfaces',
      'Shipped design work aligned with Uber\'s mobile product standards'
    ]
  },
  {
    slug: 'zomato-weather',
    title: 'Zomato Weather Concept with Rive and Play',
    video: '/assets/video/Zomato Weather concept with rive and play.mp4',
    description: 'A weather concept design for Zomato using Rive and Play.',
    tags: ['Rive', 'Play'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer & Prototyper',
    context: 'Conceptual design exploring weather integration in food delivery apps.',
    process: [
      'Researched weather-based use cases',
      'Designed interaction flows',
      'Prototyped with Rive and Play',
      'Refined animations and transitions'
    ]
  },
  {
    slug: 'drag-and-order',
    title: 'Drag & Drop Interaction with Figma and Play',
    video: '/assets/video/drag and order.mp4',
    description: 'Just tested a drag & drop interaction using Figma and Play! It took me 10 minutes to complete the process and an additional hour to record and edit the session.',
    tags: ['Play', 'Figma', 'Prototyping', 'iOS'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer & Prototyper',
    context: 'Explored drag & drop interactions using Figma and Play, demonstrating how quickly interactive prototypes can be created with these tools.',
    process: [
      'Designed interface in Figma with proper auto-layout',
      'Copied and pasted designs into Play',
      'Created drag & drop interaction in Play',
      'Recorded and edited the session for sharing'
    ]
  },
  {
    slug: 'cred-bottom-navigation',
    title: 'CRED Bottom Navigation Recreation with SwiftUI and Rive',
    video: '/assets/video/CRED Bottom Navigation recreation with SwiftUI and Rive.mp4',
    description: 'A recreation of CRED\'s bottom navigation, representing closure to a cycle started in 2023. This project demonstrates that good design is not expensive to make but takes care and understanding of the basics.',
    tags: ['SwiftUI', 'Rive', 'CRED'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer & Developer',
    context: 'Back in 2014, I stumbled upon UX Design and fell in love with it. This recreation of CRED\'s bottom navigation is closure to a cycle I started in 2023, showing that good design is accessible to everyone who cares about the basics.',
    process: [
      'Analyzed CRED\'s bottom navigation design',
      'Recreated the interaction using SwiftUI and Rive',
      'Focused on understanding the design fundamentals',
      'Demonstrated that quality design is about care, not cost'
    ]
  },
  {
    slug: 'twitter-popular',
    title: 'Twitter Popular Interaction with Rive',
    video: '/assets/video/Twitter popular interaction with Rive.mp4',
    description: 'Recreating Twitter\'s popular interaction using Rive animation.',
    tags: ['Rive'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer & Prototyper',
    context: 'Explored recreating Twitter\'s popular interaction pattern using Rive for learning and experimentation.',
    process: [
      'Analyzed Twitter\'s interaction pattern',
      'Prototyped animation in Rive',
      'Refined timing and easing',
      'Shared with design community'
    ]
  },
  {
    slug: 'youtube-splash',
    title: 'Youtube Splash Animation with Lottie and SwiftUI',
    video: '/assets/video/Youtube Splash Animation with Lottie and SwiftUI.mp4',
    description: 'Splash screen animation for YouTube using Lottie and SwiftUI.',
    tags: ['SwiftUI', 'Lottie'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer & Developer',
    context: 'Explored creating splash animations using Lottie in SwiftUI for iOS apps.',
    process: [
      'Designed splash animation concept',
      'Created animation in Lottie',
      'Integrated with SwiftUI',
      'Refined timing and transitions'
    ]
  },
  {
    slug: 'ios-slider',
    title: 'iOS Slider with Data Binding in Rive',
    video: '/assets/video/iOS slider with data binding in rive.mp4',
    description: 'Interactive iOS slider component with data binding using Rive.',
    tags: ['Rive', 'SwiftUI'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer & Developer',
    context: 'Built an interactive slider component with real-time data binding in Rive.',
    process: [
      'Designed slider interaction',
      'Set up data binding in Rive',
      'Integrated with SwiftUI',
      'Tested interactions and feedback'
    ]
  },
  {
    slug: 'rive-button',
    title: 'Rive Interactive Button',
    video: '/assets/video/Rive Interactive Button.mp4',
    description: 'Interactive button component created with Rive.',
    tags: ['Rive'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer',
    context: 'Explored creating interactive button states and feedback with Rive.',
    process: [
      'Designed button states and interactions',
      'Created animations in Rive',
      'Refined hover and click feedback',
      'Shared component with community'
    ]
  },
  {
    slug: 'perplexity-interaction-1',
    title: 'Perplexity Interaction with Play -1',
    video: '/assets/video/Perplexity Interaction with play-1.mp4',
    description: 'Recreating Perplexity\'s interaction patterns using Play.',
    tags: ['Play'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer & Prototyper',
    context: 'Explored Perplexity\'s interaction design and recreated key patterns using Play.',
    process: [
      'Analyzed Perplexity\'s interface',
      'Identified key interaction patterns',
      'Prototyped with Play',
      'Refined animations'
    ]
  },
  {
    slug: 'perplexity-interaction-2',
    title: 'Perplexity Interaction with Play -2',
    video: '/assets/video/Perplexity Interaction with play-2.mp4',
    description: 'An in-depth exploration of Perplexity interactions using Play.',
    tags: ['Play'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer & Prototyper',
    context: 'Deep dive into Perplexity\'s interaction design with more detailed implementation.',
    process: [
      'Analyzed complex interaction flows',
      'Prototyped detailed interactions',
      'Refined micro-animations',
      'Documented patterns and learnings'
    ]
  },
  {
    slug: 'notion-ai',
    title: 'Notion AI with Rive and Play',
    video: '/assets/video/Notion AI with Rive and Play.mp4',
    description: 'Conceptual design for Notion AI features using Rive and Play.',
    tags: ['Rive', 'Play'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer & Prototyper',
    context: 'Explored AI interaction patterns in Notion and created conceptual prototypes.',
    process: [
      'Researched Notion AI features',
      'Designed interaction concepts',
      'Prototyped with Rive and Play',
      'Refined animations and feedback'
    ]
  },
  {
    slug: 'interactive-clock',
    title: 'Interactive Rive Clock with Adobe Firefly',
    video: '/assets/video/Interactive Rive Clock with Adobe firefly.mp4',
    description: 'Interactive clock component combining Rive animations with Adobe Firefly.',
    tags: ['Rive'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer & Prototyper',
    context: 'Explored combining Rive animations with AI-generated visuals from Adobe Firefly.',
    process: [
      'Designed clock interaction concept',
      'Generated visuals with Adobe Firefly',
      'Integrated with Rive animations',
      'Refined timing and transitions'
    ]
  },
  {
    slug: 'cred-garage',
    title: 'Cred Garage with Rive and Play',
    video: '/assets/video/Cred Garage with rive and Play.mp4',
    description: 'Conceptual design for Cred Garage feature using Rive and Play.',
    tags: ['Rive', 'Play'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer & Prototyper',
    context: 'Explored Cred\'s Garage feature and created interaction prototypes.',
    process: [
      'Researched Cred Garage functionality',
      'Designed interaction flows',
      'Prototyped with Rive and Play',
      'Refined user experience'
    ]
  },
  {
    slug: 'dream-machine',
    title: 'Dream Machine Header Animation with Rive',
    video: '/assets/video/Dream machine header animation with Rive.mp4',
    description: 'Header animation for Dream Machine using Rive.',
    tags: ['Rive'],
    category: 'Design Engineering',
    hidden: true,
    year: '2024',
    client: 'Personal Project',
    role: 'Designer',
    context: 'Created engaging header animation for Dream Machine concept.',
    process: [
      'Designed animation concept',
      'Created animations in Rive',
      'Refined timing and easing',
      'Optimized performance'
    ]
  },
]

// Helper to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getLiveProjects(): Project[] {
  const live = projects.filter(p => !p.hidden && p.tags.includes('Live Projects'))
  const featured = live.filter(p => p.featured)
  const rest = live.filter(p => !p.featured)
  return [...featured, ...rest]
}

export const HOME_PLAYGROUND_PREVIEW_LIMIT = 4

export function getPlaygroundProjects(): Project[] {
  return projects.filter(p => p.category === 'Design Engineering')
}

export function getPlaygroundPreviewProjects(limit = HOME_PLAYGROUND_PREVIEW_LIMIT): Project[] {
  return getPlaygroundProjects().slice(0, limit)
}

export function getProjectListHref(project: Project): string {
  if (project.category === 'Design Engineering') return '/playground/'
  return '/live-projects/'
}

export function getRelatedProjects(project: Project, limit = 2): Project[] {
  const list =
    project.category === 'Design Engineering' ? getPlaygroundProjects() : getLiveProjects()
  return list.filter((p) => p.slug !== project.slug).slice(0, limit)
}
