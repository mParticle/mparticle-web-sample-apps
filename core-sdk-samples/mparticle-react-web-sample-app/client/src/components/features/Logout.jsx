import { useState, useCallback } from "react"
import OutputLog from "../OutputLog"
import FeatureSection from "../FeatureSection"

const Logout = () => {
    const [logText, setLogText] = useState('')

    const log = useCallback((...args) => {
        setLogText(prev => prev + args.map(x => (typeof x === 'string' ? x : JSON.stringify(x, null, 2))).join(' ') + '\n')
    }, [])
    const logout = () => {
        window.mParticle?.Identity?.logout({}, resp => log('logout cb', resp))
    }
    const clearLog = () => setLogText('')
    return (
        <FeatureSection title="Logout">
            <div className="feature-row">
                <div className="feature-input">
                    <button onClick={logout}>Logout</button>
                    <button onClick={clearLog}>Clear Log</button>
                </div>
                <div className="feature-output">
                    <OutputLog logText={logText} />
                </div>
            </div>
        </FeatureSection>
    )
}

export default Logout