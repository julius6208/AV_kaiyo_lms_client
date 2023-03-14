import React from "react"
import type { FC } from "react"
import { ListItemButton as MuiListItemButton, ListItemButtonProps } from "@mui/material"

export const ListItemButton: FC<ListItemButtonProps> = ({ children, sx, ...rest }) => {
  return (
    <MuiListItemButton
      sx={{
        padding: "0.5rem 1.25rem",
        "& .MuiListItemIcon-root": {
          minWidth: 30,
        },
        "& .MuiListItemText-root": {
          margin: 0,
        },
        "& .MuiListItemText-primary": {
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "14px",
        },
        "&.Mui-selected": {
          backgroundColor: "secondary.dark",
          "&:hover": {
            backgroundColor: "secondary.dark",
          },
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiListItemButton>
  )
}
