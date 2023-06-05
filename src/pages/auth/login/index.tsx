import React, { useEffect, useState } from "react"
import { AxiosError, AxiosResponse } from "axios"
import { useRecoilState } from "recoil"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"

import { Box, Image, Button, Select, MenuItem } from "src/UILibrary"
import { LoadingModal } from "src/components/shared/loadingModal"

import { UserState } from "src/types/user"
import { ISession } from "src/types/session"
import { usePushAlerts } from "src/hooks/alerts"
import { USER_STATE } from "src/constants/userState"
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
  const [userState, setUserState] = useState<UserState>("teacher")
  const [isLoginRefresh, setIsLoginRefresh] = useRecoilState(isLoginRefreshState)

  const { data: loginLink, error: linkError } = useGetLoginLink(userState)

  const { mutate: microSoftCodeLogin, isLoading } = useMicroSoftLogin({
    onSuccess: (res: AxiosResponse<ISession>) => {
      session?.setValue(res.data)
      navigate("/mypage")
      setIsLoginRefresh(true)
    },
    onError: (err: AxiosError) => {
      pushAlerts({ message: err.message, color: "error" })
    },
  })

  const microsoftLogin = () => {
    if (loginLink) {
      window.location.href = loginLink?.data.loginLink
    } else if (linkError) {
      pushAlerts({ message: linkError.message, color: "error" })
    }
  }

  useEffect(() => {
    const code = searchParams.get("code") || ""
    const role = searchParams.get("state") || ""
    sessionStorage.setItem("code", code)
    if (code && userState && !isLoginRefresh) {
      microSoftCodeLogin({
        role: role,
        code: code,
      })
    }
  }, [isLoginRefresh, microSoftCodeLogin, searchParams, userState])

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
        <Select
          fullWidth
          sx={{
            "& .MuiSelect-select": {
              bgcolor: "background.default",
            },
          }}
          value={userState}
          onChange={(e) => setUserState(e.target.value as UserState)}
        >
          {USER_STATE.map((user) => (
            <MenuItem key={user.key} value={user.key}>
              {t(user.label)}
            </MenuItem>
          ))}
        </Select>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          sx={{ mb: 2.5, mt: 5 }}
          onClick={microsoftLogin}
        >
          {t("login.login")}
        </Button>
      </Box>
      <LoadingModal open={isLoading} />
    </Box>
  )
}
