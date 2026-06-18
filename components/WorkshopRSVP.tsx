'use client'

import { useState } from 'react'

const RSVP_DAYS_BEFORE = 2

function getRsvpDeadline(eventDate: Date): Date {
  const d = new Date(eventDate)
  d.setDate(d.getDate() - RSVP_DAYS_BEFORE)
  d.setHours(23, 59, 59, 999)
  return d
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface WorkshopRSVPProps {
  /** Event date (e.g. "2026-02-18") */
  eventDate: string
  workshopTitle: string
  /** Formspree form id (e.g. "xyzabc") or full endpoint. Set via NEXT_PUBLIC_FORMSPREE_RSVP */
  formspreeId?: string
}

export default function WorkshopRSVP({ eventDate, workshopTitle, formspreeId }: WorkshopRSVPProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const event = new Date(eventDate + 'T12:00:00')
  const rsvpBy = getRsvpDeadline(event)
  const now = new Date()
  const isOpen = now <= rsvpBy

  const endpoint =
    formspreeId &&
    (formspreeId.startsWith('http') ? formspreeId : `https://formspree.io/f/${formspreeId}`)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!endpoint) {
      setError('RSVP form is not configured. Add NEXT_PUBLIC_FORMSPREE_RSVP to your environment.')
      return
    }
    setLoading(true)
    setError(null)
    const form = e.currentTarget
    const body = new FormData(form)
    body.set('_subject', `RSVP: ${workshopTitle}`)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
      form.reset()
    } catch {
      setError('Something went wrong. Please try again or contact me directly.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <div className="rsvp-section rsvp-closed">
        <p className="rsvp-deadline">
          RSVP closed (deadline was {formatDate(rsvpBy)}).
        </p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="rsvp-section rsvp-success">
        <p className="rsvp-success-message">Thanks! Your RSVP is confirmed.</p>
      </div>
    )
  }

  return (
    <div className="rsvp-section">
      <p className="rsvp-deadline">
        RSVP by <strong>{formatDate(rsvpBy)}</strong> (2 days before the event).
      </p>
      <form
        className="rsvp-form"
        onSubmit={handleSubmit}
        action={endpoint}
        method="POST"
      >
        <input type="hidden" name="_subject" value={`RSVP: ${workshopTitle}`} />
        <div className="rsvp-field">
          <label htmlFor="rsvp-name">Name</label>
          <input
            id="rsvp-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="rsvp-input"
          />
        </div>
        <div className="rsvp-field">
          <label htmlFor="rsvp-email">Email</label>
          <input
            id="rsvp-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="rsvp-input"
          />
        </div>
        {error && <p className="rsvp-error">{error}</p>}
        <button type="submit" className="rsvp-submit" disabled={loading}>
          {loading ? 'Sending…' : 'RSVP'}
        </button>
      </form>
    </div>
  )
}
