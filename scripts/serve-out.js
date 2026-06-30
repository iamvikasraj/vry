#!/usr/bin/env node
/**
 * Serve static export from `out/` (this project uses output: 'export', not `next start`).
 */
const fs = require('fs')
const http = require('http')
const path = require('path')

const root = path.join(__dirname, '..', 'out')
const port = Number(process.env.PORT || 3000)
const host = process.env.HOSTNAME || '0.0.0.0'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0])
  const rel = decoded.replace(/^\/+/, '')
  let file = path.join(root, rel)

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, 'index.html')
  }

  if (!fs.existsSync(file) && !path.extname(file)) {
    const withHtml = `${file}.html`
    if (fs.existsSync(withHtml)) file = withHtml
  }

  if (!fs.existsSync(file) && !path.extname(decoded)) {
    const trailing = path.join(root, rel, 'index.html')
    if (fs.existsSync(trailing)) file = trailing
  }

  if (!file.startsWith(root)) return null
  return fs.existsSync(file) && fs.statSync(file).isFile() ? file : null
}

if (!fs.existsSync(root)) {
  console.error('[preview] No out/ folder — run `npm run build` first.')
  process.exit(1)
}

http
  .createServer((req, res) => {
    const file = resolveFile(req.url || '/')
    if (!file) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Not found')
      return
    }

    const ext = path.extname(file).toLowerCase()
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    fs.createReadStream(file).pipe(res)
  })
  .listen(port, host, () => {
    console.log(`[preview] Serving out/ at http://localhost:${port}`)
  })
