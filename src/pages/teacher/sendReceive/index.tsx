import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Box, Button, TextField, Typography } from "src/UILibrary"
import { FieldDefinition, UploadTable } from "src/components/uploadTable"

import { FileLists } from "src/types/fileList"
import { mockUploadData } from "./mockData"

const fields: FieldDefinition<FileLists>[] = [
  {
    attribute: "page",
    label: "page",
    width: 60,
  },
  {
    attribute: "fullName",
    label: "mypage.name",
  },
  {
    attribute: "grade",
    label: "user_list.grade",
    width: 60,
  },
  {
    attribute: "recipient",
    label: "create_folder.recipient",
  },
  {
    attribute: "status",
    label: "send_receive.send_status",
  },
]

export const SendReceive: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          p: "2.75rem 1.25rem",
          width: "100%",
          height: "100%",
          bgcolor: "background.paper",
        }}
      >
        <Typography.Heading sx={{ fontWeight: 500 }}>
          {`${t("send_receive.send_receive_management")}>2023年駿台模試結果一覧`}
        </Typography.Heading>
        <Box sx={{ display: "flex", mt: "2rem", gap: "1.25rem", justifyContent: "center" }}>
          <Box
            sx={{
              width: "50%",
              p: "1.25rem 1.25rem",
              minHeight: "calc(100vh - 250px)",
              bgcolor: "info.dark",
              border: "1px solid",
              borderColor: "primary.contrastText",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.08)",
            }}
          >
            <UploadTable fields={fields} content={mockUploadData || []} />
          </Box>
          <Box
            sx={{
              px: "1.25rem",
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <Typography.Description>{t("send_receive.send_all")}</Typography.Description>
            <Box sx={{ mt: "2rem" }}>
              <Typography.Description>{t("send_receive.title")}</Typography.Description>
              <TextField
                sx={{
                  bgcolor: "background.paper",
                  mt: "0.25rem",
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: 0.1875,
                      border: "1px solid",
                      borderColor: "secondary.light",
                    },
                  },
                }}
              />
            </Box>
            <Box>
              <Typography.Description>{t("send_receive.message")}</Typography.Description>
              <TextField
                rows={6}
                multiline
                id="outlined-multiline-static"
                sx={{
                  mt: "0.25rem",
                  width: "100%",
                  bgcolor: "background.paper",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: 0.1875,
                      border: "1px solid",
                      borderColor: "secondary.light",
                    },
                  },
                  "& textarea": {
                    width: "100%",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "1.25rem",
          }}
        >
          <Button
            sx={{
              fontWeight: "500",
              lineHeight: "0.875rem",
              color: "secondary.dark",
              p: "0.5625rem 2.625rem",
              mr: "1.25rem",
            }}
            variant="outlined"
          >
            {t("create_folder.forward")}
          </Button>
          <Button
            sx={{
              fontWeight: "500",
              lineHeight: "0.875rem",
              bgcolor: "secondary.dark",
              color: "background.default",
              p: "0.5625rem 2.625rem",
            }}
            variant="contained"
            onClick={() => navigate("/teacher/send-list")}
          >
            {t("application.send")}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
