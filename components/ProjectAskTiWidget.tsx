'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import PortfolioChat from '@/components/PortfolioChat'
import { analytics } from '@/lib/analytics'

function TiChatIcon() {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0.75 0.75H11.75V8.75H9L6.25 10.75L3.5 8.75H0.75V0.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="3.75" cy="4.75" r="1" fill="currentColor" />
      <circle cx="8.75" cy="4.75" r="1" fill="currentColor" />
    </svg>
  )
}

type ProjectAskTiWidgetProps = {
  projectSlug: string
  projectTitle: string
}

export default function ProjectAskTiWidget({ projectSlug, projectTitle }: ProjectAskTiWidgetProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const openChat = () => {
    analytics.trackChatOpen('project', projectSlug)
    setOpen(true)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  if (!mounted) return null

  return createPortal(
    <div className="project-ti-widget">
      {open && (
        <>
          <button
            type="button"
            className="project-ti-widget__backdrop"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          />
          <div
            id="project-ti-widget-panel"
            className="project-ti-widget__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Ask Ti about this project"
          >
            <header className="project-ti-widget__header">
              <span className="project-ti-widget__title">
                <TiChatIcon />
                Ask Ti
              </span>
              <button
                type="button"
                className="project-ti-widget__close"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </header>
            <div className="project-ti-widget__body">
              <PortfolioChat projectSlug={projectSlug} projectTitle={projectTitle} />
            </div>
          </div>
        </>
      )}

      {!open && (
        <button
          type="button"
          className="project-ti-widget__launcher"
          onClick={openChat}
          aria-expanded={open}
          aria-controls="project-ti-widget-panel"
        >
          <TiChatIcon />
          <span>Ask Ti</span>
        </button>
      )}
    </div>,
    document.body
  )
}
