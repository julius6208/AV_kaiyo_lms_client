import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"

import { Box, Button, CircularProgress, Divider, TextField, Typography } from "src/UILibrary"
import { InputField } from "../newApply/components/field/inputField"

import { useGetApplication } from "src/queries/application"
import { formattedDate } from "src/modules/date"
import { useSession } from "src/modules/sessionProvider"

export const UserApplicationDetail: React.FC = () => {
  const { t } = useTranslation()
  const session = useSession()
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: applicationData,
    isLoading,
    error,
  } = useGetApplication(id || "", session?.value.tokenInfo.id_token || "")

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: { xs: 35, md: 50 }, flexGrow: 1 }}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography.DetailHeading sx={{ textAlign: "center", color: "error.main", flexGrow: 1 }}>
        {error.message}
      </Typography.DetailHeading>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "660px",
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{ mt: "3.75rem" }}>
          <Typography.Heading sx={{ flex: 1, fontWeight: 500, textAlign: "center" }}>
            {t("application.application_detail")}
          </Typography.Heading>
        </Box>
        <Divider sx={{ borderColor: "text.primary", width: "100%", mt: "1rem", mb: "2.25rem" }} />
        <Box flexDirection="column" sx={{ display: "flex", gap: "0.5rem" }}>
          <InputField label={t("application.registration_number")}>
            <TextField
              sx={{ width: { md: "50%", xs: "100%" } }}
              value={applicationData?.data.student_id || ""}
            />
          </InputField>
          <InputField label={t("application.student")}>
            <TextField
              sx={{ width: { md: "50%", xs: "100%" } }}
              value={applicationData?.data.student_name || ""}
            />
          </InputField>
          <InputField label={t("application.charge")}>
            <TextField
              sx={{ width: { md: "50%", xs: "100%" } }}
              value={applicationData?.data.hm || ""}
            />
          </InputField>
          <InputField label={t("application.application_time")}>
            <TextField
              sx={{ width: { md: "50%", xs: "100%" } }}
              value={formattedDate(applicationData?.data.created_at as string) || ""}
            />
          </InputField>
          <InputField label={t("application.departure_time")}>
            <TextField
              sx={{ width: { md: "50%", xs: "100%" } }}
              value={formattedDate(applicationData?.data.departure_datetime as string) || ""}
            />
          </InputField>
          <InputField label={t("application.return_time")}>
            <TextField
              sx={{ width: { md: "50%", xs: "100%" } }}
              value={formattedDate(applicationData?.data.arrival_datetime as string) || ""}
            />
          </InputField>
          <InputField label={t("application.category")}>
            <TextField
              sx={{ width: { md: "50%", xs: "100%" } }}
              value={applicationData?.data.category || ""}
            />
          </InputField>
          <InputField label={t("application.application_content")}>
            <TextField
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: 0.1875,
                    border: "1px solid",
                    borderColor: "secondary.light",
                  },
                },
              }}
              rows={5}
              id="outlined-multiline-static"
              multiline
              value={applicationData?.data.content || ""}
            />
          </InputField>
          <InputField label={t("application.approval_status")}>
            <TextField
              sx={{ width: { md: "50%", xs: "100%" } }}
              value={applicationData?.data.status || ""}
            />
          </InputField>
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
            sx={{
              fontWeight: "500",
              lineHeight: "0.875rem",
              bgcolor: "secondary.dark",
              color: "background.default",
              p: "0.5625rem 3.75rem",
            }}
            variant="contained"
            onClick={() => navigate(-1)}
          >
            {t("application.back_list")}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
