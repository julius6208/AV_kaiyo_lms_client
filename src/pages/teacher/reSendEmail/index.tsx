import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import {
  Box,
  Button,
  LinearProgress,
  Typography,
  linearProgressClasses,
  styled,
} from "src/UILibrary"
import { FieldDefinition, UploadTable } from "src/components/uploadTable"

import { SendStatus } from "src/types/sendStatus"
import { mockSendList } from "./mockData"

const fields: FieldDefinition<SendStatus>[] = [
  {
    attribute: "page",
    label: "page",
    width: 70,
  },
  {
    attribute: "time",
    label: "send_receive.time",
    width: 120,
  },
  {
    attribute: "fullName",
    label: "mypage.name",
    width: 120,
  },
  {
    attribute: "grade",
    label: "user_list.grade",
    width: 70,
  },
  {
    attribute: "recipient",
    label: "create_folder.recipient",
    width: 140,
  },
  {
    attribute: "status",
    label: "send_receive.send_status",
    width: 140,
  },
  {
    attribute: "school",
    label: "application.send",
    widget: () => (
      <Button
        variant="outlined"
        sx={{
          color: "secondary.dark",
          fontWeight: 500,
          fontSize: "12px",
          lineHeight: "12px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        再送信
      </Button>
    ),
  },
]

export const ReSendEmail: React.FC = () => {
  const { t } = useTranslation()
  const [progress, setProgress] = useState(10)

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.background.paper,
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.secondary.dark,
    },
  }))

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10))
    }, 800)
    return () => {
      clearInterval(timer)
    }
  }, [])

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
          maxWidth: "814px",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            mt: "4.5rem",
            p: "1.4375rem 1.25rem",
            borderRadius: "9px 9px 0px 0px",
            bgcolor: "background.paper",
          }}
        >
          <Typography.Heading sx={{ fontWeight: 500 }}>
            {`${t("send_receive.send_receive_management")}>2023年駿台模試結果一覧`}
          </Typography.Heading>
        </Box>
        <Box
          sx={{
            p: "1.25rem 1.25rem",
            minHeight: "calc(100vh - 200px)",
            bgcolor: "info.dark",
            border: "1px solid",
            borderColor: "primary.contrastText",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography.Detail sx={{ fontSize: "16px", lineHeight: "1.5rem", mb: "0.625rem" }}>
            送信中… 1/24
          </Typography.Detail>
          <BorderLinearProgress value={progress} variant="determinate" />
          <UploadTable fields={fields} content={mockSendList || []} />
        </Box>
      </Box>
    </Box>
  )
}
