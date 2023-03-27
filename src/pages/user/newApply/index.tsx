import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, Divider, MenuItem, Select, TextField, Typography } from "src/UILibrary"
import { InputField } from "./components/field/inputField"
import { ConfirmModal } from "./components/modal/confirmModal"
import { SendModal } from "./components/modal/sendModal"

import { CATEGORY_TYPES } from "src/constants/categoryType"
import { CategoryType } from "src/types/application"

export const NewApply: React.FC = () => {
  const { t } = useTranslation()
  const [sendModalOpen, setSendModalOpen] = useState<boolean>(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)

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
            {t("application.new_apply")}
          </Typography.Heading>
        </Box>
        <Divider sx={{ borderColor: "text.primary", width: "100%", mt: "1rem", mb: "2.25rem" }} />
        <Box flexDirection="column" sx={{ display: "flex", gap: "2.375rem" }}>
          <Box flexDirection="column" sx={{ display: "flex", gap: "0.5rem" }}>
            <InputField label={t("application.category")}>
              <Select
                fullWidth
                sx={{
                  width: "50%",
                  "& .MuiSelect-select": {
                    bgcolor: "background.default",
                  },
                }}
              >
                {Object.keys(CATEGORY_TYPES).map((categoryType) => (
                  <MenuItem key={categoryType} value={categoryType}>
                    {t(CATEGORY_TYPES[categoryType as CategoryType])}
                  </MenuItem>
                ))}
              </Select>
            </InputField>
            <InputField label={t("application.student_number")}>
              <TextField sx={{ width: "50%" }} />
            </InputField>
            <InputField label={t("application.student_name")}>
              <TextField sx={{ width: "50%" }} />
            </InputField>
          </Box>
          <Box flexDirection="column" sx={{ display: "flex", gap: "0.5rem" }}>
            <InputField label={t("application.departure_time")}>
              <TextField sx={{ width: "50%" }} />
              <TextField sx={{ width: "48%", ml: "0.3rem" }} />
            </InputField>
            <InputField label={t("application.departure_companion")}>
              <TextField sx={{ width: "50%" }} />
            </InputField>
          </Box>
          <Box flexDirection="column" sx={{ display: "flex", gap: "0.5rem" }}>
            <InputField label={t("application.return_time")}>
              <TextField sx={{ width: "50%" }} />
              <TextField sx={{ width: "48%", ml: "0.3rem" }} />
            </InputField>
            <InputField label={t("application.return_companion")}>
              <TextField sx={{ width: "50%" }} />
            </InputField>
          </Box>
          <Box>
            <InputField label={t("application.application_content")}>
              <TextField
                rows={5}
                id="outlined-multiline-static"
                multiline
                defaultValue="テキスト"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: 0.1875,
                      border: "1px solid",
                      borderColor: "secondary.light",
                    },
                  },
                  width: "100%",
                }}
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
              mb: "3.75rem",
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
                p: "0.5625rem 2.375rem",
              }}
              variant="contained"
              onClick={() => setSendModalOpen(true)}
            >
              {t("application.send")}
            </Button>
          </Box>
        </Box>
        <SendModal
          open={sendModalOpen}
          handleSendOpen={setSendModalOpen}
          handleConfirmOpen={setConfirmModalOpen}
        />
        <ConfirmModal open={confirmModalOpen} handleConfirmOpen={setConfirmModalOpen} />
      </Box>
    </Box>
  )
}
