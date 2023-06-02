import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

import { Button, Box } from "src/UILibrary"
import { Modal } from "src/components/modal"

interface ConfirmModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleConfirmOpen: (open: boolean) => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, handleConfirmOpen }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleClose = () => {
    handleConfirmOpen(false)
    navigate("/application")
  }

  return (
    <Modal handleClose={handleClose} open={open} title={t("application.submit_confirm")}>
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
          variant="contained"
          sx={{
            fontWeight: "500",
            lineHeight: "0.875rem",
            bgcolor: "secondary.dark",
            color: "background.default",
            p: "0.5625rem 2.375rem",
          }}
          onClick={handleClose}
        >
          {t("application.back")}
        </Button>
      </Box>
    </Modal>
  )
}
