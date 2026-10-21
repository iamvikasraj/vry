/** @type {import('next').NextConfig} */
const createMDX = require('@next/mdx')

// `output: 'export'` changes how the server bundle is split in dev and can trigger missing
// chunk errors (e.g. Cannot find module './948.js'). Only enable it for production builds.
// Static export → `out/`. postbuild removes `.next` so `npm run dev` never loads export chunks.
const isNextDev = process.env.NODE_ENV === 'development'

// Static experiments built by `npm run experiment:sync` into public/{slug}/index.html.
// Netlify serves /{slug}/ from the export as-is; `next dev` needs a rewrite to find index.html.
const fs = require('fs')
const path = require('path')
const publicDir = path.join(__dirname, 'public')
const EXPERIMENT_SLUGS = fs
  .readdirSync(publicDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(publicDir, entry.name, 'index.html')))
  .map((entry) => entry.name)

const nextConfig = {
  distDir: '.next',
  ...(!isNextDev ? { output: 'export' } : {}),
  // Allow opening the dev server via LAN IP (phone / other devices on Wi‑Fi).
  allowedDevOrigins: ['192.168.1.18'],
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  ...(isNextDev
    ? {
        async rewrites() {
          return EXPERIMENT_SLUGS.map((slug) => ({
            source: `/${slug}/`,
            destination: `/${slug}/index.html`,
          }))
        },
      }
    : {}),
}

const withMDX = createMDX({})

/** @param {import('next').NextConfig} config */
function withDevWebpackMemoryCache(config) {
  if (!isNextDev) return config
  const webpack = config.webpack
  config.webpack = (webpackConfig, options) => {
    const nextConfig =
      typeof webpack === 'function' ? webpack(webpackConfig, options) : webpackConfig
    // Disk pack cache (.pack.gz) goes stale when .next is partially deleted or build/dev overlap.
    nextConfig.cache = { type: 'memory' }
    return nextConfig
  }
  return config
}

module.exports = withDevWebpackMemoryCache(withMDX(nextConfig))
