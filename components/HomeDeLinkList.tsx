import { mediaAssetPath } from '@/lib/mediaAssetPath'

export type HomeDeLinkItem = {
  key: string
  title: string
  href: string
  /** One line under the title — what it is and what it shows. */
  line?: string
  /** Small looping clip on the left; rows without one get a neutral tile. */
  video?: string
}

/** Text section list (About typography) — small thumb, title links out, one line beneath. */
export default function HomeDeLinkList({ items }: { items: HomeDeLinkItem[] }) {
  return (
    <ul className="home-de-link-list">
      {items.map((item) => (
        <li key={item.key} className="home-de-link-list__item">
          <a
            className="home-de-link-list__thumb"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden="true"
          >
            {item.video ? (
              <video
                src={mediaAssetPath(item.video)}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
              />
            ) : (
              <i className="fa-brands fa-github" />
            )}
          </a>
          <div className="home-de-link-list__text">
            <a
              className="home-de-link-list__title"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title}
              <span className="home-de-link-list__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            {item.line ? <p className="home-de-link-list__line">{item.line}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  )
}
