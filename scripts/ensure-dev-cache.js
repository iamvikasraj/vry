/**
 * `next build` (static export) and `next dev` must not share the same dist folder.
 * A production `.next` causes dev errors like: Cannot find module './682.js'
 *
 * Webpack disk pack cache (.next/cache/webpack/...pack.gz) often goes stale when:
 * - postbuild deletes .next while another process still has dev open
 * - dev is killed mid-write (`.pack.gz_` temp files, or index pointing at missing packs)
 * - `npm run build` and `npm run dev` overlap
 *
 * Fix: wipe webpack cache before every dev start; use in-memory webpack cache in dev (next.config.js).
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const nextDir = path.join(root, '.next')
const webpackCacheDir = path.join(nextDir, 'cache', 'webpack')

function isProductionCache(dir) {
  if (!fs.existsSync(dir)) return false
  const markers = ['export-marker.json', 'export-detail.json']
  return markers.some((name) => fs.existsSync(path.join(dir, name)))
}

if (isProductionCache(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true })
  console.log('[dev] Cleared .next — it contained a production/static export build.')
} else if (fs.existsSync(nextDir)) {
  // Wipe all of .next when restarting dev — avoids 404 chunks + missing .pack.gz after build/postbuild.
  fs.rmSync(nextDir, { recursive: true, force: true })
  console.log('[dev] Cleared .next before dev (clean compile).')
}
