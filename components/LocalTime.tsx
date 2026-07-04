'use client'

import { useEffect, useState } from 'react'

type TimeParts = {
  hour: string
  minute: string
  dayPeriod: string
}

function formatTimeParts(timeZone: string): TimeParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  }).formatToParts(new Date())

  return {
    hour: parts.find((part) => part.type === 'hour')?.value ?? '',
    minute: parts.find((part) => part.type === 'minute')?.value ?? '',
    dayPeriod: parts.find((part) => part.type === 'dayPeriod')?.value ?? '',
  }
}

/** Live clock for a fixed IANA zone — shows the same local time to every visitor. */
export default function LocalTime({
  timeZone,
  label,
  className,
}: {
  timeZone: string
  label?: string
  className?: string
}) {
  const [parts, setParts] = useState<TimeParts>(() => formatTimeParts(timeZone))

  useEffect(() => {
    const update = () => setParts(formatTimeParts(timeZone))
    update()
    const id = window.setInterval(update, 1000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return (
    <span className={className} suppressHydrationWarning>
      {parts.hour}
      <span className="home-de-sidebar-clock__sep" aria-hidden="true">
        :
      </span>
      {parts.minute} {parts.dayPeriod}
      {label ? ` ${label}` : null}
    </span>
  )
}
