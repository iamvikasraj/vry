/** @type {import('next').NextConfig} */
const createMDX = require('@next/mdx')

// `output: 'export'` changes how the server bundle is split in dev and can trigger missing
// chunk errors (e.g. Cannot find module './948.js'). Only enable it for production builds.
// Static export → `out/`. postbuild removes `.next` so `npm run dev` never loads export chunks.
const isNextDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  ...(!isNextDev ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({})

module.exports = withMDX(nextConfig)
