import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { Box, Button, Checkbox, LocalHospitalIcon, Typography } from "src/UILibrary"

import { ReactComponent as PencilIcons } from "src/assets/icons/pencil.svg"
import { EditFolderList } from "./components/editFolderList"

export const CreateFolder: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [edit, setEdit] = useState<boolean>(false)
  const [mockAddFolder, setMockAddFolder] = useState<boolean>(false)
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
            top: "3.125rem",
            fontWeight: "500",
            lineHeight: "0.875rem",
            bgcolor: "text.secondary",
            p: "0.6875rem 1.25rem",
          }}
          variant="contained"
          onClick={() => setMockAddFolder(true)}
        >
          {t("create_folder.new_folder")}
          <LocalHospitalIcon sx={{ ml: "0.625rem" }} />
        </Button>
        <Box
          sx={{
            mt: "7.5rem",
            p: "1.4375rem 1.25rem",
            borderRadius: "9px 9px 0px 0px",
            bgcolor: "background.paper",
          }}
        >
          <Typography.Heading sx={{ fontWeight: 500 }}>{t("menu.folder")}</Typography.Heading>
        </Box>
        <Box
          sx={{
            p: "1.25rem 1.25rem",
            bgcolor: "info.dark",
            border: "1px solid",
            borderColor: "primary.contrastText",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "error.main",
                borderRadius: "0.1875rem",
                p: "0.5625rem 1.75rem",
                mb: "1.25rem",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography.Detail sx={{ textAlign: "center" }}>
                {t("create_folder.multitle_delete")}
              </Typography.Detail>
            </Button>
          </Box>
          {edit ? (
            <EditFolderList />
          ) : (
            <Box sx={{ display: "flex", cursor: "pointer", gap: "0.625rem" }}>
              <Box sx={{ display: "flex" }}>
                <Checkbox
                  sx={{ p: 0, mr: "1.25rem", "& .MuiSvgIcon-root": { fontSize: "1.5rem" } }}
                />
                <Typography.Heading sx={{ display: "flex", textAlign: "center", fontWeight: 400 }}>
                  2022/10/10
                </Typography.Heading>
              </Box>
              <Box sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: "1.25rem" }}>
                  <Typography.Heading
                    sx={{ display: "flex", textAlign: "center", fontWeight: 400 }}
                    onClick={() => navigate("/teacher/create-folder/upload-data")}
                  >
                    2023年夏 駿大模試結果一覧
                  </Typography.Heading>
                  <Box
                    sx={{
                      p: "0.375rem 1rem",
                      color: "secondary.dark",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: "secondary.dark",
                    }}
                  >
                    <Typography.Detail>先生</Typography.Detail>
                  </Box>
                </Box>
                <PencilIcons onClick={() => setEdit(true)} />
              </Box>
            </Box>
          )}
          {mockAddFolder && <EditFolderList />}
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
              p: "0.5625rem 1.75rem",
            }}
            variant="contained"
          >
            {t("create_folder.confirm")}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
