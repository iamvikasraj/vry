'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import SectionHeader from './SectionHeader'

interface Workshop {
  title: string
  date: string
  venue: string
  type: 'Virtual' | 'In-Person'
  status?: 'upcoming' | 'past' // Optional - will be auto-calculated if not provided
  image?: string
  images?: string[] // For carousel of images
}

export default function HomeWorkshops() {
  // Helper function to determine if a workshop is past based on date
  const isPastWorkshop = (date: string): boolean => {
    const currentYear = new Date().getFullYear()
    const workshopYear = parseInt(date, 10)
    
    // If the year is less than current year, it's past
    if (workshopYear < currentYear) {
      return true
    }
    
    // If the year is greater than current year, it's upcoming
    if (workshopYear > currentYear) {
      return false
    }
    
    // If same year, consider it past (since we're already in the year)
    return true
  }

  const workshops: Workshop[] = [
    {
      title: 'Think Interaction Workshop',
      date: '2025',
      venue: 'Rive x Play 2025',
      type: 'In-Person',
      image: '/assets/video/Think Interaction Workshop.mp4',
    },
    {
      title: 'Rive Q&A at Big Basket Workshop',
      date: '2025',
      venue: 'Big Basket',
      type: 'In-Person',
      images: [
        '/assets/images/Rive-1.jpg',
        '/assets/images/Rive-2.jpg',
        '/assets/images/Rive-3.jpeg',
        '/assets/images/Rive-4.jpeg',
      ],
    },
  ].map(workshop => ({
    ...workshop,
    status: isPastWorkshop(workshop.date) ? 'past' : 'upcoming' as 'past' | 'upcoming',
  }))

  // Get the most recent workshop (first one in the array)
  const recentWorkshop = workshops[0]
  const isUpcoming = recentWorkshop.status === 'upcoming'

  return (
    <section className="home-workshops-section">
      <SectionHeader
        title="Recent Workshop"
        subtitle="I regularly conduct workshops on interaction design, motion design, and prototyping. Sharing knowledge with designers and helping them learn new tools and techniques."
        linkHref="/workshops"
        linkLabel="View all workshops"
        className="home-workshops-header"
      />

      <div className="home-workshop-single">
        <Link 
          href="/workshops" 
          className={`home-workshop-card ${isUpcoming ? 'home-workshop-card-upcoming' : ''}`}
        >
          {(recentWorkshop.image || recentWorkshop.images) && (
            <div className="home-workshop-image">
              {recentWorkshop.images && recentWorkshop.images.length > 0 ? (
                <WorkshopCarousel images={recentWorkshop.images} title={recentWorkshop.title} />
              ) : recentWorkshop.image ? (
                recentWorkshop.image.endsWith('.mp4') ? (
                  <WorkshopVideoPlayer src={recentWorkshop.image} title={recentWorkshop.title} />
                ) : (
                  <img src={recentWorkshop.image} alt={recentWorkshop.title} className="home-workshop-img" />
                )
              ) : null}
            </div>
          )}
          <div className="home-workshop-content">
            <div className="home-workshop-year">{recentWorkshop.date}</div>
            <h3 className="home-workshop-title">{recentWorkshop.title}</h3>
            <div className="home-workshop-meta">
              <span className="home-workshop-venue">{recentWorkshop.venue}</span>
              <span className="home-workshop-type">{recentWorkshop.type}</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}

// Workshop Video Player Component with hover-to-play
function WorkshopVideoPlayer({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current?.closest('.home-workshop-card')
    if (!video || !container) return

    // Load video metadata immediately
    video.load()

    const handleMouseEnter = () => {
      if (video.readyState >= 2) {
        video.play().catch(() => {
          // Silently fail if autoplay is blocked
        })
      } else {
        video.load()
        video.addEventListener('loadeddata', () => {
          video.play().catch(() => {})
        }, { once: true })
      }
    }

    const handleMouseLeave = () => {
      video.pause()
      video.currentTime = 0
    }

    const handleLoadedMetadata = () => {
      if (video.readyState >= 1) {
        video.currentTime = 0.1
        setIsLoaded(true)
      }
    }

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplay', handleCanPlay)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [src])

  return (
    <div ref={containerRef} className="home-workshop-video-container">
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        className={`home-workshop-video ${isLoaded ? 'loaded' : ''}`}
        src={src}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!isLoaded && <div className="home-workshop-video-placeholder" />}
    </div>
  )
}

// Workshop Carousel Component with auto-rotation
function WorkshopCarousel({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="home-workshop-carousel">
      {images.map((img, imgIndex) => (
        <img
          key={imgIndex}
          src={img}
          alt={`${title} ${imgIndex + 1}`}
          className={`home-workshop-carousel-img ${imgIndex === activeIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  )
}
