import { useState, useCallback } from "react"
import OutputLog from "../OutputLog"
import FeatureSection from "../FeatureSection"

const Identify = () => {
    const [logText, setLogText] = useState('')

    const log = useCallback((...args) => {
        setLogText(prev => prev + args.map(x => (typeof x === 'string' ? x : JSON.stringify(x, null, 2))).join(' ') + '\n')
    }, [])

    const clearLog = () => setLogText('')

    const identify = () => {
        window.mParticle?.Identity?.identify(
            { userIdentities: { customerid: 'cust-1', email: 'a@b.com' } },
            resp => log('identify cb', resp)
        )
    }
    return (
        <FeatureSection title="Identify">
            <div className="feature-row">
                <div className="feature-input">
                    <button onClick={identify}>Identify</button>
                    <button onClick={clearLog}>Clear Log</button>
                </div>
                <div className="feature-output">
                    <OutputLog logText={logText} />
                </div>
            </div>
        </FeatureSection>
    )
}

export default Identify