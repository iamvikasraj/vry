'use client'

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

interface WorkshopEventRegisterProps {
  eventDate: string
  eventTime?: string
  venue: string
  title: string
  registrationUrl: string
  /** Short list of what's included (e.g. "1 coffee, 1 dessert") */
  includes?: string[]
  /** Extra description */
  description?: string
}

export default function WorkshopEventRegister({
  eventDate,
  eventTime,
  venue,
  title,
  registrationUrl,
  includes,
  description,
}: WorkshopEventRegisterProps) {
  const event = new Date(eventDate + 'T12:00:00')
  const rsvpBy = getRsvpDeadline(event)
  const now = new Date()
  const isOpen = now <= rsvpBy

  const displayDate = event.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="workshop-event-card">
      <div className="workshop-event-details">
        <p className="workshop-event-datetime">
          <span className="workshop-event-date">{displayDate}</span>
          {eventTime && <span className="workshop-event-time">{eventTime}</span>}
        </p>
        <p className="workshop-event-venue">{venue}</p>
        {description && <p className="workshop-event-description">{description}</p>}
        {includes && includes.length > 0 && (
          <ul className="workshop-event-includes">
            {includes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>
      {isOpen ? (
        <>
          <p className="rsvp-deadline">
            RSVP by <strong>{formatDate(rsvpBy)}</strong> (2 days before).
          </p>
          <a
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="workshop-event-register-btn"
          >
            Register / Get tickets
          </a>
        </>
      ) : (
        <p className="rsvp-deadline">Registration closed (deadline was {formatDate(rsvpBy)}).</p>
      )}
    </div>
  )
}
