'use client'

import { useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

type CompanyCoverCollapsibleSectionProps = {
  id: string
  title: string
  role?: string
  period?: string
  defaultOpen?: boolean
  children: ReactNode
}

export default function CompanyCoverCollapsibleSection({
  id,
  title,
  role,
  period,
  defaultOpen = false,
  children,
}: CompanyCoverCollapsibleSectionProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const tweenRef = useRef<gsap.core.Timeline | null>(null)
  const [open, setOpen] = useState(defaultOpen)

  useGSAP(
    () => {
      const panel = panelRef.current
      const icon = iconRef.current
      if (!panel || !icon) return

      gsap.set(panel, { height: defaultOpen ? 'auto' : 0, overflow: 'hidden' })
      gsap.set(icon, { rotate: defaultOpen ? 45 : 0 })
    },
    { scope: rootRef },
  )

  const toggle = () => {
    const panel = panelRef.current
    const icon = iconRef.current
    if (!panel || !icon) return

    tweenRef.current?.kill()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (open) {
      if (reduced) {
        gsap.set(panel, { height: 0 })
        gsap.set(icon, { rotate: 0 })
        setOpen(false)
        return
      }

      const currentHeight = panel.offsetHeight
      gsap.set(panel, { height: currentHeight })

      const tl = gsap.timeline({ onComplete: () => setOpen(false) })
      tl.to(panel, { height: 0, duration: 0.35, ease: 'power2.inOut' })
      tl.to(icon, { rotate: 0, duration: 0.25, ease: 'power2.out' }, 0)
      tweenRef.current = tl
      return
    }

    setOpen(true)

    if (reduced) {
      gsap.set(panel, { height: 'auto' })
      gsap.set(icon, { rotate: 45 })
      return
    }

    gsap.set(panel, { height: 'auto' })
    const targetHeight = panel.offsetHeight
    gsap.set(panel, { height: 0 })

    const tl = gsap.timeline()
    tl.to(panel, { height: targetHeight, duration: 0.4, ease: 'power2.out' })
    tl.to(icon, { rotate: 45, duration: 0.25, ease: 'power2.out' }, 0)
    tl.eventCallback('onComplete', () => {
      gsap.set(panel, { height: 'auto' })
    })
    tweenRef.current = tl
  }

  const meta = [role, period].filter(Boolean).join(' · ')

  return (
    <div
      ref={rootRef}
      data-cover-section
      className={`company-cover__section company-cover__collapsible${open ? ' is-open' : ''}`}
    >
      <button
        type="button"
        className="company-cover__collapsible-summary"
        aria-expanded={open}
        aria-controls={`cover-panel-${id}`}
        onClick={toggle}
      >
        <span className="company-cover__section-heading">
          <span className="company-cover__section-title">{title}</span>
          {meta ? <span className="company-cover__section-meta">{meta}</span> : null}
        </span>
        <span ref={iconRef} className="company-cover__collapsible-icon" aria-hidden="true">
          +
        </span>
      </button>
      <div
        ref={panelRef}
        id={`cover-panel-${id}`}
        className="company-cover__collapsible-panel"
        aria-hidden={!open}
      >
        <div className="company-cover__collapsible-inner">{children}</div>
      </div>
    </div>
  )
}
