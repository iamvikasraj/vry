import Link from 'next/link'

interface Workshop {
  image: string
  title: string
  link: string
  description: string
  isCarousel?: boolean
  carouselImages?: string[]
}

interface RiveProject {
  video: string
  title: string
  link: string
  description: string
}

export default function Sidebar() {
  const workshops: Workshop[] = [
    {
      image: '/assets/images/design originals.avif',
      title: 'Rive Masterclass for Product Designers - DO club',
      link: 'https://www.youtube.com/watch?v=fTUbis6k8w8&t=535s',
      description:
        'I recently led a Rive Masterclass for the Design Originals Club, exploring how motion enhances usability and storytelling in product design.',
    },
    {
      image: '/assets/images/Rive-1.jpg',
      title: 'From Static to Cinematic — Motion Design at Bigbasket',
      link: '/workshops/rive-animation-series',
      description:
        'Did a Q&A with Sanu Sagar at Bigbasket\'s From Static to Cinematic event, sharing insights on Rive and Play integration for mobile interactions.',
      isCarousel: true,
      carouselImages: [
        '/assets/images/Rive-1.jpg',
        '/assets/images/Rive-2.jpg',
        '/assets/images/Rive-3.jpeg',
        '/assets/images/Rive-4.jpeg',
      ],
    },
  ]

  const riveProjects: RiveProject[] = [
    {
      video: '/assets/video/rive-project.mp4',
      title: 'iOS Control Center using Rive',
      link: '/projects/rive-tutorial',
      description:
        'A custom iOS Control Center created with Rive, showcasing micro-interactions and state transitions for modern iOS interfaces.',
    },
    {
      video: '/assets/video/rive-2.mp4',
      title: 'Vintage clock using Rive',
      link: '#',
      description:
        'A vintage clock created with Rive, demonstrating how Rive can create engaging feedback during data processing.',
    },
  ]

  return (
    <div className="sidebar-area flex-col gap-lg" style={{ flex: '0 0 300px' }}>
      {/* Workshops & Talks Section */}
      <section id="workshops-talks" className="sidebar">
        <h2 className="h2">Workshops & Talks</h2>
        <div className="workshop-content">
          {workshops.map((workshop, index) => (
            <article key={index} className="workshop-featured thought-item">
              <div className="workshop-image">
                {workshop.isCarousel ? (
                  <div className="carousel">
                    {workshop.carouselImages?.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={img}
                        alt={`Rive Animation Workshop ${imgIndex + 1}`}
                        className={`carousel-img ${imgIndex === 0 ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full rounded-md"
                  />
                )}
              </div>
              <h3 className="h5">
                <Link href={workshop.link} target={workshop.link.startsWith('http') ? '_blank' : undefined}>
                  {workshop.title}
                </Link>
              </h3>
              <p className="body1">
                {workshop.description}
                {index === 1 && (
                  <>
                    {' '}
                    <Link
                      href="https://www.linkedin.com/in/sanu-sagar-99ab0514a/"
                      target="_blank"
                      rel="noopener"
                    >
                      Sanu Sagar
                    </Link>
                  </>
                )}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Play Ambassador Section */}
      <section id="play-ambassador" className="sidebar">
        <h2 className="h2">Play Ambassador</h2>
        <div className="ambassador-content">
          <article className="ambassador-featured thought-item">
            <div className="ambassador-image">
              <img
                src="/assets/images/Play Ambassador.jpeg"
                alt="Play Ambassador Program"
                className="w-full rounded-md"
              />
            </div>
            <p className="body1">
              I&apos;ve always believed in prototyping with code, and Play fits perfectly into that workflow.
              It bridges design and real interaction beautifully. I&apos;ve been lucky to be an early user — and now a{' '}
              <Link
                href="https://www.linkedin.com/posts/vraj247_play-ambassador-interaction-activity-7310154390529613824-V8Yz?utm_source=share&utm_medium=member_desktop&rcm=ACoAAA-be60BVAFm7HRMbKKG-IaPcMhIpG9zenk"
                target="_blank"
              >
                Play Ambassador
              </Link>{' '}
              — excited to share what&apos;s next. Cheers.
            </p>
          </article>
        </div>
      </section>

      {/* Rive Projects Section */}
      <section id="rive-projects" className="sidebar">
        <h2 className="h2">Rive Projects</h2>
        <div className="rive-content">
          {riveProjects.map((project, index) => (
            <article key={index} className="rive-featured thought-item">
              <div className="rive-image">
                <video
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="lazy-video"
                  loading="lazy"
                >
                  <source data-src={project.video} type="video/mp4" />
                </video>
              </div>
              <h3 className="h5">
                <Link href={project.link}>{project.title}</Link>
              </h3>
              <p className="body1">{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Freebies Section */}
      <section id="freebies" className="sidebar">
        <h2 className="h2">Freebies</h2>
        <div className="freebies-content">
          <article className="freebie-featured thought-item">
            <div className="freebie-image">
              <img
                src="/assets/images/design originals.avif"
                alt="Design System Freebie"
                className="w-full rounded-md"
              />
            </div>
            <h3 className="h5">
              <Link href="#">FinTech Design System</Link>
            </h3>
            <p className="body1">
              A comprehensive design system for financial applications, including components, patterns, and guidelines for creating trustworthy FinTech interfaces.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}
