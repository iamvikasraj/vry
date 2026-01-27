'use client'

import ChevronLink from './ChevronLink'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  linkHref?: string
  linkLabel?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export default function SectionHeader({
  title,
  subtitle,
  linkHref,
  linkLabel,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}: SectionHeaderProps) {
  // Determine title class based on context
  const getTitleClass = () => {
    if (titleClassName) return titleClassName
    if (className.includes('featured-header')) return 'featured-heading'
    if (className.includes('home-workshops-header')) return 'home-workshops-title'
    return 'section-header-title'
  }

  const getSubtitleClass = () => {
    if (subtitleClassName) return subtitleClassName
    // Use body1 typography class for consistency with design system
    return 'body1'
  }

  return (
    <div className={`section-header ${className}`}>
      <div>
        <h2 className={getTitleClass()}>{title}</h2>
        {subtitle && <p className={getSubtitleClass()}>{subtitle}</p>}
      </div>
      {linkHref && linkLabel && (
        <ChevronLink href={linkHref} ariaLabel={linkLabel} />
      )}
    </div>
  )
}
