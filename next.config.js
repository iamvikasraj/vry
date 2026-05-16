/** @type {import('next').NextConfig} */
const createMDX = require('@next/mdx')

// `output: 'export'` changes how the server bundle is split in dev and can trigger missing
// chunk errors (e.g. Cannot find module './948.js'). Only enable it for production builds.
const isNextDev =
  process.argv[2] === 'dev' ||
  process.env.npm_lifecycle_event === 'dev' ||
  process.env.npm_lifecycle_event === 'dev:local'

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
