import { Router } from 'express'

const router = Router()

// In-memory store for simple mocking/inspection
const memory = {
  events: [],
  identitiesByCustomerId: {},
  defaultMpid: 'mpid-local-123456',
}

// SDK config endpoint
// GET /JS/v2/:apiKey/config
router.get('/JS/v2/:apiKey/config', (req, res) => {
  const { apiKey } = req.params
  res.json({
    isEnabled: true,
    workspaceToken: apiKey,
    environment: 'development',
    // Very light mock – real SDKs read many fields; we only provide essentials
    // and rely on URL overrides by the client to call these local endpoints.
    currentEnvironment: 'development',
    serverMode: 'mock',
    account: { name: 'Local Mock' },
    workspaceName: 'Local Mock Workspace',
    dataPlan: null,
    // Surface base URLs the SDK may read; not exhaustive
    serviceUrls: {
      identity: 'http://localhost:4000/v1',
      events: 'http://localhost:4000/v3',
    },
    ui: { hash: '' },
  })
})

// Identity endpoints
router.post('/v1/identify', (req, res) => {
  const body = req.body || {}
  const userIdentities = body.userIdentities || {}
  const customerId = userIdentities.customerid || 'anonymous'
  const mpid = memory.identitiesByCustomerId[customerId] || memory.defaultMpid
  memory.identitiesByCustomerId[customerId] = mpid

  res.json({
    mpid,
    is_logged_in: !!customerId && customerId !== 'anonymous',
    context: { request: 'identify', received: userIdentities },
  })
})

router.post('/v1/login', (req, res) => {
  const body = req.body || {}
  const userIdentities = body.userIdentities || {}
  const customerId = userIdentities.customerid || 'anonymous'
  const mpid = memory.identitiesByCustomerId[customerId] || memory.defaultMpid
  memory.identitiesByCustomerId[customerId] = mpid

  res.json({
    mpid,
    is_logged_in: true,
    context: { request: 'login', received: userIdentities },
  })
})

router.post('/v1/logout', (req, res) => {
  res.json({
    mpid: memory.defaultMpid,
    is_logged_in: false,
    context: { request: 'logout' },
  })
})

// Events ingestion
router.post('/v3/events', (req, res) => {
  const eventBatch = req.body || {}
  memory.events.push({ ts: Date.now(), batch: eventBatch })
  res.status(202).json({ ok: true, received: true })
})

// Simple debug endpoint to inspect received events
router.get('/__debug/events', (req, res) => {
  res.json({ count: memory.events.length, events: memory.events })
})

// Audience fetch – used directly by the sample UI
// GET /v1/:apiKey/audience?mpid=...
router.get('/v1/:apiKey/audience', (req, res) => {
  const { mpid } = req.query
  const audiences = [
    { id: 1, name: 'Beta Testers', contains: !!mpid },
    { id: 2, name: 'High Value', contains: false },
  ]
  res.json({ ok: true, mpid: mpid || null, audiences })
})

export default router

