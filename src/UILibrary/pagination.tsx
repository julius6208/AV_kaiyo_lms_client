import React from "react"

import { Pagination as MuiPagination, PaginationProps } from "@mui/material"

export const Pagination: React.FC<PaginationProps> = ({ sx, ...rest }) => {
  return (
    <MuiPagination
      shape="circular"
      sx={{
        "& button": {
          fontSize: "0.75rem",
          width: "auto",
          minWidth: "20px",
          height: "20px",
          px: "0.125rem",
          "&:not(.Mui-selected)": {
            color: "black",
          },
          "&.Mui-selected": {
            color: "background.default",
          },
        },
        ...sx,
      }}
      {...rest}
    />
  )
}
