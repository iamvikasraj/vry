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

  for (const file of ['index.html', 'live-projects/index.html', 'playground/index.html']) {
    const html = fs.readFileSync(path.join(outDir, file), 'utf8')
    if (html.includes('ReferenceError') || html.includes('Image is not defined')) {
      throw new Error(`${file} looks like an error page`)
    }
    if (
      !html.includes('id="live-projects"') ||
      !html.includes('id="playground"') ||
      !html.includes('id="workshops"')
    ) {
      throw new Error(`${file} missing single-page portfolio sections`)
    }
  }

  console.log(`[smoke] OK — ${routes.length} routes present in out/`)
}

try {
  main()
} catch (err) {
  console.error(`[smoke] FAILED: ${err.message}`)
  process.exit(1)
}
