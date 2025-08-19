import { createContext, useContext } from "react"

export const ConfigContext = createContext({ apiKey: "", configUrlBase: "" })

export const ConfigProvider = ({ apiKey, configUrlBase, children }) => {
  return (
    <ConfigContext.Provider value={{ apiKey, configUrlBase }}>
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext)


