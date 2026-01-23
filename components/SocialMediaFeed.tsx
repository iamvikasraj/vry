'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface SocialPost {
  id: string
  url: string
  image?: string
  video?: string
  title?: string
  description?: string
  date: string
  platform: 'twitter' | 'instagram' | 'dribbble' | 'behance'
}

interface SocialMediaData {
  twitter: SocialPost[]
  instagram: SocialPost[]
  dribbble: SocialPost[]
  behance: SocialPost[]
  lastUpdated: string
}

export default function SocialMediaFeed() {
  const [socialData, setSocialData] = useState<SocialMediaData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSocialData() {
      try {
        const response = await fetch('/social-media.json')
        if (response.ok) {
          const data = await response.json()
          setSocialData(data)
        }
      } catch (error) {
        console.error('Error fetching social media data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSocialData()
  }, [])

  if (loading) {
    return null
  }

  if (!socialData) {
    return null
  }

  // Combine all posts and sort by date
  const allPosts: SocialPost[] = [
    ...socialData.twitter,
    ...socialData.instagram,
    ...socialData.dribbble,
    ...socialData.behance,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (allPosts.length === 0) {
    return null
  }

  return (
    <section className="social-media-feed">
      <h2 className="section-title">Latest from Socials</h2>
      <div className="social-grid">
        {allPosts.slice(0, 6).map((post) => (
          <Link
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-post"
          >
            {post.image && (
              <div className="social-post-media">
                <img src={post.image} alt={post.title || ''} />
              </div>
            )}
            {post.video && (
              <div className="social-post-media">
                <video loop muted playsInline>
                  <source src={post.video} type="video/mp4" />
                </video>
              </div>
            )}
            {post.title && (
              <div className="social-post-content">
                <h3 className="social-post-title">{post.title}</h3>
                {post.description && (
                  <p className="social-post-description">{post.description}</p>
                )}
              </div>
            )}
            <div className="social-post-platform">{post.platform}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
