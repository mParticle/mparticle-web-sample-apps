

import { useState, useCallback } from "react"
import OutputLog from "../OutputLog"
import FeatureSection from "../FeatureSection"
import { useConfig } from "../../contexts/ConfigContext"

const MOCK_AUDIENCE_BASE = 'http://localhost:4000/v1/'

const Audiences = () => {
    const [logText, setLogText] = useState('')
    const { apiKey } = useConfig()

    const log = useCallback((...args) => {
        setLogText(prev => prev + args.map(x => (typeof x === 'string' ? x : JSON.stringify(x, null, 2))).join(' ') + '\n')
    }, [])

    const getAudiences = async () => {
        const user = window.mParticle?.Identity?.getCurrentUser()
        const mpid = user?.getMPID()
        if (!mpid) {
            log('No current MPID yet')
            return
        }
        try {
            const res = await fetch(`${MOCK_AUDIENCE_BASE}${apiKey}/audience?mpid=${mpid}`)
            const json = await res.json()
            log('audiences', json)
        } catch (e) {
            log('audience fetch error', e?.message || e)
        }
    }
    return (
        <FeatureSection title="Audiences">
            <div className="feature-row">
                <div className="feature-input">
                    <button onClick={getAudiences}>Get Audiences</button>
                </div>
                <div className="feature-output">
                    <OutputLog logText={logText} />
                </div>
            </div>
        </FeatureSection>
    )
}

export default Audiences