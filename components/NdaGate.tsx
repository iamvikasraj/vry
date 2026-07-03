'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { ndaSessionKey } from '@/components/NdaExperienceCard'

type NdaGateProps = {
  slug: string
}

type Status = 'idle' | 'loading' | 'error'

export default function NdaGate({ slug }: NdaGateProps) {
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [html, setHtml] = useState<string | null>(null)

  // Honor an unlock handed off from the Experiences card so the visitor isn't
  // asked twice. Read after mount to avoid a hydration mismatch.
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem(ndaSessionKey(slug))
      if (cached) {
        const data = JSON.parse(cached) as { html?: string }
        if (data?.html) setHtml(data.html)
      }
    } catch {
      /* ignore unavailable/parse errors — the gate stays as the fallback */
    }
  }, [slug])

  // Content is authored by us and returned only from the server after auth —
  // not user input — so injecting it as HTML is safe here.
  if (html) {
    return (
      <div className="project-content" dangerouslySetInnerHTML={{ __html: html }} />
    )
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
        body: JSON.stringify({ slug, password }),
      })

      if (res.ok) {
        const data = (await res.json()) as { html?: string }
        if (data.html) {
          setHtml(data.html)
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
    <div className="project-content">
      <form className="nda-gate" onSubmit={onSubmit}>
        <h2 className="nda-gate__title">Password protected</h2>
        <p className="nda-gate__text">
          This case study is under NDA. Enter the password to view what I can share about the
          work. Need access? <a href="/contact/">Get in touch</a>.
        </p>
        <div className="nda-gate__row">
          <input
            type="password"
            className="nda-gate__input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            autoComplete="off"
            aria-label="Password"
          />
          <button
            type="submit"
            className="nda-gate__button"
            disabled={status === 'loading' || !password}
          >
            {status === 'loading' ? 'Checking…' : 'Unlock'}
          </button>
        </div>
        {status === 'error' && (
          <p className="nda-gate__error" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  )
}
