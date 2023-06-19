import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, Typography, UploadIcon } from "src/UILibrary"
import { FieldDefinition, UploadTable } from "src/components/uploadTable"
import { UploadModal } from "src/pages/mealMaker/mealData/components/uploadModal"
import { RemoveModal } from "./components/removeModal"

import { Upload } from "src/types/uploadData"
import { mockUploadData } from "./mockData"

const fields: FieldDefinition<Upload>[] = [
  {
    attribute: "id",
    label: "login.id",
    width: 120,
  },
  {
    attribute: "fullName",
    label: "mypage.name",
    width: 120,
  },
  {
    attribute: "user_id",
    label: "ID",
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

export const UploadData: React.FC = () => {
  const { t } = useTranslation()

  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false)
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
          maxWidth: "850px",
          width: "100%",
          height: "100%",
        }}
      >
        <Button
          sx={{
            position: "absolute",
            right: "15.75rem",
            top: "1.75rem",
            fontWeight: "500",
            lineHeight: "0.875rem",
            color: "text.secondary",
            border: "1px solid",
            borderColor: "text.secondary",
            p: "0.5625rem 1.25rem",
          }}
          variant="outlined"
          onClick={() => setUploadModalOpen(true)}
        >
          {t("create_folder.new_upload")}
          <UploadIcon sx={{ width: "20px", height: "20px" }} />
        </Button>
        <Box
          sx={{
            mt: "4.5rem",
            p: "1.4375rem 1.25rem",
            borderRadius: "9px 9px 0px 0px",
            bgcolor: "background.paper",
          }}
        >
          <Typography.Heading sx={{ fontWeight: 500 }}>
            {`${t("menu.folder")}>2023年駿台模試結果一覧`}
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
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Typography.Heading sx={{ textAlign: "center", fontWeight: 500 }}>
              {t("create_folder.file_number")}：160
            </Typography.Heading>
          </Box>
          <UploadTable
            fields={fields}
            content={mockUploadData || []}
            pagination={{ count: 160, currentPage: 1 }}
          />
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
              p: "0.5625rem 2.375rem",
              mr: "1.25rem",
            }}
            variant="outlined"
          >
            {t("application.back")}
          </Button>
          <Button
            sx={{
              fontWeight: "500",
              lineHeight: "0.875rem",
              bgcolor: "secondary.dark",
              color: "background.default",
              p: "0.5625rem 0.75rem",
            }}
            variant="contained"
            onClick={() => setRemoveModalOpen(true)}
          >
            {t("create_folder.to_upload")}
          </Button>
        </Box>
        <UploadModal open={uploadModalOpen} handleUploadOpen={setUploadModalOpen} />
        <RemoveModal open={removeModalOpen} handleRemoveOpen={setRemoveModalOpen} />
      </Box>
    </Box>
  )
}
