import { useState, useCallback } from "react"
import OutputLog from "../OutputLog"
import FeatureSection from "../FeatureSection"

const Login = () => {
    const [logText, setLogText] = useState('')

    const log = useCallback((...args) => {
        setLogText(prev => prev + args.map(x => (typeof x === 'string' ? x : JSON.stringify(x, null, 2))).join(' ') + '\n')
    }, [])
    const login = () => {
        window.mParticle?.Identity?.login(
            { userIdentities: { customerid: 'cust-1' } },
            resp => log('login cb', resp)
        )
    }
    const clearLog = () => setLogText('')
    return (
        <FeatureSection title="Login">
            <div className="feature-row">
                <div className="feature-input">
                    <button onClick={login}>Login</button>
                    <button onClick={clearLog}>Clear Log</button>
                </div>
                <div className="feature-output">
                    <OutputLog logText={logText} />
                </div>
            </div>
        </FeatureSection>
    )
}

export default Login