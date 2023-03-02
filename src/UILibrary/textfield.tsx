import React from "react"
import { TextField as MuiTextField, TextFieldProps } from "@mui/material"

export const TextField: React.FC<TextFieldProps> = ({ children, sx, ...rest }) => {
  return (
    <MuiTextField
      sx={{
        bgcolor: "background.default",
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "divider",
            borderRadius: 1.25,
          },
          "&.Mui-disabled": {
            "& fieldset": {
              borderColor: "text.disabled",
            },
          },
        },
        "& input": {
          fontSize: 14,
          lineHeight: 1,
          paddingX: 1.5,
          paddingY: 1.25,
          fontWeight: 400,
          borderRadius: 1,
          color: "text.primary",
          "&.Mui-disabled": {
            WebkitTextFillColor: "text.disabled",
            color: "text.disabled",
          },
        },
        "& textarea": {
          fontSize: 14,
          lineHeight: 1.2,
          fontWeight: 400,
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiTextField>
  )
}
