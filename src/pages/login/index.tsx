import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Image, TextField, Button, Switch, FormControlLabel, Typography } from "src/UILibrary"

import LogoImage from "src/assets/imgs/logo.png"

export const Login: React.FC = () => {
  const { t } = useTranslation()

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
        <TextField fullWidth sx={{ fontWeight: 700, mb: 3 }} placeholder={t("login.id")} />
        <TextField fullWidth sx={{ fontWeight: 700, mb: 0.5 }} placeholder={t("login.password")} />
        <Box sx={{ width: "100%", pb: 0.5 }}>
          <FormControlLabel
            control={<Switch />}
            label={t("login.show_password")}
            sx={{
              ".MuiTypography-root": {
                fontSize: 12,
                lineHeight: 1,
                color: "info.main",
                fontWeight: 600,
                letterSpacing: 2,
              },
            }}
          />
        </Box>
        <Button fullWidth color="primary" variant="contained" sx={{ mb: 2.5 }}>
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
        >
          {t("login.forgot_password")}
        </Typography.Detail>
      </Box>
    </Box>
  )
}
