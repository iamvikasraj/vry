/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for Netlify
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true,
  // Preserve your existing file structure
  distDir: 'out',
}

module.exports = nextConfig
