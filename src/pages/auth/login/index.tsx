import React, { useEffect, useState } from "react"
import { AxiosError, AxiosResponse } from "axios"
import { useRecoilState } from "recoil"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"

import { Box, Image, Button } from "src/UILibrary"
import { LoadingModal } from "src/components/shared/loadingModal"

import { ISession, LoginLink } from "src/types/session"
import { usePushAlerts } from "src/hooks/alerts"
import { useSession } from "src/modules/sessionProvider"
import { isLoginRefreshState } from "src/states/provider"
import { useGetLoginLink, useMicroSoftLogin } from "src/queries/auth"
import LogoImage from "src/assets/imgs/logo.png"

export const Login: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const session = useSession()
  const pushAlerts = usePushAlerts()

  const [searchParams] = useSearchParams()
  const [isLoginRefresh, setIsLoginRefresh] = useRecoilState(isLoginRefreshState)

  const [loginLink, setLoginLink] = useState<LoginLink>({ loginLink: "" })

  const { mutate: microSoftCodeLogin } = useMicroSoftLogin({
    onSuccess: (res: AxiosResponse<ISession>) => {
      session?.setValue(res.data)
      navigate("/mypage")
      setIsLoginRefresh(true)
    },
    onError: (err: AxiosError) => {
      pushAlerts({ message: err.message, color: "error" })
    },
  })

  const { mutate: microSoftLoginLink, isLoading } = useGetLoginLink({
    onSuccess: (res: AxiosResponse<LoginLink>) => {
      setLoginLink(res.data)
    },
    onError: (err: AxiosError) => {
      pushAlerts({ message: err.message, color: "error" })
    },
  })

  useEffect(() => {
    if (loginLink.loginLink) {
      window.location.href = loginLink.loginLink
    }
  }, [loginLink])

  useEffect(() => {
    const code = searchParams.get("code") || ""
    sessionStorage.setItem("code", code)
    if (code && !isLoginRefresh) {
      microSoftCodeLogin({
        code: code,
      })
    }
  }, [isLoginRefresh, microSoftCodeLogin, searchParams])

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mx: "2rem",
      }}
    >
      <Box sx={{ width: 400, display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Image src={LogoImage} alt="Logo" sx={{ mb: 3 }} />
        <Button
          fullWidth
          color="primary"
          variant="contained"
          sx={{ mb: 2.5, mt: 5 }}
          onClick={microSoftLoginLink}
        >
          {t("login.login")}
        </Button>
      </Box>
      <LoadingModal open={isLoading} />
    </Box>
  )
}
