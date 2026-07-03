import {
  NDA_ENV_MISSING_MESSAGE,
  getNdaEntry,
  isNdaConfigured,
  verifyNdaPassword,
} from '@/lib/ndaProtectedContent'

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

export async function POST(req: Request) {
  if (!isNdaConfigured()) {
    return json({ error: NDA_ENV_MISSING_MESSAGE }, 503)
  }

  let body: { slug?: unknown; password?: unknown }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const entry = getNdaEntry(body.slug)
  if (!entry) {
    return json({ error: 'Not found' }, 404)
  }

  if (!verifyNdaPassword(body.password)) {
    return json({ error: 'Incorrect password' }, 401)
  }

  return json({ title: entry.title, html: entry.html }, 200)
}
