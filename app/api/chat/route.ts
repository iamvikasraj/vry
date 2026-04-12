import {
  getChatApiKey,
  sanitizeMessages,
  streamAssistantDeltas,
} from '@/lib/portfolio-chat-llm'

export async function POST(req: Request) {
  if (!getChatApiKey()) {
    return new Response(
      JSON.stringify({
        error:
          'Chat is not configured. Set XAI_API_KEY or OPENAI_API_KEY in your environment.',
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }

  let body: { messages?: unknown }
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

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const text of streamAssistantDeltas(messages)) {
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
