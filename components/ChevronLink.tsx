'use client'

import Link from 'next/link'

interface ChevronLinkProps {
  href: string
  ariaLabel: string
  className?: string
}

export default function ChevronLink({ href, ariaLabel, className = '' }: ChevronLinkProps) {
  return (
    <Link href={href} className={`chevron-link ${className}`} aria-label={ariaLabel}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </Link>
  )
}
