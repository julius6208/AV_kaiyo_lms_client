import { AxiosError, AxiosResponse } from "axios"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { Box, CircularProgress } from "src/UILibrary"
import { useRefresh } from "src/queries/auth"
import { isLoginRefreshState } from "src/states/provider"
import { ISessionState, ISession, TokenInfo, UserInfo } from "src/types/session"

export const SessionContext = createContext<ISessionState | null>(null)

export const FetchSession: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [value, setValue] = useState<ISession>({
    user: {
      id: Number(sessionStorage.getItem("id")) || 0,
      email: sessionStorage.getItem("email") || "",
      fullName: sessionStorage.getItem("fullName") || "",
      fullNameKana: sessionStorage.getItem("fullNameKana") || "",
      createdAt: sessionStorage.getItem("createdAt") || "",
      updatedAt: sessionStorage.getItem("updatedAt") || "",
      deletedAt: sessionStorage.getItem("deletedAt") || "",
      role: sessionStorage.getItem("role") || "",
    },
    tokenInfo: {
      role: sessionStorage.getItem("role") || "",
      token_type: sessionStorage.getItem("token_type") || "",
      scope: sessionStorage.getItem("scope") || "",
      expires_in: Number(sessionStorage.getItem("expires_in")) || 0,
      ext_expires_in: Number(sessionStorage.getItem("ext_expires_in")) || 0,
      access_token: sessionStorage.getItem("access_token") || "",
      refresh_token: sessionStorage.getItem("refresh_token") || "",
      id_token: sessionStorage.getItem("id_token") || "",
    },
  })
  const [isLoginRefresh, setIsLoginRefresh] = useRecoilState(isLoginRefreshState)
  const { mutate: refresh, isLoading } = useRefresh({
    onSuccess: (res: AxiosResponse<ISession>) => {
      const session = res.data as ISession
      Object.keys(session.tokenInfo).forEach((key) => {
        sessionStorage.setItem(`${key}`, `${session.tokenInfo[key as keyof TokenInfo]}`)
      })
      Object.keys(session.user).forEach((key) => {
        sessionStorage.setItem(`${key}`, `${session.user[key as keyof UserInfo]}`)
      })
      setValue(session as ISession)
    },
    onError: (err: AxiosError) => {
      console.error(err.response, err)
      setValue({
        user: {
          id: 0,
          email: "",
          fullName: "",
          fullNameKana: "",
          createdAt: "",
          updatedAt: "",
          deletedAt: "",
          role: "",
        },
        tokenInfo: {
          role: "",
          token_type: "",
          scope: "",
          expires_in: 0,
          ext_expires_in: 0,
          access_token: "",
          refresh_token: "",
          id_token: "",
        },
      })
    },
  })

  useEffect(() => {
    if (isLoginRefresh) {
      refresh({})
      setIsLoginRefresh(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginRefresh])

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    )
  }

  return <SessionContext.Provider value={{ value, setValue }}>{children}</SessionContext.Provider>
}

export const useSession = () => {
  const session = useContext(SessionContext)
  return session
}
