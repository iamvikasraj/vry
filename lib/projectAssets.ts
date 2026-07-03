import fs from 'fs'
import path from 'path'

/** True when the file exists under public/ (for static export / SSG). */
export function hasPublicAsset(assetPath: string): boolean {
  if (!assetPath) return false
  const relative = assetPath.replace(/^\//, '')
  return fs.existsSync(path.join(process.cwd(), 'public', relative))
}
