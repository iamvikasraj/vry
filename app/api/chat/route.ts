import {
  CHAT_ENV_MISSING_MESSAGE,
  getChatApiKey,
  sanitizeMessages,
  streamAssistantDeltas,
} from '@/lib/portfolio-chat-llm'

export async function POST(req: Request) {
  if (!getChatApiKey()) {
    return new Response(JSON.stringify({ error: CHAT_ENV_MISSING_MESSAGE }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: { messages?: unknown; projectSlug?: unknown }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const messages = sanitizeMessages(body.messages)
  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: 'No messages' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const projectSlug =
    typeof body.projectSlug === 'string' && body.projectSlug.trim()
      ? body.projectSlug.trim()
      : undefined

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const text of streamAssistantDeltas(messages, { projectSlug })) {
          controller.enqueue(encoder.encode(text))
        }
      } catch (e) {
        controller.error(e)
        return
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
