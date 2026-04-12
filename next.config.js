/** @type {import('next').NextConfig} */

// `output: 'export'` changes how the server bundle is split in dev and can trigger missing
// chunk errors (e.g. Cannot find module './948.js'). Only enable it for production builds.
const isNextDev =
  process.argv[2] === 'dev' ||
  process.env.npm_lifecycle_event === 'dev' ||
  process.env.npm_lifecycle_event === 'dev:local'

const nextConfig = {
  ...(!isNextDev ? { output: 'export' } : {}),
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true,
  // Use default `.next` for dev/build cache. Do not set distDir to `out` — that folder is the
  // static export target and mixing it with `next dev` causes 404s on / and /_next/static after HMR.
}

module.exports = nextConfig
