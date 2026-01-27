'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientScripts from '@/components/ClientScripts'
import TimelineItem from '@/components/TimelineItem'

export default function Workshops() {
  const workshops = [
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
              <div key={index}>
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
                {workshop.title === 'Think Interaction Workshop' && (
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
