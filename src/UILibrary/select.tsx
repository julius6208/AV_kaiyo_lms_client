import React from "react"
import { Select as MuiSelect, SelectProps, InputBase, styled } from "@mui/material"

const Input = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderStyle: "solid",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    padding: "0.4375rem 0.625rem",
    fontWeight: 400,
    letterSpacing: "2px",
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider,
    borderWidth: "2px",
    "&:hover": {
      borderRadius: "0.25rem",
    },
    "&:focus": {
      borderRadius: "0.25rem",
    },
  },
}))

export const Select = ({ children, ...rest }: SelectProps) => {
  return (
    <MuiSelect input={<Input />} {...rest}>
      {children}
    </MuiSelect>
  )
}
