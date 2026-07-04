'use client'

import { useEffect, useRef, useState, type FocusEvent, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { FeaturedCompanyProject } from '@/data/featuredCompanies'
import { projectHref } from '@/lib/projectHref'
import { mediaAssetPath } from '@/lib/mediaAssetPath'
import { useCanHover } from '@/lib/useCanHover'

type NdaExperienceCardProps = {
  project: FeaturedCompanyProject
  isHero?: boolean
}

type Status = 'idle' | 'loading' | 'error'

function getVideoSources(project: FeaturedCompanyProject): string[] {
  if (project.videos?.length) {
    return project.videos.map((source) => mediaAssetPath(source))
  }
  if (project.video) {
    return [mediaAssetPath(project.video)]
  }
  return []
}

/** Session handoff so the detail page shows the unlocked content without re-asking. */
export function ndaSessionKey(slug: string): string {
  return `nda:${slug}`
}

export default function NdaExperienceCard({ project, isHero = false }: NdaExperienceCardProps) {
  const router = useRouter()
  const canHover = useCanHover()
  const [hovered, setHovered] = useState(false)
  const [tapped, setTapped] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const videoSources = getVideoSources(project)
  const hasVideo = videoSources.length > 0

  // Reveal on hover (mouse); keep open while typing or after an explicit tap
  // (touch/keyboard) so moving the pointer away mid-entry doesn't wipe it.
  const open = hovered || tapped || interacting

  // Only steal focus on an explicit tap — never on hover.
  useEffect(() => {
    if (tapped) inputRef.current?.focus()
  }, [tapped])

  function onFormBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setInteracting(false)
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!password || status === 'loading') return
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/nda-unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: project.slug, password }),
      })

      if (res.ok) {
        const data = (await res.json()) as { title?: string; html?: string }
        if (data.html) {
          try {
            sessionStorage.setItem(
              ndaSessionKey(project.slug),
              JSON.stringify({ title: data.title, html: data.html }),
            )
          } catch {
            /* sessionStorage unavailable — detail page will re-ask, which is fine */
          }
          router.push(projectHref(project.slug))
          return
        }
      }

      const data = (await res.json().catch(() => ({}))) as { error?: string }
      setError(
        res.status === 401
          ? 'Incorrect password. Please try again.'
          : data.error || 'Something went wrong. Please try again.',
      )
      setStatus('error')
    } catch {
      setError('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div
      className={`home-de-timeline-featured__placeholder home-de-media-card home-de-timeline-featured__placeholder--nda${
        isHero ? ' home-de-timeline-featured--hero' : ''
      }`}
      onMouseEnter={canHover ? () => setHovered(true) : undefined}
      onMouseLeave={canHover ? () => setHovered(false) : undefined}
    >
      <div className="home-de-timeline-featured__media">
        {hasVideo ? (
          <>
            <video
              className="home-de-timeline-featured__nda-video"
              src={videoSources[0]}
              poster={project.thumbnail}
              muted
              playsInline
              loop
              autoPlay
              preload="auto"
              aria-hidden
            />
            <div className="home-de-timeline-featured__nda-scrim" aria-hidden />
          </>
        ) : null}
        <div
          className={`home-de-timeline-featured__nda${hasVideo ? '' : ' home-de-timeline-featured__nda--solid'}`}
          aria-hidden
        >
          <div className="home-de-timeline-featured__nda-brand">
            {project.ndaLogo ? (
              <img
                className="home-de-timeline-featured__nda-logo"
                src={project.ndaLogo}
                alt=""
              />
            ) : null}
            <span className="home-de-timeline-featured__nda-label">{project.title}</span>
          </div>
        </div>

        <span className="home-de-media-badge" aria-label="Under NDA">
          <svg
            className="home-de-media-badge__lock"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
            <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
          </svg>
        </span>

        {open ? (
          <div
            className="home-de-nda-form-overlay"
            onFocus={() => setInteracting(true)}
            onBlur={onFormBlur}
          >
            <form className="home-de-nda-form" onSubmit={onSubmit}>
              <label className="home-de-nda-form__label" htmlFor={`nda-${project.slug}`}>
                {project.title} · Under NDA
              </label>
              <div className="home-de-nda-form__row">
                <input
                  ref={inputRef}
                  id={`nda-${project.slug}`}
                  type="password"
                  className="home-de-nda-form__input"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="home-de-nda-form__button"
                  disabled={status === 'loading' || !password}
                >
                  {status === 'loading' ? '…' : 'Unlock'}
                </button>
              </div>
              {status === 'error' && (
                <p className="home-de-nda-form__error" role="alert">
                  {error}
                </p>
              )}
            </form>
          </div>
        ) : (
          <button
            type="button"
            className="home-de-nda-trigger"
            onClick={() => setTapped(true)}
            onFocus={() => setTapped(true)}
            aria-label={`${project.title} — under NDA, enter password to view`}
          />
        )}
      </div>
      <span className="home-de-media-caption home-de-media-caption--below">
        <span className="home-de-media-caption__title">{project.title}</span>
      </span>
    </div>
  )
}
