import React from "react"
import {
  UnfoldMoreIcon,
  // KeyboardDoubleArrowDownIcon,
  // KeyboardDoubleArrowUpIcon,
} from "src/UILibrary"

// interface SortIconProps {
//   fieldNo: string
//   sortBy: string
//   sortOrder: string
// }

export const SortIcon: React.FC = () => {
  return (
    <>
      {/* {sortBy === fieldNo ? (
        <>
          {sortOrder === "asc" ? (
            <KeyboardDoubleArrowUpIcon sx={{ width: "16px", height: "16px", mr: "0.125rem" }} />
          ) : (
            <KeyboardDoubleArrowDownIcon sx={{ width: "16px", height: "16px", mr: "0.125rem" }} />
          )}
        </>
      ) : ( */}
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
      {/* )} */}
    </>
  )
}
