import React from "react"
import { useTranslation } from "react-i18next"

import { Button, Box } from "src/UILibrary"
import { Modal } from "src/components/modal"

interface ConfirmModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleWarningOpen: (open: boolean) => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, handleWarningOpen }) => {
  const { t } = useTranslation()
  const handleClose = () => {
    handleWarningOpen(false)
  }

  return (
    <Modal handleClose={handleClose} open={open} title={t("meal.download_confirm")}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          mt: "1.25rem",
          mb: "3.75rem",
        }}
      >
        <Button
          sx={{
            fontWeight: "500",
            lineHeight: "0.875rem",
            bgcolor: "secondary.dark",
            color: "background.default",
            p: "0.5625rem 2.375rem",
          }}
          variant="contained"
        >
          {t("application.back")}
        </Button>
      </Box>
    </Modal>
  )
}
