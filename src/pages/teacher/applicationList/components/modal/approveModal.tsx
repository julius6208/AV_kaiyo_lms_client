import React from "react"
import { useTranslation } from "react-i18next"

import { Typography, Button, Box, Divider, Stack } from "src/UILibrary"
import { Modal } from "src/components/modal"

import { Application } from "src/types/application"

//import { Application } from "src/types/application"

interface ApplicationModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleApproveOpen: (open: boolean) => void
  checkedApplicationDatas: Application[]
}

export const ApproveModal: React.FC<ApplicationModalProps> = ({
  open,
  handleApproveOpen,
  checkedApplicationDatas,
}) => {
  const { t } = useTranslation()
  const handleClose = () => {
    handleApproveOpen(false)
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
          {checkedApplicationDatas.map((item, index) => (
            <Box sx={{ display: "flex" }} key={index}>
              <Typography.Description sx={{ letterSpacing: 0 }}>{`${
                index + 1
              }件目`}</Typography.Description>
              <Typography.Description sx={{ ml: "3.5rem" }}>
                {`${t("application.registration_number")}`}
              </Typography.Description>
              <Typography.Description>{`: ${item.id}`}</Typography.Description>
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
        >
          {t("application.approve")}
        </Button>
      </Box>
    </Modal>
  )
}
