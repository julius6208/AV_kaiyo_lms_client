import React from "react"
import {
  UnfoldMoreIcon,
  KeyboardDoubleArrowDownIcon,
  KeyboardDoubleArrowUpIcon,
} from "src/UILibrary"

interface SortIconProps {
  fieldName?: string
  sortBy?: string
  sortOrder?: string
}

export const SortIcon: React.FC<SortIconProps> = ({ fieldName, sortBy, sortOrder }) => {
  return (
    <>
      {sortBy === fieldName ? (
        <>
          {sortOrder === "desc" ? (
            <KeyboardDoubleArrowUpIcon
              sx={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
          ) : (
            <KeyboardDoubleArrowDownIcon
              sx={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
          )}
        </>
      ) : (
        <UnfoldMoreIcon
          sx={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        />
      )}
    </>
  )
}
