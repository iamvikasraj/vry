/**
 * Production build leaves a `.next` cache incompatible with `next dev`.
 * Static files live in `out/` — safe to delete `.next` after export.
 */
const fs = require('fs')
const path = require('path')

const nextDir = path.join(__dirname, '..', '.next')

if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true })
  console.log('[build] Removed .next — use `npm run dev` for local development.')
}
