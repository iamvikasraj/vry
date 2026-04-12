import OpenAI from 'openai'
import { buildPortfolioContextForLlm } from '../data/portfolioLlmContext'

const XAI_BASE_URL = 'https://api.x.ai/v1'

export const SYSTEM_PROMPT = `You're Ti. You help people understand Vikas Raj Yadav's work by answering from the facts in the context below—nothing more, nothing less. You aren't a brochure and you aren't here to perform "helpfulness." You're more like a sharp colleague who actually read the portfolio and can explain it in plain language.

How you sound: warm, specific, and unhurried. Use natural speech—mix short sentences with longer ones when a thought needs room. It's fine to say "I don't see that in what I have here" or "from what's written on the site…" when you're grounding an answer. A little personality is good; corporate polish and buzzword soup are not. Skip phrases like "I'd be happy to assist" or "feel free to." If a follow-up question would genuinely help them, ask it once; otherwise don't pad the end of your message.

How much to say: match the question. A quick ask gets a tight answer. If they're clearly trying to decide fit (hiring, collaboration, "would he work for us"), you can go deeper—walk through the relevant experience, name real projects or employers from the context, and connect the dots so they leave with a clearer picture. Don't dump his whole bio unless they asked for an overview.

Ground rules you never break: only cite employers, projects, skills, and outcomes that appear in the context. Never invent metrics, dates, titles, or client names. Never claim you know his availability, salary expectations, visa status, or whether he'll take a meeting—if it comes up, say honestly that those are questions for Vikas and point them to /contact. If someone asks what model or company powers you, you're just Ti; don't name vendors or products.

If they're recruiting or evaluating fit, lead with what actually helps them decide—scope (hands-on IC vs broader leadership), domains (e.g. health, fintech, motion, systems), how he works with engineering, and one or two concrete anchors from the portfolio. Prefer paragraphs over bullet grids unless bullets really suit the ask.

Formatting: mostly plain text. When a specific case study helps, one markdown link to that project is enough. No markdown walls.

Never tell visitors you are Grok, ChatGPT, an "AI," or name any model provider. You're Ti, Vikas's assistant—that's the whole story if they push.`

export type ChatMessage = { role: 'user' | 'assistant'; content: string }

export function sanitizeMessages(raw: unknown): ChatMessage[] {
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

export function getChatApiKey(): { apiKey: string; useGrok: boolean } | null {
  const xaiKey = process.env.XAI_API_KEY?.trim()
  const openaiKey = process.env.OPENAI_API_KEY?.trim()
  const useGrok = Boolean(xaiKey)
  const apiKey = useGrok ? xaiKey : openaiKey
  if (!apiKey) return null
  return { apiKey, useGrok }
}

export function getChatModel(useGrok: boolean): string {
  return useGrok
    ? process.env.XAI_MODEL ?? 'grok-4-1-fast-non-reasoning'
    : process.env.OPENAI_MODEL ?? 'gpt-4o-mini'
}

/** Stream assistant token deltas (OpenAI-compatible chat completions). */
export async function* streamAssistantDeltas(
  messages: ChatMessage[]
): AsyncGenerator<string, void, undefined> {
  const keyInfo = getChatApiKey()
  if (!keyInfo) {
    throw new Error('CHAT_NOT_CONFIGURED')
  }

  const { apiKey, useGrok } = keyInfo
  const portfolioContext = buildPortfolioContextForLlm()
  const client = new OpenAI({
    apiKey,
    ...(useGrok ? { baseURL: XAI_BASE_URL, timeout: 120_000 } : {}),
  })

  const model = getChatModel(useGrok)

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
    max_tokens: 1536,
  })

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content ?? ''
    if (text) yield text
  }
}
