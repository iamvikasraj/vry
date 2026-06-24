'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getDeListHref } from '@/lib/deNav'
import { SOCIAL_LINKS } from '@/lib/socialLinks'

export default function ProjectArticleFooter() {
  const listHref = getDeListHref(usePathname())
  const year = new Date().getFullYear()

  return (
    <footer className="de-article-footer" aria-label="Site footer">
      <div className="de-article-footer__inner">
        <p className="de-article-footer__brand">
          <Link href={listHref} className="de-article-footer__brand-link">
            Vikas Raj Yadav
          </Link>
        </p>

        <div className="de-article-footer__rule" aria-hidden />

        <div className="de-article-footer__bottom">
          <div className="de-article-footer__bottom-start">
            <p className="de-article-footer__copyright">© {year} Vikas Raj Yadav</p>
            <span className="de-article-footer__bottom-sep" aria-hidden>
              ·
            </span>
            <Link href="/#about" className="de-article-footer__link">
              About
            </Link>
          </div>
          <nav className="de-article-footer__social" aria-label="Social links">
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <a
                key={href}
                href={href}
                className="de-article-footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <i className={icon} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
