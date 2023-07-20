import React from "react"
import { useTranslation } from "react-i18next"

import { Typography, Box, Divider, Grid } from "src/UILibrary"
import { Modal } from "src/components/modal"

interface DetailModalProps {
  open: boolean
  handleDetailModalOpen: Function
}

export const DetailModal: React.FC<DetailModalProps> = ({ open, handleDetailModalOpen }) => {
  const { t } = useTranslation()

  const handleClose = () => {
    handleDetailModalOpen(false)
  }

  return (
    <Modal handleClose={handleClose} open={open}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: "3.75rem" }}>
        <Typography.Heading sx={{ flex: 1 }}></Typography.Heading>
        <Typography.Heading sx={{ flex: 1, fontWeight: 500, textAlign: "center" }}>
          {t("application.application")}
        </Typography.Heading>
        <Typography.Description
          sx={{ flex: 1, fontSize: "14px", lineHeight: "1.25rem", textAlign: "right" }}
        ></Typography.Description>
      </Box>
      <Divider sx={{ borderColor: "text.primary", width: "100%", mt: "1rem" }} />
      <Box sx={{ mt: "2.5rem" }}>
        <Grid container rowSpacing={2}>
          <Grid container spacing={1} item sm={5}>
            <Typography.Description></Typography.Description>
            <Typography.Description></Typography.Description>
            <Typography.Description></Typography.Description>
            <Typography.Description></Typography.Description>
            <Typography.Description></Typography.Description>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
