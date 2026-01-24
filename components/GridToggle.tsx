'use client'

import { analytics } from '@/lib/analytics'

interface GridToggleProps {
  gridSize: '1x1' | '2x2'
  onToggle: (size: '1x1' | '2x2') => void
}

export default function GridToggle({ gridSize, onToggle }: GridToggleProps) {
  return (
    <div className="grid-toggle">
      <div className="toggle-container">
        <button
          type="button"
          className={`toggle-btn toggle-btn-single ${gridSize === '1x1' ? 'active' : ''}`}
          onClick={() => {
            onToggle('1x1')
            analytics.trackGridToggle('1x1')
          }}
          aria-label="1x1 Grid View"
        >
          <span className="grid-icon">
            <span className="grid-dot"></span>
          </span>
        </button>
        <button
          type="button"
          className={`toggle-btn ${gridSize === '2x2' ? 'active' : ''}`}
          onClick={() => {
            onToggle('2x2')
            analytics.trackGridToggle('2x2')
          }}
          aria-label="2x2 Grid View"
        >
          <span className="grid-icon">
            <span className="grid-dot"></span>
            <span className="grid-dot"></span>
          </span>
        </button>
      </div>
    </div>
  )
}
