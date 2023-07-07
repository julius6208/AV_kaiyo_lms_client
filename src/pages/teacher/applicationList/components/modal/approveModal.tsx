import { AxiosError } from "axios"
import React from "react"
import { useTranslation } from "react-i18next"
import { useQueryClient } from "@tanstack/react-query"

import { Typography, Button, Box, Divider, Stack } from "src/UILibrary"
import { Modal } from "src/components/modal"

import { usePushAlerts } from "src/hooks/alerts"
import { useApproveApplications } from "src/queries/application"
import { useSession } from "src/modules/sessionProvider"

interface ApplicationModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleApproveOpen: (open: boolean) => void
  checkedApplicationIds: number[]
}

export const MultipleApproveModal: React.FC<ApplicationModalProps> = ({
  open,
  handleApproveOpen,
  checkedApplicationIds,
}) => {
  const { t } = useTranslation()
  const session = useSession()
  const queryClient = useQueryClient()
  const pushAlerts = usePushAlerts()

  const handleClose = () => {
    handleApproveOpen(false)
  }

  const { mutate: approveApplications, isLoading } = useApproveApplications({
    onSuccess: () => {
      queryClient.invalidateQueries(["getApplicationList"])
      handleClose()
    },
    onError: (err: AxiosError) => {
      pushAlerts({ message: err.message, color: "error" })
    },
  })

  const onApproveApplications = () => {
    approveApplications({
      ids: checkedApplicationIds,
      token: session?.value.tokenInfo.id_token || "",
    })
  }

  if (!checkedApplicationIds.length) {
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
            mt: "2.5rem",
            mb: "3.75rem",
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
            {t("application.approval_warning")}
          </Typography.Heading>
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

  return (
    <Modal
      handleClose={handleClose}
      open={open}
      title={`${t("application.checked")}5${t("application.approve_request")}`}
    >
      <Divider sx={{ borderColor: "text.primary", width: "100%" }} />
      <Box sx={{ display: "flex", justifyContent: "center", mt: "2.5rem", px: "13rem" }}>
        <Stack gap={{ md: "1.25rem", xs: "1.25rem" }}>
          {checkedApplicationIds.map((item, index) => (
            <Box sx={{ display: "flex" }} key={index}>
              <Typography.Description sx={{ letterSpacing: 0 }}>{`${
                index + 1
              }件目`}</Typography.Description>
              <Typography.Description sx={{ ml: "3.5rem" }}>
                {`${t("application.registration_number")}`}
              </Typography.Description>
              <Typography.Description>{`: ${item}`}</Typography.Description>
            </Box>
          ))}
        </Stack>
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
          onClick={onApproveApplications}
        >
          {t("application.approve")}
        </Button>
      </Box>
    </Modal>
  )
}
