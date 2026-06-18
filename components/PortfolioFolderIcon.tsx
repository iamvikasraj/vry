'use client'

import { useEffect, useRef } from 'react'

const HOVER_ROOT_SELECTOR =
  '.home-terminal-route-link, .home-terminal-ls-row, .page-folder-heading, .project-header-title-row'

const D_CLOSED = 'M0.5 81.5 L0.5 22 L115 22 L115 81.5 Z'
const D_OPEN = 'M0.5 81.5 L0.5 62 L115 62 L115 81.5 Z'

type PortfolioFolderIconProps = {
  className?: string
}

/**
 * Folder outline + inner panel. Inner `d` and `fill` animate via SMIL; driven by
 * hover/focus on the nearest HOVER_ROOT_SELECTOR ancestor (see effect).
 */
export default function PortfolioFolderIcon({ className = '' }: PortfolioFolderIconProps) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const openPathAnim = useRef<SVGAnimateElement | null>(null)
  const closePathAnim = useRef<SVGAnimateElement | null>(null)
  const openFillAnim = useRef<SVGAnimateElement | null>(null)
  const closeFillAnim = useRef<SVGAnimateElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const parent = root.closest(HOVER_ROOT_SELECTOR)
    if (!parent) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dur = reduced ? '0.01s' : '0.45s'
    for (const ref of [openPathAnim, closePathAnim, openFillAnim, closeFillAnim]) {
      ref.current?.setAttribute('dur', dur)
    }

    const pointerOver = { current: false }
    const focusWithin = { current: false }
    const expanded = { current: false }

    const sync = () => {
      const on = pointerOver.current || focusWithin.current
      if (on && !expanded.current) {
        openPathAnim.current?.beginElement()
        openFillAnim.current?.beginElement()
        expanded.current = true
      }
      if (!on && expanded.current) {
        closePathAnim.current?.beginElement()
        closeFillAnim.current?.beginElement()
        expanded.current = false
      }
    }

    const onEnter = () => {
      pointerOver.current = true
      sync()
    }
    const onLeave = () => {
      pointerOver.current = false
      sync()
    }
    const onFocusIn = () => {
      focusWithin.current = true
      sync()
    }
    const onFocusOut = () => {
      focusWithin.current = false
      sync()
    }

    parent.addEventListener('mouseenter', onEnter)
    parent.addEventListener('mouseleave', onLeave)
    parent.addEventListener('focusin', onFocusIn)
    parent.addEventListener('focusout', onFocusOut)

    return () => {
      parent.removeEventListener('mouseenter', onEnter)
      parent.removeEventListener('mouseleave', onLeave)
      parent.removeEventListener('focusin', onFocusIn)
      parent.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  return (
    <span
      ref={rootRef}
      className={['portfolio-folder-icon-slot', className].filter(Boolean).join(' ')}
      aria-hidden
    >
      <svg
        className="portfolio-folder-icon-svg"
        viewBox="0 0 116 82"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.500009 81.5L0.5 0.5H47L52 11H115V81.5H0.500009Z"
          fill="#002505"
          stroke="#00C030"
        />

        <path
          fill="none"
          stroke="#00C030"
          strokeLinejoin="miter"
          d={D_CLOSED}
        >
          <animate
            ref={openPathAnim}
            attributeName="d"
            begin="indefinite"
            dur="0.45s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.33 1 0.68 1"
            keyTimes="0;1"
            values={`${D_CLOSED};${D_OPEN}`}
          />
          <animate
            ref={closePathAnim}
            attributeName="d"
            begin="indefinite"
            dur="0.45s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.33 1 0.68 1"
            keyTimes="0;1"
            values={`${D_OPEN};${D_CLOSED}`}
          />
          <animate
            ref={openFillAnim}
            attributeName="fill"
            begin="indefinite"
            dur="0.45s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.33 1 0.68 1"
            keyTimes="0;1"
            values="none;#019B15"
          />
          <animate
            ref={closeFillAnim}
            attributeName="fill"
            begin="indefinite"
            dur="0.45s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.33 1 0.68 1"
            keyTimes="0;1"
            values="#019B15;none"
          />
        </path>
      </svg>
    </span>
  )
}
