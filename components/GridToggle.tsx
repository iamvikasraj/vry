'use client'

interface GridToggleProps {
  gridSize: '2x2' | '4x4'
  onToggle: (size: '2x2' | '4x4') => void
}

export default function GridToggle({ gridSize, onToggle }: GridToggleProps) {
  return (
    <div className="grid-toggle">
      <button
        type="button"
        className={`toggle-btn ${gridSize === '2x2' ? 'active' : ''}`}
        onClick={() => onToggle('2x2')}
        aria-label="2x2 Grid View"
      >
        2×2
      </button>
      <button
        type="button"
        className={`toggle-btn ${gridSize === '4x4' ? 'active' : ''}`}
        onClick={() => onToggle('4x4')}
        aria-label="4x4 Grid View"
      >
        4×4
      </button>
    </div>
  )
}
