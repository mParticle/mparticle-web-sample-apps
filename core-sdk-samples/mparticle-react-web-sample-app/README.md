# Fullstack React + Express Starter

A minimal, modern fullstack app with:
- **Frontend:** React + Vite
- **Backend:** Express
- **Multiple buttons** in the UI wired to local functions and backend API endpoints

## Quick start

```bash
# in the project root
npm install
npm run dev
```

That launches both server (http://localhost:4000) and client (http://localhost:5173) in dev mode.
The client is configured to proxy `/api` requests to the server, so no CORS setup is needed during dev.

### Build client
```bash
npm run build
```

### Start server only
```bash
npm start
```

## Project structure
```
fullstack-react-express/
├── client/               # React + Vite app
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── components/
│           └── ButtonPanel.jsx
├── server/               # Express API
│   ├── package.json
│   ├── server.js
│   └── routes/
│       ├── api.js
│       └── mparticle.js
└── package.json          # workspaces + dev scripts
```

## API
- `GET /api/ping` → `"pong"`
- `GET /api/time` → `{ serverTime } (ISO)`
- `GET /api/calc?op=add|sub|mul|div&a=<num>&b=<num>` → `{ result }`

## Notes
- Vite dev server proxies `/api` to the Express server at `localhost:4000`.
- Update proxy/ports as you like in `client/vite.config.js` and `server/server.js`.

---

## mParticle Web SDK Local E2E Tester

This repo includes a local mock backend and a simple UI to exercise key mParticle Web SDK flows (identity, events, and audiences). It is useful when developing the SDK locally and wanting to validate changes end‑to‑end.

### What’s included

- Mock endpoints in the server:
  - `GET http://localhost:4000/JS/v2/:apiKey/config` – returns a minimal config JSON
  - `POST http://localhost:4000/v1/identify|login|logout` – identity flows
  - `POST http://localhost:4000/v3/events` – event ingestion (stores in memory)
  - `GET  http://localhost:4000/v1/:apiKey/audience?mpid=...` – sample audience response
  - `GET  http://localhost:4000/__debug/events` – inspect received events

- Client UI (`client/src/App.jsx`) with buttons to call:
  - Identify, Login, Logout
  - Log Event, Log Page View
  - Get Audiences

### How to use with your local SDK build

1. Build the SDK from the mParticle Web SDK repo: [mParticle Web SDK on GitHub](https://github.com/mParticle/mparticle-web-sdk/)
2. Replace the stub with your build:
   - Put your bundle at `client/public/mparticle.js` (the app loads it from `/mparticle.js`).
3. Set your API key in the UI:
   - Edit `client/src/App.jsx` and set `API_KEY` near the top (any string works for local testing).
4. Start both client and server from the repo root:

   ```bash
   npm install
   npm run dev
   ```

5. Open the app (usually `http://localhost:5173`). Use the buttons to exercise flows and watch the log pane. Inspect ingested events at `http://localhost:4000/__debug/events`.

Notes:
- If you previously opened the app, your browser may cache `/mparticle.js`. Do a hard refresh.
- The app intentionally loads the SDK from `client/public/mparticle.js` so you can drop in a locally built bundle without publishing to npm.

### Notes

- The client config sets `requestConfig: true` and points `configUrl` to `http://localhost:4000/JS/v2/`. The SDK will call `GET /JS/v2/:apiKey/config`.

### TODO
- For general SDK setup, see the upstream README: [mParticle Web SDK](https://github.com/mParticle/mparticle-web-sdk/).

### Troubleshooting

- "Failed to load mParticle SDK script": ensure your bundle is at `client/public/mparticle.js` and refresh without cache.
-   404 or network error: ensure the server is running on port 4000 (`npm run dev` from the repo root starts both).
- Audiences show empty: make sure you've clicked Identify/Login first so an MPID is available before fetching.
