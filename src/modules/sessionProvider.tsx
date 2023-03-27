import React, { createContext, useContext, useEffect, useState } from "react"

import { ISession, ISessionState } from "src/types/session"

export const SessionContext = createContext<ISessionState | null>(null)

export const FetchSession: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [value, setValue] = useState<ISession>({ id: "" })
  const data = localStorage.getItem("auth" || "")

  useEffect(() => {
    if (data) {
      setValue(JSON.parse(data) as ISession)
    }
  }, [data])

  return <SessionContext.Provider value={{ value, setValue }}>{children}</SessionContext.Provider>
}

export const useSession = () => {
  const session = useContext(SessionContext)
  return session
}
