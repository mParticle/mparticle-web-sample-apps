import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'

function readAppEnvLocal(appRoot) {
  const repoFromEnv = process.env.LOCAL_MPARTICLE_SDK_REPO
  const pathFromEnv = process.env.LOCAL_MPARTICLE_SDK_PATH

  let repoFromFile = ''
  let pathFromFile = ''

  const envFilePath = join(appRoot, '.env.local')
  if (existsSync(envFilePath)) {
    const content = readFileSync(envFilePath, 'utf8')
    const lines = content.split(/\r?\n/)
    for (const raw of lines) {
      const line = raw.trim()
      if (line.startsWith('#') || line.length === 0) continue
      const [key, ...rest] = line.split('=')
      const value = rest.join('=').trim().replace(/^"|"$/g, '')
      if (key === 'LOCAL_MPARTICLE_SDK_REPO') repoFromFile = value
      if (key === 'LOCAL_MPARTICLE_SDK_PATH') pathFromFile = value
    }
  }

  return {
    repoPath: (repoFromEnv && repoFromEnv.trim()) || repoFromFile || '',
    filePath: (pathFromEnv && pathFromEnv.trim()) || pathFromFile || '',
  }
}

function writeClientEnvLocalPath(clientDir, mparticleJsPath) {
  const filePath = join(clientDir, '.env.local')
  const line = `VITE_MPARTICLE_SDK_PATH=${mparticleJsPath}\n`
  writeFileSync(filePath, line, 'utf8')
}

function writeClientEnvLocalSource(clientDir, sourceEntry) {
  const filePath = join(clientDir, '.env.local')
  const line = `VITE_MPARTICLE_SDK_SOURCE_ENTRY=${sourceEntry}\n`
  writeFileSync(filePath, line, 'utf8')
}

function main() {
  const appRoot = resolve(process.cwd())
  const clientDir = join(appRoot, 'client')

  const { repoPath, filePath } = readAppEnvLocal(appRoot)
  if (!repoPath && !filePath) {
    console.error('ERROR: Set one of the following in this app\'s .env.local:')
    console.error('  LOCAL_MPARTICLE_SDK_PATH=/absolute/path/to/dist/mparticle.js   (preferred)')
    console.error('  or')
    console.error('  LOCAL_MPARTICLE_SDK_REPO=/absolute/path/to/mparticle-web-sdk')
    process.exit(1)
  }

  if (filePath) {
    const absoluteFilePath = resolve(filePath)
    if (!existsSync(absoluteFilePath)) {
      console.warn(`WARNING: File not found: ${absoluteFilePath}`)
    }
    writeClientEnvLocalPath(clientDir, absoluteFilePath)
    console.log(`Wrote ${join(clientDir, '.env.local')} with VITE_MPARTICLE_SDK_PATH=${absoluteFilePath}`)
    console.log('Done. Start the app with: npm run dev')
    return
  }

  const sdkRepoPath = resolve(repoPath)
  const mparticleJsPath = join(sdkRepoPath, 'dist', 'mparticle.js')
  const sourceEntryCandidates = [
    join(sdkRepoPath, 'src', 'mparticle.js'),
    join(sdkRepoPath, 'src', 'index.js'),
    join(sdkRepoPath, 'src', 'index.ts'),
  ]

  if (existsSync(mparticleJsPath)) {
    writeClientEnvLocalPath(clientDir, mparticleJsPath)
    console.log(`Wrote ${join(clientDir, '.env.local')} with VITE_MPARTICLE_SDK_PATH=${mparticleJsPath}` )
  } else {
    const entry = sourceEntryCandidates.find((p) => existsSync(p))
    if (!entry) {
      console.error('ERROR: Could not find dist/mparticle.js or a source entry (src/mparticle.js, src/index.js, src/index.ts) in your SDK repo.')
      process.exit(1)
    }
    writeClientEnvLocalSource(clientDir, entry)
    console.log(`Wrote ${join(clientDir, '.env.local')} with VITE_MPARTICLE_SDK_SOURCE_ENTRY=${entry}`)
    console.log('Note: The dev server will bundle from source on-the-fly (no build needed).')
  }

  console.log('Done. Start the app with: npm run dev')
}

main()

