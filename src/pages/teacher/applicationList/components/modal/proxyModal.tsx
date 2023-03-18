import React from "react"
import { useTranslation } from "react-i18next"

import { Typography, Button, Box, Divider, Grid, TextField, Select, MenuItem } from "src/UILibrary"
import { Modal } from "src/components/modal"
import { InputField } from "../field/inputField"

import { CATEGORY_TYPES } from "src/constants/categoryType"
import { CategoryType } from "src/types/application"

interface ProxyModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleProxyOpen: (open: boolean) => void
}

export const ProxyModal: React.FC<ProxyModalProps> = ({ open, handleProxyOpen }) => {
  const { t } = useTranslation()
  const handleClose = () => {
    handleProxyOpen(false)
  }

  return (
    <Modal handleClose={handleClose} open={open} title={t("application.proxy_application")}>
      <Divider sx={{ borderColor: "text.primary", width: "100%" }} />
      <Box sx={{ mt: "2.5rem" }}>
        <Grid container>
          <Grid container spacing={1} item sm={4}>
            <InputField label={t("application.category")}>
              <Select
                fullWidth
                sx={{
                  width: "100px",
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
            <InputField label={t("application.charge")}>
              <TextField sx={{ height: "32px", width: "100px" }} />
            </InputField>
            <InputField label="ID">
              <TextField sx={{ height: "32px", width: "100px" }} />
            </InputField>
            <InputField label={t("application.student")}>
              <TextField sx={{ height: "32px", width: "100px" }} />
            </InputField>
            <InputField label={t("application.parent")}>
              <TextField sx={{ height: "32px", width: "100px" }} />
            </InputField>
          </Grid>
          <Grid item sm={8}>
            <Box sx={{ mb: "0.875rem" }}>
              <Typography.Description>{t("application.reason")}</Typography.Description>
            </Box>
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
                "& textarea": {
                  width: { md: "420px", xs: "200px" },
                },
              }}
            />
          </Grid>
        </Grid>
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
