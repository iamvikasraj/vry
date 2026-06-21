/**
 * `next build` (static export) and `next dev` must not share the same dist folder.
 * A production `.next` causes dev errors like: Cannot find module './682.js'
 *
 * Dev can also pollute `out/` (static export) if distDir ever overlaps — that breaks
 * the next dev server with missing `out/server/middleware-manifest.json`.
 *
 * Fix: wipe webpack cache before every dev start; strip dev artifacts from `out/`.
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const nextDir = path.join(root, '.next')
const outDir = path.join(root, 'out')

const OUT_DEV_ARTIFACTS = [
  'server',
  'cache',
  'app-build-manifest.json',
  'build-manifest.json',
  'react-loadable-manifest.json',
]

function isProductionCache(dir) {
  if (!fs.existsSync(dir)) return false
  const markers = ['export-marker.json', 'export-detail.json']
  return markers.some((name) => fs.existsSync(path.join(dir, name)))
}

function cleanDevArtifactsFromOut() {
  if (!fs.existsSync(outDir)) return

  let removed = false
  for (const name of OUT_DEV_ARTIFACTS) {
    const target = path.join(outDir, name)
    if (!fs.existsSync(target)) continue
    fs.rmSync(target, { recursive: true, force: true })
    removed = true
  }

  if (removed) {
    console.log('[dev] Removed stale dev artifacts from out/ (static export folder).')
  }
}

if (isProductionCache(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true })
  console.log('[dev] Cleared .next — it contained a production/static export build.')
} else if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true })
  console.log('[dev] Cleared .next before dev (clean compile).')
}

cleanDevArtifactsFromOut()
