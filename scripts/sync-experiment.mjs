// Builds a Vite experiment into public/{slug}/ so it's served at /{slug}.
// Usage: npm run experiment:sync -- ../cute-boat-pool [slug]
// The experiment must load its own assets via import.meta.env.BASE_URL (not hardcoded "/...").
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'

const [source, slugArg] = process.argv.slice(2)

if (!source) {
  console.error('usage: npm run experiment:sync -- <path-to-experiment> [slug]')
  process.exit(1)
}

const sourceDir = resolve(source)
const slug = slugArg ?? basename(sourceDir)
const route = `/${slug}`
const outDir = join(process.cwd(), 'public', slug)

if (!existsSync(join(sourceDir, 'package.json'))) {
  console.error(`no package.json in ${sourceDir}`)
  process.exit(1)
}

const run = (args) => {
  const result = spawnSync('npm', args, { cwd: sourceDir, stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

if (!existsSync(join(sourceDir, 'node_modules'))) run(['install'])
run(['run', 'build', '--', `--base=${route}/`, `--outDir=${outDir}`, '--emptyOutDir'])

console.log(`synced ${slug} → ${route}`)
