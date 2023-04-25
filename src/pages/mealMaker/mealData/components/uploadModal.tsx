import React, { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"

import { Typography, Button, Box, Dialog, DropzoneAreaBase, FileObject } from "src/UILibrary"

interface UploadModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleUploadOpen: (open: boolean) => void
}

const MAX_COUNT = 5

const CustomIcon = ({ errorMessage }: { errorMessage?: string }) => {
  const { t } = useTranslation()

  return (
    <Box mt={3}>
      <Typography.Detail sx={{ fontSize: "20px", marginBottom: "24px" }}>
        {t("meal.or")}
      </Typography.Detail>
      <Button
        role="submit"
        sx={{
          fontWeight: "500",
          lineHeight: "0.875rem",
          bgcolor: "secondary.dark",
          color: "background.default",
          p: "0.5625rem 1.625rem",
          mb: "0.5rem",
        }}
        variant="contained"
      >
        {t("meal.select_file")}
      </Button>
      {errorMessage && (
        <Typography.Detail sx={{ color: "error.main" }}>{errorMessage}</Typography.Detail>
      )}
    </Box>
  )
}

export const UploadModal: React.FC<UploadModalProps> = ({ open, handleUploadOpen }) => {
  const { t } = useTranslation()
  const handleClose = () => {
    handleUploadOpen(false)
  }

  const [errorType, setErrorType] = useState<string>("")

  const readPDFs = useCallback((newFiles: FileObject[]) => {
    if (!newFiles.every((file) => file.file.type.includes("csv"))) {
      setErrorType("upload_file_type_error")
    } else if (newFiles.length > MAX_COUNT) {
      setErrorType("upload_max_file_exceed")
    }
  }, [])

  return (
    <Dialog
      PaperProps={{
        sx: {
          bgcolor: "info.dark",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.08)",
          width: { md: "720px" },
          p: "1.5rem 1.875rem",
        },
      }}
      onClose={handleClose}
      open={open}
      maxWidth="lg"
    >
      <Box
        sx={{
          "& .MuiDropzoneArea-root": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "& .MuiTypography-root": {
              mt: 0,
            },
          },
        }}
      >
        <DropzoneAreaBase
          dropzoneText={t("meal.upload_dropzone_text")}
          Icon={() => <CustomIcon errorMessage={errorType ? t(`meal.${errorType}`) : undefined} />}
          acceptedFiles={[]}
          showPreviewsInDropzone={false}
          onAdd={readPDFs}
          filesLimit={MAX_COUNT}
          maxFileSize={52428800} // 50MB
          fileObjects={[]}
          showAlerts={false}
        />
      </Box>
    </Dialog>
  )
}
