# Task: Add a per-case-study "Ask Ti" chat, scoped to each project

## Context (this repo)
- Next.js App Router portfolio. Case studies = structured metadata in
  `data/projects.ts` (the `Project` interface) + narrative MDX in
  `content/projects/<slug>.mdx` (custom components: `<ProjectFigure>`,
  `<ProjectFigureGrid>`, `<ProjectTool>`).
- An existing site-wide AI assistant "Ti":
  - `lib/portfolio-chat-llm.ts` — `streamAssistantDeltas(messages)` builds the
    LLM call; injects context via `buildPortfolioContextForLlm()`; OpenAI-compatible
    client (xAI Grok or OpenAI), system prompt `SYSTEM_PROMPT`.
  - `data/portfolioLlmContext.ts` — `buildPortfolioContextForLlm()` returns a
    plain text grounding string. TODAY it only includes one-line project
    descriptions (NOT the MDX narrative), so Ti can't answer deep project questions.
  - Entry points: `app/api/chat/route.ts` (streaming) and
    `netlify/functions/chat.ts` (buffered). Both call `streamAssistantDeltas(messages)`.
  - `components/PortfolioChat.tsx` — client chat UI; POSTs `{ messages }` to `/api/chat`.
- Project page: `app/projects/[slug]/page.tsx` renders `<ProjectArticleFooter />`
  at the end; loads MDX via dynamic import.

## Goal
Ground Ti in a SINGLE project's full content when the chat is opened from that
project's case study, so it can answer detailed questions. Prototype on ONE
project first: `loop-doctor-on-demand`.

## Changes

### 1. data/portfolioLlmContext.ts — new function
Add `buildProjectContextForLlm(slug: string): string`:
- `getProjectBySlug(slug)` for metadata (title, client, role, context, process[],
  results, tools, heroCaption).
- Read narrative from disk:
  `fs.readFileSync(path.join(process.cwd(), 'content/projects', `${slug}.mdx`), 'utf8')`.
- Clean the MDX to prose: remove `import ...` lines and JSX tags like
  `<ProjectFigure .../>`, but PRESERVE the text inside `caption="..."` attributes
  (append captions as sentences). Keep headings and paragraphs.
- Prepend a slim bio (reuse the opening paragraph from
  `buildPortfolioContextForLlm`) so hiring/fit questions still work.
- Return a grounding string in the same spirit as the global one.
- Guard: if the file is missing, fall back to metadata only.

### 2. lib/portfolio-chat-llm.ts
Change signature to
`streamAssistantDeltas(messages, opts?: { projectSlug?: string })`:
- If `opts?.projectSlug`, set `portfolioContext = buildProjectContextForLlm(slug)`
  and append to SYSTEM_PROMPT: `You are answering specifically about the case
  study "<project title>". Prefer details from this project; you may draw on the
  wider portfolio only for fit/background.`
- Else keep current global behavior. Do not break existing callers.

### 3. app/api/chat/route.ts AND netlify/functions/chat.ts
- Parse `projectSlug` from the request body (optional string).
- Pass `{ projectSlug }` to `streamAssistantDeltas`.

### 4. components/PortfolioChat.tsx
- Add prop `projectSlug?: string` (+ optional `projectTitle?: string`).
- Include `projectSlug` in the POST body.
- When set: change WELCOME copy to be project-specific and render 2–3 seeded
  suggestion chips (e.g. "What did you own?", "The key design decision?",
  "What were the results?") that populate the input / send on click.

### 5. app/projects/[slug]/page.tsx
- Render `<PortfolioChat projectSlug={slug} projectTitle={project.title} />`
  immediately before `<ProjectArticleFooter />`.
- PROTOTYPE GATE: only render when `slug === 'loop-doctor-on-demand'`.

## Gotchas
- `buildProjectContextForLlm` uses Node `fs` — server-only. NEVER import it into a
  `'use client'` file. It runs inside the API route / Netlify function (server).
- Keep token budget small: only ONE project's MDX (few KB), never all projects.
- Don't regress the global `/chat` page or the existing site-wide chat.

## Acceptance
- On `/projects/loop-doctor-on-demand`, the footer chat answers a detailed
  question drawn from the MDX (e.g. the removed intro screen, the 30% conversion
  lift) that global Ti currently cannot.
- `npm run build` passes.
- Global Ti (`/chat`) behaves exactly as before.
