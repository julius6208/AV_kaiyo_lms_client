import React from "react"
import { useTranslation } from "react-i18next"

import { Typography, Button, Box, Divider, Grid, TextField } from "src/UILibrary"
import { Modal } from "src/components/modal"
import { InputField } from "../field/inputField"

import { Application } from "src/types/application"

interface ApplicationModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleApplicationOpen: (open: boolean) => void
  application?: Application
  // eslint-disable-next-line no-unused-vars
  handleDenyOpen: (open: boolean) => void
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  open,
  handleApplicationOpen,
  application,
  handleDenyOpen,
}) => {
  const { t } = useTranslation()

  const handleClose = () => {
    handleApplicationOpen(false)
  }

  const handleDeny = () => {
    handleApplicationOpen(false)
    handleDenyOpen(true)
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
        >
          {`${t("application.registration_number")}:${application?.id}`}
        </Typography.Description>
      </Box>
      <Divider sx={{ borderColor: "text.primary", width: "100%", mt: "1rem" }} />
      <Box sx={{ mt: "2.5rem" }}>
        <Grid container rowSpacing={2}>
          <Grid container spacing={1} item sm={5}>
            <InputField label={t("application.category")}>
              <Typography.Description>{`: ${application?.category}`}</Typography.Description>
            </InputField>
            <InputField label={t("application.student_number")}>
              <Typography.Description>: 1111111</Typography.Description>
            </InputField>
            <InputField label={t("application.student_name")}>
              <Typography.Description>{`: ${application?.student}`}</Typography.Description>
            </InputField>
            <InputField label={t("application.departure_time")}>
              <Typography.Description>: 3月7日 午前10時</Typography.Description>
            </InputField>
            <InputField label={t("application.departure_companion")}>
              <Typography.Description>: 吉岡美波</Typography.Description>
            </InputField>
            <InputField label={t("application.return_time")}>
              <Typography.Description>: 3月7日 午前10時</Typography.Description>
            </InputField>
            <InputField label={t("application.return_companion")}>
              <Typography.Description>: 吉岡美波</Typography.Description>
            </InputField>
          </Grid>
          <Grid item sm={7} sx={{ pl: "0.6rem" }}>
            <Box sx={{ mb: "0.875rem" }}>
              <Typography.Description>{t("application.reason")}</Typography.Description>
            </Box>
            <TextField
              rows={6}
              id="outlined-multiline-static"
              multiline
              value={application?.reason}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: 0.1875,
                    border: "1px solid",
                    borderColor: "secondary.light",
                  },
                },
                "& textarea": {
                  width: { md: "351px", xs: "200px" },
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          mt: "2.5rem",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            fontWeight: "500",
            lineHeight: "0.875rem",
            color: "secondary.dark",
            p: "0.5625rem 2.375rem",
            mr: "1.25rem",
          }}
          onClick={handleDeny}
        >
          {t("application.deny")}
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
        >
          {t("application.approve")}
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography.Heading
          sx={{ fontWeight: "900", color: "secondary.dark", cursor: "pointer", p: "1.125rem" }}
          onClick={handleClose}
        >
          {t("application.back")}
        </Typography.Heading>
      </Box>
    </Modal>
  )
}
