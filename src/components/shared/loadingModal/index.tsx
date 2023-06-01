import React from "react"

import { Dialog, CircularProgress } from "src/UILibrary"

interface LoadingModalProps {
  open: boolean
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ open }) => {
  return (
    <Dialog
      open={open}
      sx={{ "& .MuiPaper-root": { overflow: "hidden", boxShadow: "none", bgcolor: "transparent" } }}
    >
      <CircularProgress size={80} color="secondary" />
    </Dialog>
  )
}
