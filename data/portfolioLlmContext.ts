import fs from 'fs'
import path from 'path'
import { getProjectBySlug, projects, type Project } from './projects'
import { tiCorrections } from './tiCorrections'

const SITE = 'https://vikasrajyadav.in'

const SLIM_BIO = `Vikas is a **Staff Product Designer & Technologist** based in Bengaluru, at **Loop Health** (YC S20). He's been in product design for **10+ years**, with serious time in fintech and regulated spaces—think **ETMoney, HDFC Bank, Paytm**, and other teams listed on his work page. He's also a **Rive and Play ambassador** in India; motion, interaction craft, prototyping (including SwiftUI), and design systems are real strengths, not buzzwords here.`

function extractXmlAttr(block: string, name: string): string | null {
  const double = block.match(new RegExp(`${name}="([^"]*)"`, 'i'))
  if (double) return double[1]
  const single = block.match(new RegExp(`${name}='([^']*)'`, 'i'))
  return single ? single[1] : null
}

function formatHeroCaption(heroCaption: Project['heroCaption']): string | null {
  if (!heroCaption) return null
  if (heroCaption.outcomeParts?.length) {
    return `Hero caption: ${heroCaption.outcomeParts.map((p) => p.text).join('')}`
  }
  if (heroCaption.outcome) return `Hero caption: ${heroCaption.outcome}`
  if (heroCaption.text) return `Hero caption: ${heroCaption.text}`
  return null
}

/** Strip MDX/JSX to plain prose for LLM grounding — server-only (uses fs). */
export function cleanMdxToProse(raw: string): string {
  let text = raw.replace(/^import\s+.+$/gm, '')

  text = text.replace(/<ProjectFigure[\s\S]*?\/>/gi, (block) => {
    const caption = extractXmlAttr(block, 'caption')
    if (caption) return `\n${caption}.\n`
    const alt = extractXmlAttr(block, 'alt')
    if (alt) return `\n[Figure: ${alt}]\n`
    return '\n'
  })

  text = text.replace(
    /<ProjectTool[^>]*name="([^"]*)"[^>]*description="([^"]*)"[^>]*\/?>/gi,
    (_, name: string, description: string) => `- ${name} — ${description}`
  )

  text = text.replace(/<\/?ProjectTools>/gi, '')
  text = text.replace(/<\/?ProjectFigureGrid>/gi, '')
  text = text.replace(/<[^>]+>/g, '')
  text = text.replace(/\n{3,}/g, '\n\n')

  return text.trim()
}

export function buildProjectContextForLlm(slug: string): string {
  const project = getProjectBySlug(slug)
  if (!project) {
    return buildPortfolioContextForLlm()
  }

  let narrative = ''
  const mdxPath = path.join(process.cwd(), 'content/projects', `${slug}.mdx`)
  try {
    if (fs.existsSync(mdxPath)) {
      narrative = cleanMdxToProse(fs.readFileSync(mdxPath, 'utf8'))
    }
  } catch {
    // fall back to metadata only
  }

  const meta: string[] = [
    `**${project.title}** (URL: ${SITE}/projects/${project.slug}/)`,
    project.client ? `Client: ${project.client}` : '',
    project.role ? `Role: ${project.role}` : '',
    `Summary: ${project.description}`,
    project.context ? `Context: ${project.context}` : '',
    project.process?.length
      ? `Process:\n${project.process.map((step) => `- ${step}`).join('\n')}`
      : '',
    project.results ? `Results: ${project.results}` : '',
    project.tools?.length ? `Tools: ${project.tools.join(', ')}` : '',
    formatHeroCaption(project.heroCaption) ?? '',
  ].filter(Boolean)

  return `
## Background (Vikas — for fit/background questions)

${SLIM_BIO}

## Case study: ${project.title}

${meta.join('\n')}

## Full case study narrative (primary source — prefer this for project-specific questions)

${narrative || '(Narrative MDX not available — use metadata above only.)'}

## How to use this in replies

Answer specifically about this case study. Paraphrase from the narrative; cite real details (decisions, metrics, tools) only when they appear above. If something isn't covered, say so plainly.

${tiCorrections ? `\n\n${tiCorrections}` : ''}
`.trim()
}

export function buildPortfolioContextForLlm(): string {
  const projectLines = projects.map(
    (p) =>
      `- **${p.title}** (slug: \`${p.slug}\`, URL: ${SITE}/projects/${p.slug}/) — ${p.description} Tags: ${p.tags.join(', ')}. ${p.client ? `Client: ${p.client}. ` : ''}${p.role ? `Role: ${p.role}.` : ''}`
  )

  return `
## What you're working from (facts only—don't embellish)

${SLIM_BIO}

People land on this site for different reasons: some are hiring or doing a first-pass fit check, others are designers or founders looking for a peer. Use whatever they give you in their message to guess which it is, then answer like a human who wants them to leave informed, not sold.

Handy links when you need to point somewhere: **Work** ${SITE}/work/, **About** ${SITE}/#about, **Workshops** ${SITE}/workshops/, **Contact** ${SITE}/contact/

## Case studies and projects (when you mention one, link it once)

${projectLines.join('\n')}

## How to use this material in replies

You don't have to sound like documentation. Paraphrase; connect ideas; explain *why* a project or role might matter for *their* question. If a case study fits, name it in natural language and drop a single markdown link like \`[title](${SITE}/projects/slug/)\` so they can read more.

If they ask something the context doesn't cover, say so plainly—no hedging essay—and suggest the most useful next step (often /work or /contact) in one short sentence. Never stretch the facts to sound more impressive.

For hiring-style questions ("would he fit…", "has he done X"), give a real opinion grounded only in what's above: what lines up, what's unclear, and where they'd go to verify. You're not his calendar and you're not negotiating; anything about meetings, rates, or start dates goes to Vikas via /contact.

${tiCorrections ? `\n\n${tiCorrections}` : ''}
`.trim()
}
