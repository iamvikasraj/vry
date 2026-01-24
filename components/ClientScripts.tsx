'use client'

import { useEffect } from 'react'

export default function ClientScripts() {
  useEffect(() => {
    // Scroll reveal animations with Intersection Observer
    const revealElements = document.querySelectorAll('.scroll-reveal')
    
    if ('IntersectionObserver' in window && revealElements.length > 0) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            revealObserver.unobserve(entry.target)
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      })
      
      revealElements.forEach(el => revealObserver.observe(el))
    }

    // Load videos when they come into view
    const lazyVideos = document.querySelectorAll('.lazy-video')

    const loadVideo = (video: HTMLVideoElement) => {
      // If video already has src, just load it
      if (video.src || video.querySelector('source[src]')) {
        video.load()
        return
      }
      
      // Otherwise, check for data-src (legacy support)
      const source = video.querySelector('source[data-src]') as HTMLSourceElement
      if (source && !source.src) {
        source.src = source.dataset.src || ''
        video.load()
      }
    }

    if ('IntersectionObserver' in window && lazyVideos.length > 0) {
      const videoObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement
            loadVideo(video)
            // Preload video metadata for faster display
            video.load()
            obs.unobserve(entry.target)
          }
        })
      }, { 
        rootMargin: '400px 0px',
        threshold: 0.01
      })

      lazyVideos.forEach(video => videoObserver.observe(video))
    } else {
      // Fallback: load all videos immediately if IntersectionObserver not supported
      lazyVideos.forEach(video => {
        loadVideo(video as HTMLVideoElement)
        ;(video as HTMLVideoElement).load()
      })
    }

    // Video hover play for work items
    const workItems = document.querySelectorAll('.work-item')
    
    workItems.forEach((item) => {
      const video = item.querySelector('video') as HTMLVideoElement
      if (!video) return
      
      let hoverTimeout: NodeJS.Timeout
      
      item.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout)
        hoverTimeout = setTimeout(() => {
          video.play().catch(() => {
            // Silently fail if autoplay is blocked
          })
        }, 100)
      }, { passive: true })
      
      item.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout)
        hoverTimeout = setTimeout(() => {
          video.pause()
          video.currentTime = 0
        }, 150)
      }, { passive: true })
    })

    // Optimized Rive Carousel Animation
    const carousel = document.querySelector('.carousel')
    if (carousel) {
      const images = carousel.querySelectorAll('.carousel-img')
      if (images.length > 0) {
        let currentIndex = 0
        let carouselInterval: NodeJS.Timeout

        function showNextImage() {
          images[currentIndex].classList.remove('active')
          currentIndex = (currentIndex + 1) % images.length
          images[currentIndex].classList.add('active')
        }

        if ('IntersectionObserver' in window) {
          const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                carouselInterval = setInterval(showNextImage, 3000)
              } else {
                clearInterval(carouselInterval)
              }
            })
          }, { threshold: 0.1 })
          
          carouselObserver.observe(carousel)
        } else {
          carouselInterval = setInterval(showNextImage, 3000)
        }
      }
    }
  }, [])

  return null
}
