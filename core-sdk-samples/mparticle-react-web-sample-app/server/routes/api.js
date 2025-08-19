import { Router } from 'express'
const router = Router()

router.get('/ping', (req, res) => {
  res.json({ ok: true, message: 'pong' })
})

router.get('/time', (req, res) => {
  res.json({ ok: true, serverTime: new Date().toISOString() })
})

router.get('/calc', (req, res) => {
  const { op = 'add', a = '0', b = '0' } = req.query
  const x = parseFloat(a), y = parseFloat(b)

  if (Number.isNaN(x) || Number.isNaN(y)) {
    return res.status(400).json({ ok: false, error: 'Invalid numbers' })
  }

  let result
  switch (op) {
    case 'add': result = x + y; break
    case 'sub': result = x - y; break
    case 'mul': result = x * y; break
    case 'div':
      if (y === 0) return res.status(400).json({ ok: false, error: 'Division by zero' })
      result = x / y; break
    default:
      return res.status(400).json({ ok: false, error: 'Unsupported op. Use add|sub|mul|div' })
  }

  res.json({ ok: true, op, a: x, b: y, result })
})

export default router
