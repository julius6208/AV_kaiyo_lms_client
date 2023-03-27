import React, { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"

import { Typography, Dialog, DialogTitle, DialogContent, IconButton } from "src/UILibrary"

export const Modal = ({
  open,
  title,
  children,
  handleClose,
}: PropsWithChildren<{
  open: boolean
  title?: string
  handleClose: () => void
}>) => {
  const { t } = useTranslation()
  return (
    <Dialog
      PaperProps={{
        sx: {
          bgcolor: "info.dark",
          border: "1px solid",
          borderColor: "primary.dark",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.08)",
          width: { md: "720px", xs: "362px" },
        },
      }}
      onClose={handleClose}
      open={open}
      maxWidth="lg"
    >
      {title && (
        <DialogTitle sx={{ m: 0, pt: "5rem" }}>
          <Typography.Heading
            sx={{
              fontSize: "24px",
              color: "text.primary",
              textAlign: "center",
              lineHeight: "1.25rem",
              fontWeight: "500",
            }}
          >
            {t(title)}
          </Typography.Heading>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          ></IconButton>
        </DialogTitle>
      )}
      <DialogContent
        sx={{
          borderBottom: 0,
          borderTop: "1px solid",
          borderColor: "info.dark",
          p: { md: "1.25rem 1.5rem", xs: "0" },
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
