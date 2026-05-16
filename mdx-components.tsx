import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => <div className="mdx-content">{children}</div>,
    h2: ({ children }) => <h2 className="project-section-title">{children}</h2>,
    h3: ({ children }) => <h3 className="project-section-subtitle">{children}</h3>,
    p: ({ children }) => <p className="project-section-text">{children}</p>,
    ul: ({ children }) => <ul className="project-process-list">{children}</ul>,
    li: ({ children }) => <li className="project-process-item">{children}</li>,
    strong: ({ children }) => <strong className="mdx-strong">{children}</strong>,
    code: ({ children }) => <code className="mdx-code">{children}</code>,
    ...components,
  }
}
