import React, { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"

import { Typography, Grid } from "src/UILibrary"

export const InputField = ({ label, children }: PropsWithChildren<{ label: string }>) => {
  const { t } = useTranslation()
  return (
    <Grid container item>
      <Grid container item sm={5} alignItems="center">
        <Typography.Description>{t(label)}</Typography.Description>
      </Grid>
      <Grid item sm={7}>
        {children}
      </Grid>
    </Grid>
  )
}
