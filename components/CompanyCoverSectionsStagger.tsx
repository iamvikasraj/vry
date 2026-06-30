'use client'

import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

type CompanyCoverSectionsStaggerProps = {
  children: ReactNode
}

/** Stagger-in wrapper for cover sections — children must be rendered by a server parent. */
export default function CompanyCoverSectionsStagger({ children }: CompanyCoverSectionsStaggerProps) {
  const listRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      gsap.from('[data-cover-section]', {
        y: 12,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'transform',
      })
    },
    { scope: listRef },
  )

  return (
    <div ref={listRef} className="company-cover__sections">
      {children}
    </div>
  )
}
