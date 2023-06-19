import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, Pagination, Typography } from "src/UILibrary"
import { FieldDefinition, UploadTable } from "src/components/uploadTable"
import { RemoveModal } from "../uploadData/components/removeModal"

import { mockUploadData } from "./mockData"
import { FileLists } from "src/types/fileList"

const fields: FieldDefinition<FileLists>[] = [
  {
    attribute: "page",
    label: "page",
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
    width: 120,
  },
  {
    attribute: "recipient",
    label: "create_folder.recipient",
    width: 120,
  },
]

export const OCREdit: React.FC = () => {
  const { t } = useTranslation()

  const [removeModalOpen, setRemoveModalOpen] = useState<boolean>(false)

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
          width: "100%",
          height: "100%",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            p: "1.4375rem 1.25rem",
            borderRadius: "9px 9px 0px 0px",
          }}
        >
          <Typography.Heading sx={{ fontWeight: 500 }}>
            {`${t("menu.folder")}>2023年駿台模試結果一覧`}
          </Typography.Heading>
        </Box>
        <Box sx={{ display: "flex", mt: "2rem", gap: "2rem", justifyContent: "center" }}>
          <Box
            sx={{
              p: "1.25rem 1.25rem",
              minHeight: "calc(100vh - 250px)",
              bgcolor: "info.dark",
              border: "1px solid",
              borderColor: "primary.contrastText",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography.Detail sx={{ color: "error.main", textDecoration: "underline" }}>
                {t("create_folder.remove")}
              </Typography.Detail>
              <Typography.Detail sx={{ color: "text.secondary", textDecoration: "underline" }}>
                {t("create_folder.destination_reflect")}
              </Typography.Detail>
            </Box>
            <UploadTable fields={fields} content={mockUploadData || []} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.25rem",
            }}
          >
            <Pagination color="primary" count={24} page={1} />
            <Box
              sx={{
                minWidth: "518px",
                minHeight: "calc(100vh - 300px)",
                border: "20px solid",
                borderColor: "common.black",
              }}
            ></Box>
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
            onClick={() => setRemoveModalOpen(true)}
          >
            {t("application.confirm")}
          </Button>
        </Box>
        <RemoveModal open={removeModalOpen} handleRemoveOpen={setRemoveModalOpen} />
      </Box>
    </Box>
  )
}
