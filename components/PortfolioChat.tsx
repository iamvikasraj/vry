'use client'

import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { analytics } from '@/lib/analytics'
import type { TerminalUiSoundApi } from '@/hooks/useTerminalUiSound'

type Role = 'user' | 'assistant'

interface Msg {
  role: Role
  content: string
}

/** Renders assistant copy with “Ti” in small caps (matches terminal styling). */
function assistantTextWithTiSmallCaps(text: string): ReactNode {
  if (!text) return ''
  const parts = text.split(/(\bTi\b)/g)
  return parts.map((part, i) =>
    part === 'Ti' ? (
      <span className="ti-name" key={i}>
        Ti
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

const WELCOME_DEFAULT: Msg = {
  role: 'assistant',
  content:
    "Hey—I'm Ti. I know this portfolio pretty well, so ask me anything: a project, how Vikas works, motion/Rive stuff, or where to dig deeper on the site.",
}

export default function PortfolioChat({
  terminalSound,
  variant = 'default',
}: {
  terminalSound?: TerminalUiSoundApi
  variant?: 'default' | 'terminal'
}) {
  const [messages, setMessages] = useState<Msg[]>(() =>
    variant === 'terminal' ? [] : [WELCOME_DEFAULT]
  )
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (variant === 'terminal' && messages.length === 0 && !loading) return
    const el = scrollEndRef.current
    if (!el) return
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'end',
    })
  }, [messages, loading, variant])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    terminalSound?.playActivate()
    setError(null)
    setInput('')
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
      const msg = e instanceof Error ? e.message : 'Something went wrong'
      setError(msg)
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages, terminalSound])

  const terminalThreadHidden =
    variant === 'terminal' && messages.length === 0 && !loading

  return (
    <div
      className={
        variant === 'terminal'
          ? `portfolio-chat portfolio-chat--terminal${terminalThreadHidden ? ' portfolio-chat--terminal-empty' : ''}`
          : 'portfolio-chat'
      }
    >
      <div
        className="portfolio-chat-messages"
        hidden={terminalThreadHidden}
        aria-hidden={terminalThreadHidden}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`portfolio-chat-bubble portfolio-chat-bubble--${m.role}`}
          >
            {m.role === 'user' ? (
              <div className="portfolio-chat-bubble-label">You</div>
            ) : null}
            <div className="portfolio-chat-bubble-text">
              {m.role === 'assistant'
                ? assistantTextWithTiSmallCaps(
                    m.content ||
                      (loading && i === messages.length - 1 ? '…' : '')
                  )
                : m.content}
            </div>
          </div>
        ))}
        {loading && messages[messages.length - 1]?.role === 'user' && (
          <div className="portfolio-chat-bubble portfolio-chat-bubble--assistant">
            <div className="portfolio-chat-bubble-text">…</div>
          </div>
        )}
        <div
          ref={scrollEndRef}
          className="portfolio-chat-scroll-anchor"
          aria-hidden="true"
        />
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
          placeholder={
            variant === 'terminal'
              ? 'Ask in your own words…'
              : 'Ask me something…'
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          autoComplete="off"
          aria-label={variant === 'terminal' ? 'Message Ti' : 'Message'}
        />
        <button
          type="submit"
          className="portfolio-chat-send"
          disabled={loading || !input.trim()}
          onMouseEnter={() => terminalSound?.playHover()}
        >
          {variant === 'terminal' ? 'send' : 'Send'}
        </button>
      </form>
    </div>
  )
}
