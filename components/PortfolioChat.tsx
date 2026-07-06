'use client'

import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { analytics } from '@/lib/analytics'

type Role = 'user' | 'assistant'

interface Msg {
  role: Role
  content: string
}

type PortfolioChatProps = {
  projectSlug?: string
  projectTitle?: string
}

function renderAssistant(text: string): ReactNode {
  if (!text) return ''
  const parts = text.split(/(\bTi\b)/g)
  return parts.map((part, i) =>
    part === 'Ti' ? <span className="ti-name" key={i}>Ti</span> : <Fragment key={i}>{part}</Fragment>
  )
}

const GLOBAL_WELCOME: Msg = {
  role: 'assistant',
  content:
    "Hey—I'm Ti. I know this portfolio pretty well. Ask me about a project, how Vikas works, motion/Rive stuff, or whether he'd be a good fit for your team.",
}

const PROJECT_SUGGESTIONS = [
  'What did you own?',
  'The key design decision?',
  'What were the results?',
]

function buildProjectWelcome(projectTitle?: string): Msg {
  const label = projectTitle?.trim() || 'this case study'
  return {
    role: 'assistant',
    content: `Hey—I'm Ti. I've read ${label}. Ask me what Vikas owned, the key decisions, results, or how this fits his broader work.`,
  }
}

export default function PortfolioChat({ projectSlug, projectTitle }: PortfolioChatProps) {
  const welcome = useMemo(
    () => (projectSlug ? buildProjectWelcome(projectTitle) : GLOBAL_WELCOME),
    [projectSlug, projectTitle]
  )
  const [messages, setMessages] = useState<Msg[]>([welcome])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([welcome])
    setInput('')
    setError(null)
  }, [welcome])

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading])

  const showSuggestions =
    Boolean(projectSlug) && messages.length === 1 && messages[0]?.role === 'assistant' && !loading

  const send = useCallback(
    async (textOverride?: string) => {
      const text = (textOverride ?? input).trim()
      if (!text || loading) return

      setError(null)
      if (!textOverride) setInput('')
      const userMsg: Msg = { role: 'user', content: text }
      const history = [...messages, userMsg]
      setMessages(history)
      setLoading(true)
      analytics.trackChatMessageSent(text.length)

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: history.map(({ role, content }) => ({ role, content })),
            ...(projectSlug ? { projectSlug } : {}),
          }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || `Request failed (${res.status})`)
        }

        if (!res.body) throw new Error('No response body')

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let assistant = ''

        setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          assistant += decoder.decode(value, { stream: true })
          setMessages((prev) => {
            const next = [...prev]
            next[next.length - 1] = { role: 'assistant', content: assistant }
            return next
          })
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong')
        setMessages((prev) => prev.slice(0, -1))
      } finally {
        setLoading(false)
      }
    },
    [input, loading, messages, projectSlug]
  )

  return (
    <div className="portfolio-chat">
      <div className="portfolio-chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`portfolio-chat-bubble portfolio-chat-bubble--${m.role}`}>
            {m.role === 'user' && <div className="portfolio-chat-bubble-label">You</div>}
            <div className="portfolio-chat-bubble-text">
              {m.role === 'assistant'
                ? renderAssistant(m.content || (loading && i === messages.length - 1 ? '…' : ''))
                : m.content}
            </div>
          </div>
        ))}
        {showSuggestions && (
          <div className="portfolio-chat-suggestions" aria-label="Suggested questions">
            {PROJECT_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="portfolio-chat-suggestion"
                onClick={() => void send(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        {loading && messages[messages.length - 1]?.role === 'user' && (
          <div className="portfolio-chat-bubble portfolio-chat-bubble--assistant">
            <div className="portfolio-chat-bubble-text">…</div>
          </div>
        )}
        <div ref={scrollEndRef} aria-hidden="true" />
      </div>

      {error && <p className="portfolio-chat-error">{error}</p>}

      <form
        className="portfolio-chat-form"
        onSubmit={(e) => {
          e.preventDefault()
          void send()
        }}
      >
        <input
          type="text"
          className="portfolio-chat-input"
          placeholder={projectSlug ? 'Ask about this project…' : 'Ask me something…'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          autoComplete="off"
          aria-label="Message Ti"
        />
        <button type="submit" className="portfolio-chat-send" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}
