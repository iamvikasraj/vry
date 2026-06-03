type MediaPlaceholderProps = {
  className?: string
  /** Short line shown in the frame while media is not ready */
  label?: string
}

export default function MediaPlaceholder({
  className,
  label = 'Preview coming soon',
}: MediaPlaceholderProps) {
  return (
    <div
      className={`media-placeholder${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={label}
    >
      {label ? <span className="media-placeholder__label">{label}</span> : null}
    </div>
  )
}
