import React from "react"
import { LoadingButton, LoadingButtonProps } from "@mui/lab"

export const Button: React.FC<LoadingButtonProps> = ({ children, sx, ...rest }) => {
  return (
    <LoadingButton
      sx={{
        fontSize: 14,
        lineHeight: 1,
        fontWeight: 700,
        textTransform: "capitalize",
        borderRadius: 1,
        py: 1.625,
        px: 2.5,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </LoadingButton>
  )
}
