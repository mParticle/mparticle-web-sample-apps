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
2. Point the app at your local SDK bundle (recommended):
   - Run all commands from this folder: `core-sdk-samples/mparticle-react-web-sample-app`
   - One-time setup inside this app directory:

     a) Preferred: set the exact file path in `.env.local`:

     ```bash
     # path to the actual bundle file
     echo "LOCAL_MPARTICLE_SDK_PATH=/absolute/path/to/mparticle-web-sdk/dist/mparticle.js" > .env.local
     ```

     Or fallback: set the SDK repo path (script will use dist if present, else auto-bundle from src):

     ```bash
     echo "LOCAL_MPARTICLE_SDK_REPO=/absolute/path/to/mparticle-web-sdk" > .env.local
     ```

     b) Run the setup script (writes `client/.env.local` with either `VITE_MPARTICLE_SDK_PATH` or `VITE_MPARTICLE_SDK_SOURCE_ENTRY`):

     ```bash
     npm run setup-local-sdk
     ```
     This writes `client/.env.local` for the dev server. No `client/public/mparticle.js` is needed.

   - Alternative: place the bundle at `client/public/mparticle.js` and it will be served as `/mparticle.js`.
3. Set your API key in the UI:
   - Edit `client/src/App.jsx` and set `API_KEY` near the top (any string works for local testing).
4. Start both client and server from this app directory:

   ```bash
   npm install
   npm run dev
   ```

5. Open the app (usually `http://localhost:5173`). Use the buttons to exercise flows and watch the log pane. Inspect ingested events at `http://localhost:4000/__debug/events`.

Notes:
- If you previously opened the app, your browser may cache `/mparticle.js`. Do a hard refresh.
- `.env.local` files are git-ignored and safe to keep local-only.
- If `client/.env.local` is not present, the app falls back to serving `client/public/mparticle.js` if present.

### Notes

- The client config sets `requestConfig: true` and points `configUrl` to `http://localhost:4000/JS/v2/`. The SDK will call `GET /JS/v2/:apiKey/config`.

### TODO
- For general SDK setup, see the upstream README: [mParticle Web SDK](https://github.com/mParticle/mparticle-web-sdk/).

### Troubleshooting

- "Failed to load mParticle SDK script":
- If using `.env.local`, verify `client/.env.local` contains a valid absolute path and the file exists.
- Otherwise, ensure your bundle is at `client/public/mparticle.js` and refresh without cache.
-   404 or network error: ensure the server is running on port 4000 (`npm run dev` from the repo root starts both).
- Audiences show empty: make sure you've clicked Identify/Login first so an MPID is available before fetching.
