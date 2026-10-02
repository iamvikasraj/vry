export type HomeDeLinkItem = {
  key: string
  title: string
  href: string
  /** One line under the title — what it is and what it shows. */
  line?: string
}

/** Text-only section list (About typography) — title links out, one line beneath. */
export default function HomeDeLinkList({ items }: { items: HomeDeLinkItem[] }) {
  return (
    <ul className="home-de-link-list">
      {items.map((item) => (
        <li key={item.key} className="home-de-link-list__item">
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
        </li>
      ))}
    </ul>
  )
}
