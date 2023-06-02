import { AxiosError } from "axios"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useQueryClient } from "@tanstack/react-query"

import { Typography, Button, Box, Divider, TextField } from "src/UILibrary"
import { Modal } from "src/components/modal"

import { usePushAlerts } from "src/hooks/alerts"
import { useRejectApplication } from "src/queries/application"

interface DenyModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleDenyOpen: (open: boolean) => void
  registNumber?: number
}

export const DenyModal: React.FC<DenyModalProps> = ({ open, handleDenyOpen, registNumber }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const pushAlerts = usePushAlerts()
  const [rejectReason, setRejectReason] = useState<string>("")

  const handleClose = () => {
    handleDenyOpen(false)
  }

  const { mutate: rejectApplication, isLoading } = useRejectApplication({
    onSuccess: () => {
      queryClient.invalidateQueries(["getApplicationList"])
      handleClose()
    },
    onError: (err: AxiosError) => {
      pushAlerts({ message: err.message, color: "error" })
    },
  })

  const onRejectApplication = () => {
    rejectApplication({
      id: registNumber,
      token: "",
      data: { reason: rejectReason },
    })
  }

  return (
    <Modal handleClose={handleClose} open={open}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: "3.75rem" }}>
        <Typography.Heading sx={{ flex: 1 }}></Typography.Heading>
        <Typography.Heading sx={{ flex: 1, fontWeight: 500, textAlign: "center" }}>
          {t("application.deny_reason")}
        </Typography.Heading>
        <Typography.Description
          sx={{ flex: 1, fontSize: "14px", lineHeight: "1.25rem", textAlign: "right" }}
        >
          {`${t("application.registration_number")}:${registNumber}`}
        </Typography.Description>
      </Box>
      <Divider sx={{ borderColor: "text.primary", width: "100%", mt: "1rem" }} />
      <Box sx={{ mt: "2.5rem" }}>
        <TextField
          rows={8}
          id="outlined-multiline-static"
          multiline
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: 0.1875,
                border: "1px solid",
                borderColor: "secondary.light",
              },
            },
            "& textarea": {
              width: { md: "645px", xs: "400px" },
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          mt: "2.5rem",
          mb: "3.75rem",
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
          onClick={handleClose}
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
          loading={isLoading}
          disabled={isLoading}
          onClick={onRejectApplication}
        >
          {t("application.deny")}
        </Button>
      </Box>
    </Modal>
  )
}
