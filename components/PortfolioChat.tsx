'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { analytics } from '@/lib/analytics'
import type { TerminalUiSoundApi } from '@/hooks/useTerminalUiSound'

type Role = 'user' | 'assistant'

interface Msg {
  role: Role
  content: string
}

const WELCOME: Msg = {
  role: 'assistant',
  content: 'Hey. Ask whatever—work, motion, Rive, past roles, or where to find something on the site.',
}

export default function PortfolioChat({ terminalSound }: { terminalSound?: TerminalUiSoundApi }) {
  const [messages, setMessages] = useState<Msg[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

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

  return (
    <div className="portfolio-chat">
      <div className="portfolio-chat-messages" ref={listRef}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`portfolio-chat-bubble portfolio-chat-bubble--${m.role}`}
          >
            <div className="portfolio-chat-bubble-label">
              {m.role === 'user' ? 'You' : 'Portfolio'}
            </div>
            <div className="portfolio-chat-bubble-text">
              {m.content || (loading && i === messages.length - 1 && m.role === 'assistant' ? '…' : '')}
            </div>
          </div>
        ))}
        {loading && messages[messages.length - 1]?.role === 'user' && (
          <div className="portfolio-chat-bubble portfolio-chat-bubble--assistant">
            <div className="portfolio-chat-bubble-label">Portfolio</div>
            <div className="portfolio-chat-bubble-text">…</div>
          </div>
        )}
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
          placeholder="Ask anything about Vikas's work…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          autoComplete="off"
          aria-label="Message"
        />
        <button
          type="submit"
          className="portfolio-chat-send"
          disabled={loading || !input.trim()}
          onMouseEnter={() => terminalSound?.playHover()}
        >
          Send
        </button>
      </form>
    </div>
  )
}
