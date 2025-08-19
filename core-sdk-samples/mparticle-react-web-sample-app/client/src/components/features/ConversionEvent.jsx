import { useState, useCallback } from "react"
import OutputLog from "../OutputLog"
import FeatureSection from "../FeatureSection"

const ConversionEvent = () => {
    const [logText, setLogText] = useState('')

    const log = useCallback((...args) => {
        setLogText(prev => prev + args.map(x => (typeof x === 'string' ? x : JSON.stringify(x, null, 2))).join(' ') + '\n')
    }, [])
    const logConversionEvent = () => {
        window.mParticle?.logEvent(
            'Test Event',
            window.mParticle?.EventType?.Navigation,
            { foo: 'bar' },
            { 'Facebook.ClickId': 'override' }
        )
        log('logEvent sent')
    }
    const clearLog = () => setLogText('')
    return (
        <FeatureSection title="Conversion Event">
            <div className="feature-row">
                <div className="feature-input">
                    <button onClick={logConversionEvent}>Log Conversion Event</button>
                    <button onClick={clearLog}>Clear Log</button>
                </div>
                <div className="feature-output">
                    <OutputLog logText={logText} />
                </div>
            </div>
        </FeatureSection>
    )
}

export default ConversionEvent