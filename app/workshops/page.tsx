'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientScripts from '@/components/ClientScripts'
import TimelineItem from '@/components/TimelineItem'
import WorkshopRSVP from '@/components/WorkshopRSVP'
import WorkshopEventRegister from '@/components/WorkshopEventRegister'

type Workshop = {
  title: string
  year: string
  venue: string
  description: string
  /** Optional full date (YYYY-MM-DD) for upcoming workshops with RSVP */
  eventDate?: string
  /** Optional time string (e.g. "7pm–9pm") when using registrationUrl */
  eventTime?: string
  /** When set, show external registration CTA instead of RSVP form */
  registrationUrl?: string
  /** What's included (for event card when registrationUrl is set) */
  includes?: string[]
  /** Longer description for event card */
  eventDescription?: string
}

export default function Workshops() {
  const workshops: Workshop[] = [
    {
      title: 'Rive Ambassador Happy Hour — Bengaluru 🇮🇳',
      year: '2026',
      venue: 'The Craftery By Subko, Koramangala, Bengaluru',
      description: 'Casual meetup for Rive users, motion designers, and developers. Meet Vikas Raj Yadav, Rive Ambassador, IRL—no talks, no pressure, just good conversations.',
      eventDate: '2026-02-12',
      eventTime: '7pm–9pm',
      registrationUrl: 'https://lnkd.in/g8HB_nWD',
      includes: [
        '1 espresso-based coffee (per person)',
        '1 mini fudge-stuffed croissant (free)',
      ],
      eventDescription: 'A relaxed, come-as-you-are meetup to hang out, swap notes, and connect in person. Whether you’re deep into Rive or just getting started, come meet fellow builders and enjoy a cozy evening with the local Rive community.',
    },
    {
      title: 'Rive Workshop',
      year: '2026',
      venue: 'TBD',
      description: 'Hands-on Rive workshop on interaction and motion design.',
      eventDate: '2026-03-18',
    },
    {
      title: 'Think Interaction Workshop',
      year: '2025',
      venue: 'Rive x Play 2025',
      description: 'Workshop on interaction design and motion principles using Rive.',
    },
    {
      title: 'Scripting with Rive Challenge',
      year: '2024',
      venue: 'Rive x Contra',
      description: 'Exploring advanced Rive scripting techniques and animation workflows.',
    },
  ]

  const workshopVideo = '/assets/video/Think Interaction Workshop.mp4'
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_RSVP

  return (
    <div className="page-container">
      <Header />

      <section className="workshops-page">
        <div className="workshops-content">
          <div className="workshops-description">
            <p>
              I regularly conduct workshops and share knowledge on interaction design, motion design, and prototyping. As a <strong>Rive and Play ambassador</strong>, I help designers learn new tools and techniques.
            </p>
          </div>

          <div className="workshops-list">
            {workshops.map((workshop, index) => (
              <div key={index} className={workshop.eventDate ? 'workshop-item-upcoming' : ''}>
                <TimelineItem
                  leftContent={
                    <div className="workshop-info">
                      <div className="workshop-title">{workshop.title}</div>
                      <div className="workshop-venue">{workshop.venue}</div>
                    </div>
                  }
                  rightContent={<div className="workshop-year">{workshop.year}</div>}
                  className="workshop-item-timeline"
                />
                {workshop.eventDate && workshop.registrationUrl && (
                  <WorkshopEventRegister
                    eventDate={workshop.eventDate}
                    eventTime={workshop.eventTime}
                    venue={workshop.venue}
                    title={workshop.title}
                    registrationUrl={workshop.registrationUrl}
                    includes={workshop.includes}
                    description={workshop.eventDescription}
                  />
                )}
                {workshop.eventDate && !workshop.registrationUrl && (
                  <WorkshopRSVP
                    eventDate={workshop.eventDate}
                    workshopTitle={workshop.title}
                    formspreeId={formspreeId}
                  />
                )}
                {workshop.title === 'Think Interaction Workshop' && !workshop.eventDate && (
                  <div className="workshop-video-container">
                    <video
                      src={workshopVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="workshop-video"
                      onError={(e) => {
                        console.error('Video load error:', e)
                      }}
                      onLoadStart={() => {
                        console.log('Video loading:', workshopVideo)
                      }}
                    >
                      <source src={workshopVideo} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ClientScripts />
    </div>
  )
}
