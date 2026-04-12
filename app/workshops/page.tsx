'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientScripts from '@/components/ClientScripts'
import TimelineItem from '@/components/TimelineItem'
import WorkshopRSVP from '@/components/WorkshopRSVP'
import WorkshopEventRegister from '@/components/WorkshopEventRegister'
import PortfolioFolderIcon from '@/components/PortfolioFolderIcon'
import { workshops } from '@/data/workshops'

export default function Workshops() {
  const workshopVideo = '/assets/video/Think Interaction Workshop.mp4'
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_RSVP

  return (
    <div className="page-container">
      <Header />

      <section className="workshops-page">
        <div className="workshops-content">
          <div className="page-folder-heading">
            <PortfolioFolderIcon />
            <h1 className="work-page-title">Workshops</h1>
          </div>
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
