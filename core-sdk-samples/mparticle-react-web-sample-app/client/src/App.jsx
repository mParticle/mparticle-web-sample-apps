import { useEffect, useState, useCallback } from 'react'
import Identify from './components/features/Identify'
import Login from './components/features/Login'
import Logout from './components/features/Logout'
import ConversionEvent from './components/features/ConversionEvent'
import PageView from './components/features/PageView'
import Audiences from './components/features/Audiences'
import { ConfigProvider } from './contexts/ConfigContext'
import './app.css'
import OutputLog from './components/OutputLog'

// Pass you API Key here
const API_KEY = ''
const CONFIG_URL_BASE = 'http://localhost:4000/JS/v2/'

export default function App() {
  const [sdkReady, setSdkReady] = useState(false)
  const [appLogText, setAppLogText] = useState('')

  const appLog = useCallback((...args) => {
    setAppLogText(prev => prev + args.map(x => (typeof x === 'string' ? x : JSON.stringify(x, null, 2))).join(' ') + '\n')
  }, [])

  const features = [
    <Identify />,
    <Login />,
    <Logout />,
    <ConversionEvent />,
    <PageView />,
    <Audiences />
  ]

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
        identityCallback: resp => appLog('identityCallback', resp && resp.httpCode),
      }
      window.mParticle.init(API_KEY, window.mParticle.config)
      setSdkReady(true)
    }
    script.onerror = () => appLog('Failed to load mParticle SDK script')
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  return (
    <ConfigProvider apiKey={API_KEY} configUrlBase={CONFIG_URL_BASE}>
      <div className="app-root">
        <h1>mParticle E2E Test</h1>
        <OutputLog title="App Log" logText={appLogText} />
        {sdkReady ? features.map((feat) => {
          return feat
        }) : null}
      </div >
    </ConfigProvider>
  )
}
