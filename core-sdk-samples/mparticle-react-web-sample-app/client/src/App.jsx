import React, { useEffect, useState, useCallback } from 'react'

// Pass you API Key here
const API_KEY = ''
const CONFIG_URL_BASE = 'http://localhost:4000/JS/v2/'
const MOCK_AUDIENCE_BASE = 'http://localhost:4000/v1/'

export default function App() {
  const [sdkReady, setSdkReady] = useState(false)
  const [logText, setLogText] = useState('')

  const log = useCallback((...args) => {
    setLogText(prev => prev + args.map(x => (typeof x === 'string' ? x : JSON.stringify(x, null, 2))).join(' ') + '\n')
  }, [])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = '/mparticle.js'
    script.async = true
    script.onload = () => {
      window.mParticle = window.mParticle || {}
      window.mParticle.config = {
        isDevelopmentMode: true,
        requestConfig: true,
        configUrl: CONFIG_URL_BASE,
        identityCallback: resp => log('identityCallback', resp && resp.httpCode),
      }
      window.mParticle.init(API_KEY, window.mParticle.config)
      setSdkReady(true)
      log('mParticle init called')
    }
    script.onerror = () => log('Failed to load mParticle SDK script')
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [log])

  const identify = () => {
    window.mParticle?.Identity?.identify(
      { userIdentities: { customerid: 'cust-1', email: 'a@b.com' } },
      resp => log('identify cb', resp)
    )
  }

  const login = () => {
    window.mParticle?.Identity?.login(
      { userIdentities: { customerid: 'cust-1' } },
      resp => log('login cb', resp)
    )
  }

  const logout = () => {
    window.mParticle?.Identity?.logout({}, resp => log('logout cb', resp))
  }

  const logEvent = () => {
    window.mParticle?.logEvent(
      'Test Event',
      window.mParticle?.EventType?.Navigation,
      { foo: 'bar' },
      { 'Facebook.ClickId': 'override' }
    )
    log('logEvent sent')
  }

  const logPageView = () => {
    window.mParticle?.logPageView('Home', { title: document.title })
    log('pageView sent')
  }

  const getAudiences = async () => {
    const user = window.mParticle?.Identity?.getCurrentUser()
    const mpid = user?.getMPID()
    if (!mpid) {
      log('No current MPID yet')
      return
    }
    try {
      const res = await fetch(`${MOCK_AUDIENCE_BASE}${API_KEY}/audience?mpid=${mpid}`)
      const json = await res.json()
      log('audiences', json)
    } catch (e) {
      log('audience fetch error', e?.message || e)
    }
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <h1>mParticle E2E Test</h1>
      <div style={{ display: 'grid', gap: 8, maxWidth: 400 }}>
        <button disabled={!sdkReady} onClick={identify}>Identify</button>
        <button disabled={!sdkReady} onClick={login}>Login</button>
        <button disabled={!sdkReady} onClick={logout}>Logout</button>
        <button disabled={!sdkReady} onClick={logEvent}>Log Conversion Event</button>
        <button disabled={!sdkReady} onClick={logPageView}>Log Page View</button>
        <button disabled={!sdkReady} onClick={getAudiences}>Get Audiences</button>
      </div>
      <pre style={{ marginTop: 16, background: '#f7f7f7', padding: 12, minHeight: 200, overflow: 'auto' }}>
        {logText}
      </pre>
    </div>
  )
}
