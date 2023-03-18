import React from "react"
import { LoadingButton, LoadingButtonProps } from "@mui/lab"

export const Button: React.FC<LoadingButtonProps> = ({ color, children, sx, ...rest }) => {
  return (
    <LoadingButton
      sx={{
        fontSize: 14,
        lineHeight: 1,
        fontWeight: 700,
        textTransform: "capitalize",
        borderRadius: color === "info" ? "9px" : 1,
        py: 1.625,
        px: 2.5,
        "&:hover": {
          bgcolor: "secondary.contrastText",
        },
        ...sx,
      }}
      color={color}
      {...rest}
    >
      {children}
    </LoadingButton>
  )
}
