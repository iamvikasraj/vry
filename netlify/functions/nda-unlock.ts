import {
  NDA_ENV_MISSING_MESSAGE,
  getNdaEntry,
  isNdaConfigured,
  verifyNdaPassword,
} from '../../lib/ndaProtectedContent'

type NetlifyHandler = (event: {
  httpMethod?: string | null
  body?: string | null
}) => Promise<{
  statusCode: number
  headers?: Record<string, string>
  body: string
}>

const jsonHeaders = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }

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
    return { statusCode: 405, headers: jsonHeaders, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  if (!isNdaConfigured()) {
    return { statusCode: 503, headers: jsonHeaders, body: JSON.stringify({ error: NDA_ENV_MISSING_MESSAGE }) }
  }

  let parsed: { slug?: unknown; password?: unknown }
  try {
    parsed = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, headers: jsonHeaders, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const entry = getNdaEntry(parsed.slug)
  if (!entry) {
    return { statusCode: 404, headers: jsonHeaders, body: JSON.stringify({ error: 'Not found' }) }
  }

  if (!verifyNdaPassword(parsed.password)) {
    return { statusCode: 401, headers: jsonHeaders, body: JSON.stringify({ error: 'Incorrect password' }) }
  }

  return { statusCode: 200, headers: jsonHeaders, body: JSON.stringify({ title: entry.title, html: entry.html }) }
}
