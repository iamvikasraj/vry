import Link from 'next/link'

type PortfolioMoreLinkProps = {
  href: string
  title: string
  meta?: string
}

export default function PortfolioMoreLink({ href, title, meta }: PortfolioMoreLinkProps) {
  return (
    <Link href={href} className="home-de-project-list__link home-de-project-list__link--more">
      <span className="home-de-project-list__text">
        <span className="home-de-project-list__title">{title}</span>
        {meta ? <span className="home-de-project-list__meta">{meta}</span> : null}
      </span>
      <span className="home-de-project-list__cta" aria-hidden="true">
        →
      </span>
    </Link>
  )
}
