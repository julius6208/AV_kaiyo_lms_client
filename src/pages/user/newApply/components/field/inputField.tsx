import React, { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"

import { Typography, Grid } from "src/UILibrary"

export const InputField = ({ label, children }: PropsWithChildren<{ label: string }>) => {
  const { t } = useTranslation()
  return (
    <Grid container item>
      <Grid container item xs={3} alignItems="center">
        <Typography.Description>{t(label)}</Typography.Description>
      </Grid>
      <Grid item xs={9}>
        {children}
      </Grid>
    </Grid>
  )
}
