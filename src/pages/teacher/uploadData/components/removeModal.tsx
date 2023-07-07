import React from "react"
import { useTranslation } from "react-i18next"

import { Typography, Button, Box } from "src/UILibrary"
import { Modal } from "src/components/modal"

interface RemoveModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleRemoveOpen: (open: boolean) => void
}

export const RemoveModal: React.FC<RemoveModalProps> = ({ open, handleRemoveOpen }) => {
  const { t } = useTranslation()

  const handleClose = () => {
    handleRemoveOpen(false)
  }

  return (
    <Modal handleClose={handleClose} open={open}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          gap: 5,
          py: "7rem",
        }}
      >
        <Typography.Heading
          sx={{
            fontSize: "24px",
            color: "text.primary",
            textAlign: "center",
            lineHeight: "1.25rem",
            fontWeight: "500",
          }}
        >
          {t("create_folder.bulk_delete")}
        </Typography.Heading>
        <Box>
          <Button
            sx={{
              fontWeight: "500",
              lineHeight: "0.875rem",
              color: "secondary.dark",
              p: "0.5625rem 2.375rem",
              mr: "1.25rem",
            }}
            onClick={handleClose}
            variant="outlined"
          >
            {t("application.back")}
          </Button>
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
            {t("application.confirm")}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
