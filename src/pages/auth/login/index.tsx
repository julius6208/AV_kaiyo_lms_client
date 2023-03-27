import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Box, Image, TextField, Button, Switch, FormControlLabel, Typography } from "src/UILibrary"

import LogoImage from "src/assets/imgs/logo.png"
import { ISession } from "src/types/session"

export const Login: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [authType, setAuthType] = useState<ISession>({ id: "" })

  const onClickForgotPassword = () => {
    navigate("/reset-password")
  }

  const nextPage = () => {
    localStorage.setItem("auth", JSON.stringify(authType))
    navigate("/my-page")
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: 400, display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Image src={LogoImage} alt="Logo" sx={{ mb: 3 }} />
        <TextField
          fullWidth
          sx={{ fontWeight: 700, mb: 3 }}
          placeholder={t("login.id")}
          value={authType.id}
          onChange={(e) => setAuthType({ id: e.target.value })}
        />
        <TextField fullWidth sx={{ fontWeight: 700, mb: 0.5 }} placeholder={t("login.password")} />
        <Box sx={{ width: "100%", pb: 0.5 }}>
          <FormControlLabel
            control={<Switch />}
            label={t("login.show_password")}
            sx={{
              ".MuiTypography-root": {
                fontSize: 12,
                lineHeight: 1,
                color: "primary.light",
                fontWeight: 600,
                letterSpacing: 2,
              },
            }}
          />
        </Box>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          sx={{ mb: 2.5 }}
          // onClick={() => localStorage.setItem("auth", authType)}
          onClick={nextPage}
        >
          {t("login.login")}
        </Button>
        <Typography.Detail
          sx={{
            px: 1,
            py: 0.5,
            color: "text.disabled",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              color: "primary.main",
            },
          }}
          onClick={onClickForgotPassword}
        >
          {t("login.forgot_password")}
        </Typography.Detail>
      </Box>
    </Box>
  )
}
