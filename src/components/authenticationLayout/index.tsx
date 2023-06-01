import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { useSession } from "src/modules/sessionProvider"

export const AuthenticationLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const session = useSession()

  useEffect(() => {
    if (!session?.value.tokenInfo.access_token) {
      navigate(`/login?redirect=${encodeURIComponent(`${location.pathname}${location.search}`)}`)
    }
  }, [session, navigate, location])

  return <>{children}</>
}
