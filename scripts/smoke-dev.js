/**
 * Hit key routes on a running dev server (default http://127.0.0.1:3000).
 * Usage: node scripts/smoke-dev.js [baseUrl]
 */
const base = (process.argv[2] || 'http://127.0.0.1:3000').replace(/\/$/, '')

const paths = [
  '/live-projects/',
  '/live-projects/paytm/',
  '/live-projects/et-money/',
  '/live-projects/loop-health/',
  '/live-projects/time-bridge/',
  '/live-projects/grappus/',
  '/playground/',
  '/projects/business-insider/',
  '/projects/paytm-postpaid/',
]

async function check(pathname) {
  const url = `${base}${pathname}`
  const res = await fetch(url, { redirect: 'follow' })
  const text = await res.text()
  if (res.status >= 400) {
    throw new Error(`${pathname} → HTTP ${res.status}`)
  }
  if (text.includes('ReferenceError') || text.includes('Image is not defined')) {
    throw new Error(`${pathname} → runtime error in HTML`)
  }
  return res.status
}

async function main() {
  const results = []
  for (const pathname of paths) {
    const status = await check(pathname)
    results.push({ pathname, status })
    console.log(`[smoke-dev] ${status} ${pathname}`)
  }
  console.log(`[smoke-dev] OK — ${results.length} routes`)
}

main().catch((err) => {
  console.error(`[smoke-dev] FAILED: ${err.message}`)
  console.error('[smoke-dev] Start dev first: npm run dev:clean')
  process.exit(1)
})
