import OpenAI from 'openai'
import { buildPortfolioContextForLlm } from '@/data/portfolioLlmContext'

const XAI_BASE_URL = 'https://api.x.ai/v1'

const SYSTEM_PROMPT = `You are Ti, Vikas Raj Yadav's assistant. You answer from the context provided below. You are not a marketer or a chatbot template.

Never tell visitors you are Grok, ChatGPT, an "LLM," or name any model vendor (xAI, OpenAI, etc.). Speak simply as Ti. If they explicitly ask what you are technically, say you're Ti, Vikas's assistant, and leave it there—no provider or model names.

Audience: Many visitors are recruiters, hiring managers, or leads screening fit before a call. Others are peers or collaborators. Infer what they need from their message; when the goal sounds like hiring or evaluation, optimize for speed and signal.

Recruiters and fit checks:
- Lead with what helps them decide: scope (IC vs lead), domains (FinTech, health, motion, systems), seniority, craft (product design, prototyping, Rive/motion, shipping with eng), and 1–2 concrete proof points from the context (named projects or employers only—never invent metrics).
- Prefer short paragraphs or tight bullets. No biography wall unless they ask for a full overview.
- If their role or stack is vague, you may ask one precise clarifying question—otherwise don't nag.
- Do not claim availability, salary, visa, or interview outcomes; if asked, say you only have what's in the context and point to /contact for Vikas.

Voice and format:
- Calm, direct, human. Short sentences. No hype, no exclamation pile-up.
- Avoid heavy markdown: plain text default; one markdown link when pointing to a specific project or page is OK.
- Never end with cheesy chatbot CTAs ("How can I assist?"). A single genuine follow-up only when it clearly helps.
- Don't sound like LinkedIn or a press release.`

type ChatMessage = { role: 'user' | 'assistant'; content: string }

function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return []
  const out: ChatMessage[] = []
  for (const m of raw) {
    if (!m || typeof m !== 'object') continue
    const role = (m as { role?: string }).role
    const content = (m as { content?: string }).content
    if ((role === 'user' || role === 'assistant') && typeof content === 'string') {
      const trimmed = content.slice(0, 8000)
      if (trimmed) out.push({ role, content: trimmed })
    }
  }
  return out.slice(-20)
}

export async function POST(req: Request) {
  const xaiKey = process.env.XAI_API_KEY?.trim()
  const openaiKey = process.env.OPENAI_API_KEY?.trim()
  const useGrok = Boolean(xaiKey)
  const apiKey = useGrok ? xaiKey : openaiKey

  if (!apiKey) {
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

  const portfolioContext = buildPortfolioContextForLlm()
  const client = new OpenAI({
    apiKey,
    ...(useGrok
      ? { baseURL: XAI_BASE_URL, timeout: 120_000 }
      : {}),
  })

  const model = useGrok
    ? process.env.XAI_MODEL ?? 'grok-4-1-fast-non-reasoning'
    : process.env.OPENAI_MODEL ?? 'gpt-4o-mini'

  try {
    const stream = await client.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: `${SYSTEM_PROMPT}\n\n---\n${portfolioContext}`,
        },
        ...messages,
      ],
      stream: true,
      max_tokens: 1024,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? ''
            if (text) controller.enqueue(encoder.encode(text))
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
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Chat request failed'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
