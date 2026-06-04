/**
 * Post-build smoke test for static export (`out/`).
 * Run: npm run build && node scripts/smoke-test.js
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const outDir = path.join(root, 'out')

function assertExists(relativePath) {
  const full = path.join(outDir, relativePath)
  if (!fs.existsSync(full)) {
    throw new Error(`Missing export: out/${relativePath}`)
  }
}

const routes = [
  'index.html',
  'live-projects/index.html',
  'live-projects/paytm/index.html',
  'live-projects/et-money/index.html',
  'live-projects/loop-health/index.html',
  'live-projects/time-bridge/index.html',
  'live-projects/grappus/index.html',
  'playground/index.html',
  'projects/loop-doctor-on-demand/index.html',
  'projects/loop-care-journey/index.html',
  'projects/business-insider/index.html',
  'projects/paytm-postpaid/index.html',
  'about/index.html',
]

function main() {
  if (!fs.existsSync(outDir)) {
    console.error('[smoke] No out/ folder — run `npm run build` first.')
    process.exit(1)
  }

  for (const route of routes) {
    assertExists(route)
  }

  const liveHtml = fs.readFileSync(path.join(outDir, 'live-projects/index.html'), 'utf8')
  if (liveHtml.includes('ReferenceError') || liveHtml.includes('Image is not defined')) {
    throw new Error('live-projects/index.html looks like an error page')
  }

  console.log(`[smoke] OK — ${routes.length} routes present in out/`)
}

try {
  main()
} catch (err) {
  console.error(`[smoke] FAILED: ${err.message}`)
  process.exit(1)
}
