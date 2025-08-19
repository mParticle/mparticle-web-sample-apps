import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { build as esbuild } from 'esbuild'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const localMParticlePath = env.VITE_MPARTICLE_SDK_PATH
  const localMParticleSourceEntry = env.VITE_MPARTICLE_SDK_SOURCE_ENTRY

  return {
    plugins: [
      react(),
      {
        name: 'serve-local-mparticle',
        configureServer(server) {
          // If VITE_MPARTICLE_SDK_SOURCE_ENTRY is provided, bundle it on-the-fly
          if (localMParticleSourceEntry) {
            server.middlewares.use('/mparticle.js', async (req, res, next) => {
              try {
                const entry = path.resolve(localMParticleSourceEntry)
                const result = await esbuild({
                  entryPoints: [entry],
                  bundle: true,
                  format: 'iife',
                  globalName: 'mParticle',
                  sourcemap: false,
                  write: false,
                })
                const outFile = result.outputFiles?.[0]
                if (!outFile) {
                  res.statusCode = 404
                  return res.end('mparticle.js not found')
                }
                res.setHeader('Content-Type', 'application/javascript')
                res.setHeader('Cache-Control', 'no-store')
                return res.end(outFile.text)
              } catch (e) {
                next()
              }
            })
            return
          }

          // Otherwise, serve from VITE_MPARTICLE_SDK_PATH if provided
          if (localMParticlePath) {
            server.middlewares.use('/mparticle.js', (req, res, next) => {
              try {
                const resolved = path.resolve(localMParticlePath)
                if (!fs.existsSync(resolved)) {
                  res.statusCode = 404
                  return res.end('mparticle.js not found')
                }
                res.setHeader('Content-Type', 'application/javascript')
                res.setHeader('Cache-Control', 'no-store')
                fs.createReadStream(resolved).pipe(res)
              } catch (e) {
                next()
              }
            })
          }
        }
      }
    ],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true
        }
      }
    }
  }
})
