/** Neutral skeleton while media loads or is missing — no picture-frame icon (reads as "image" on video cards). */
export default function MediaPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={`media-placeholder${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    />
  )
}
