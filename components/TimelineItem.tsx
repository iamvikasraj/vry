'use client'

import { ReactNode } from 'react'

interface TimelineItemProps {
  leftContent: ReactNode
  rightContent: ReactNode
  className?: string
}

export default function TimelineItem({ leftContent, rightContent, className = '' }: TimelineItemProps) {
  return (
    <div className={`timeline-item ${className}`}>
      <div className="timeline-item-left">{leftContent}</div>
      <div className="timeline-item-right">{rightContent}</div>
    </div>
  )
}
