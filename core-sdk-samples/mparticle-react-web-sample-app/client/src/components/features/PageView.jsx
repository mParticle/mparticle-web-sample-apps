
import { useState, useCallback } from "react"
import OutputLog from "../OutputLog"
import FeatureSection from "../FeatureSection"

const PageView = () => {
    const [logText, setLogText] = useState('')

    const log = useCallback((...args) => {
        setLogText(prev => prev + args.map(x => (typeof x === 'string' ? x : JSON.stringify(x, null, 2))).join(' ') + '\n')
    }, [])
    const logPageView = () => {
        window.mParticle?.logPageView('Home', { title: document.title })
        log('pageView sent')
    }
    const clearLog = () => setLogText('')
    return (
        <FeatureSection title="Page View">
            <div className="feature-row">
                <div className="feature-input">
                    <button onClick={logPageView}>Log Page View</button>
                    <button onClick={clearLog}>Clear Log</button>
                </div>
                <div className="feature-output">
                    <OutputLog logText={logText} />
                </div>
            </div>
        </FeatureSection>
    )
}

export default PageView