import {
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

  if (!getChatApiKey()) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error:
          'Chat is not configured. Set XAI_API_KEY or OPENAI_API_KEY in Netlify environment variables.',
      }),
    }
  }

  let parsed: { messages?: unknown }
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

  try {
    let body = ''
    for await (const chunk of streamAssistantDeltas(messages)) {
      body += chunk
    }
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
      body,
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Chat request failed'
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: message }),
    }
  }
}
