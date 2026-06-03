/**
 * `next build` (static export) and `next dev` must not share the same dist folder.
 * A production `.next` causes dev errors like: Cannot find module './682.js'
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const devDir = path.join(root, '.next')

function isProductionCache(dir) {
  if (!fs.existsSync(dir)) return false
  const markers = ['export-marker.json', 'export-detail.json']
  return markers.some((name) => fs.existsSync(path.join(dir, name)))
}

if (isProductionCache(devDir)) {
  fs.rmSync(devDir, { recursive: true, force: true })
  console.log('[dev] Cleared .next — it contained a production/static export build.')
}
