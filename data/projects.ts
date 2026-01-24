export interface Project {
  slug: string
  title: string
  video: string
  description: string
  tags: string[]
  year?: string
  client?: string
  role?: string
  context?: string
  process?: string[]
  results?: string
}

export const projects: Project[] = [
  {
    slug: 'interactive-balloons',
    title: 'Interactive Balloons with Rive and SwiftUI for the Contra Challenge',
    video: '/assets/video/Interactive Balloons with Rive and Swiftui for the Contra challenge.mp4',
    description: 'Interactive balloons animation created with Rive and SwiftUI for the Contra challenge.',
    tags: ['Rive', 'SwiftUI', 'Contra'],
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
    slug: 'etmoney-onboarding',
    title: 'ET Money Onboarding with Rive & SwiftUI',
    video: '/assets/video/Et money onboarding with Rive & SwiftUI.mp4',
    description: 'A shareable celebration, fully created in Rive.',
    tags: ['Live Projects', 'Rive', 'SwiftUI'],
    year: '2024',
    client: 'ET Money',
    role: 'Lead Product Designer',
    context: 'Redesigned the onboarding experience to improve user engagement and reduce drop-off rates.',
    process: [
      'Conducted user research to understand onboarding pain points',
      'Created interactive prototypes using Rive for motion design',
      'Iterated on flows based on user testing feedback',
      'Collaborated with engineering team for implementation'
    ],
    results: 'Improved onboarding completion rate by 47% and reduced time-to-value for new users.'
  },
  {
    slug: 'etmoney-microinteraction',
    title: 'ET Money Microinteraction with Rive',
    video: '/assets/video/ET money Microinteraction with Rive.mp4',
    description: 'Micro-interaction design for ET Money app using Rive.',
    tags: ['Live Projects', 'Rive'],
    year: '2024',
    client: 'ET Money',
    role: 'Lead Product Designer',
    context: 'Created engaging micro-interactions to enhance user experience and provide delightful feedback.',
    process: [
      'Identified key interaction points in the user journey',
      'Designed micro-animations using Rive',
      'Tested with users for feedback',
      'Implemented across the app'
    ]
  },
  {
    slug: 'zomato-weather',
    title: 'Zomato Weather Concept with Rive and Play',
    video: '/assets/video/Zomato Weather concept with rive and play.mp4',
    description: 'A weather concept design for Zomato using Rive and Play.',
    tags: ['Rive', 'Play'],
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
  {
    slug: 'business-insider',
    title: 'Business Insider Prototype with SwiftUI',
    video: '/assets/video/Business Insider Prototype with SwiftUI.mp4',
    description: 'Prototype of Business Insider app interface using SwiftUI.',
    tags: ['SwiftUI'],
    year: '2024',
    client: 'Personal Project',
    role: 'Designer & Developer',
    context: 'Explored Business Insider app design and created SwiftUI prototype.',
    process: [
      'Analyzed Business Insider interface',
      'Designed component structure',
      'Built prototype in SwiftUI',
      'Refined interactions and animations'
    ]
  },
]

// Helper to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}
