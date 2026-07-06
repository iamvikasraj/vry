import type { MDXComponents } from 'mdx/types'
import ProjectFigure from '@/components/mdx/ProjectFigure'
import ProjectFigureGrid from '@/components/mdx/ProjectFigureGrid'
import ProjectTool from '@/components/mdx/ProjectTool'
import ProjectTools from '@/components/mdx/ProjectTools'
import LinkedInEmbed from '@/components/mdx/LinkedInEmbed'
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => <div className="mdx-content">{children}</div>,
    h2: ({ children }) => {
      const label =
        typeof children === 'string'
          ? children
          : Array.isArray(children)
            ? children.map((child) => (typeof child === 'string' ? child : '')).join('')
            : ''
      const isLearnings = label.trim() === 'What I learned'
      return (
        <h2
          className={`project-section-title${isLearnings ? ' project-section-title--learnings' : ''}`}
        >
          {children}
        </h2>
      )
    },
    h3: ({ children }) => <h3 className="project-section-subtitle">{children}</h3>,
    p: ({ children }) => <p className="project-section-text">{children}</p>,
    ul: ({ children }) => <ul className="project-process-list">{children}</ul>,
    li: ({ children }) => <li className="project-process-item">{children}</li>,
    a: ({ href, children }) => (
      <a href={href} className="mdx-link" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    code: ({ children }) => <code className="mdx-code">{children}</code>,
    ProjectFigure,
    ProjectFigureGrid,
    ProjectTool,
    ProjectTools,
    LinkedInEmbed,
    ...components,
  }
}
