'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createPortal } from 'react-dom'

export interface SurfaceItemData {
  id: string
  title: string
  subtitle?: string
  href: string
  /** Optional image or video src for focus view */
  media?: string
  type?: 'page' | 'project'
}

interface SurfaceProps {
  items: SurfaceItemData[]
}

function FocusOverlay({
  item,
  onClose,
}: {
  item: SurfaceItemData
  onClose: () => void
}) {
  return (
    <div
      className="surface-overlay-backdrop"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role="button"
      tabIndex={0}
      aria-label="Close"
    >
      <div
        className="surface-overlay-card"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="surface-overlay-close"
          onClick={onClose}
          aria-label="Put back"
        >
          ×
        </button>
        <div className="surface-overlay-content">
          {item.media && (
            <div className="surface-overlay-media">
              {item.media.endsWith('.mp4') ? (
                <video src={item.media} muted loop autoPlay playsInline />
              ) : (
                <img src={item.media} alt="" />
              )}
            </div>
          )}
          <h3 className="surface-overlay-title">{item.title}</h3>
          {item.subtitle && (
            <p className="surface-overlay-subtitle">{item.subtitle}</p>
          )}
          <Link
            href={item.href}
            className="surface-overlay-link"
            onClick={onClose}
          >
            {item.type === 'project' ? 'View project' : 'Open'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Surface({ items }: SurfaceProps) {
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const focusedItem = items.find((i) => i.id === focusedId)

  useEffect(() => {
    if (!focusedId) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setFocusedId(null)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [focusedId])

  return (
    <>
      <div className="surface">
        <div className="surface-plane">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`surface-item ${focusedId === item.id ? 'surface-item-picked' : ''}`}
              onClick={() => setFocusedId(item.id)}
            >
              <span className="surface-item-title">{item.title}</span>
              {item.subtitle && (
                <span className="surface-item-subtitle">{item.subtitle}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {focusedItem &&
        typeof document !== 'undefined' &&
        createPortal(
          <FocusOverlay item={focusedItem} onClose={() => setFocusedId(null)} />,
          document.body
        )}
    </>
  )
}
