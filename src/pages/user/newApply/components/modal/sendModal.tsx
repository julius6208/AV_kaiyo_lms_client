import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, Grid, Typography } from "src/UILibrary"
import { Modal } from "src/components/modal"

interface SendModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleSendOpen: (open: boolean) => void
  // eslint-disable-next-line no-unused-vars
  handleConfirmOpen: (open: boolean) => void
}

export const SendModal: React.FC<SendModalProps> = ({
  open,
  handleSendOpen,
  handleConfirmOpen,
}) => {
  const { t } = useTranslation()

  const handleClose = () => {
    handleSendOpen(false)
  }

  const handleConfirm = () => {
    handleSendOpen(false)
    handleConfirmOpen(true)
  }

  return (
    <Modal handleClose={handleClose} open={open}>
      <Box sx={{ py: { md: "5.75rem", xs: "4.0625rem" }, px: "3rem" }}>
        <Typography.Heading sx={{ textAlign: "center", fontWeight: 500 }}>
          {t("application.send_confirm")}
        </Typography.Heading>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "1.25rem",
            flexDirection: { md: "row", xs: "column" },
          }}
          container
          spacing={2}
        >
          <Grid item sm={6} display="flex" justifyContent="flex-end">
            <Button
              sx={{
                fontWeight: "500",
                lineHeight: "0.875rem",
                color: "secondary.dark",
                p: "0.5625rem 2.625rem",
              }}
              variant="outlined"
            >
              {t("application.back")}
            </Button>
          </Grid>
          <Grid item sm={6} display="flex" justifyContent="flex-start">
            <Button
              sx={{
                fontWeight: "500",
                lineHeight: "0.875rem",
                bgcolor: "secondary.dark",
                color: "background.default",
                p: "0.5625rem 2.625rem",
              }}
              variant="contained"
              onClick={handleConfirm}
            >
              {t("application.confirm")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
