import {
  CHAT_ENV_MISSING_MESSAGE,
  getChatApiKey,
  sanitizeMessages,
  streamAssistantDeltas,
} from '../../lib/portfolio-chat-llm'

type NetlifyHandler = (event: {
  httpMethod?: string | null
  body?: string | null
}) => Promise<{
  statusCode: number
  headers?: Record<string, string>
  body: string
}>

export const handler: NetlifyHandler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  const keyInfo = getChatApiKey()
  console.log('[Ti chat] key detected:', keyInfo ? `yes (grok=${keyInfo.useGrok})` : 'no')
  if (!keyInfo) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: CHAT_ENV_MISSING_MESSAGE }),
    }
  }

  let parsed: { messages?: unknown; projectSlug?: unknown }
  try {
    parsed = JSON.parse(event.body || '{}')
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON' }),
    }
  }

  const messages = sanitizeMessages(parsed.messages)
  if (messages.length === 0) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'No messages' }),
    }
  }

  const projectSlug =
    typeof parsed.projectSlug === 'string' && parsed.projectSlug.trim()
      ? parsed.projectSlug.trim()
      : undefined

  try {
    console.log('[Ti chat] starting xAI request')
    let body = ''
    for await (const chunk of streamAssistantDeltas(messages, { projectSlug })) {
      body += chunk
    }
    console.log('[Ti chat] response ok, length:', body.length)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
      body,
    }
  } catch (e) {
    console.error('[Ti chat] error:', e)
    const message = e instanceof Error ? e.message : 'Chat request failed'
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: message }),
    }
  }
}
