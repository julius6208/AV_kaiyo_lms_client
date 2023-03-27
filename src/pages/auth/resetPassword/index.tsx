import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Box, Button, FormControlLabel, Image, Switch, TextField, Typography } from "src/UILibrary"

import LogoImage from "src/assets/imgs/logo.png"

export const ResetPassword: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState<number>(0)

  const onNext = () => {
    if (step < 2) {
      setStep(step + 1)
    } else {
      navigate("/login")
    }
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
        {step > 0 ? (
          step === 2 ? (
            <>
              <TextField
                fullWidth
                sx={{ fontWeight: 700, mb: 3 }}
                placeholder={t("reset_password.new_password")}
              />
              <TextField
                fullWidth
                sx={{ fontWeight: 700, mb: 0.5 }}
                placeholder={t("reset_password.confirm_password")}
              />
              <Box sx={{ width: "100%", pb: 0.5 }}>
                <FormControlLabel
                  control={<Switch />}
                  label={t("login.show_password")}
                  sx={{
                    ".MuiTypography-root": {
                      fontSize: 12,
                      lineHeight: 1,
                      color: "secondary.dark",
                      fontWeight: 600,
                      letterSpacing: 2,
                    },
                  }}
                />
              </Box>
              <Button fullWidth color="primary" variant="contained" onClick={onNext}>
                {t("reset_password.change_password")}
              </Button>
            </>
          ) : (
            <>
              <TextField
                fullWidth
                sx={{ fontWeight: 700, mb: 3 }}
                placeholder={t("reset_password.verification_code_placeholder")}
              />
              <Button fullWidth color="primary" variant="contained" onClick={onNext}>
                {t("reset_password.verification_code_submit")}
              </Button>
            </>
          )
        ) : (
          <>
            <TextField
              type="email"
              fullWidth
              sx={{ fontWeight: 700, mb: 3 }}
              placeholder={t("reset_password.email")}
            />
            <Button fullWidth color="primary" variant="contained" sx={{ mb: 2.5 }} onClick={onNext}>
              {t("reset_password.receive_verification_code")}
            </Button>
            <Typography.Detail
              sx={{
                maxWidth: 340,
                px: 0.75,
                py: 0.5,
                color: "text.dark",
              }}
            >
              {t("reset_password.verification_code_tip")}
            </Typography.Detail>
          </>
        )}
      </Box>
    </Box>
  )
}
