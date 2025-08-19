import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import apiRouter from './routes/api.js'
import mparticleRouter from './routes/mparticle.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', apiRouter)
// Mock mParticle endpoints
app.use('/', mparticleRouter)

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Server is running. Try /api/ping' })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
