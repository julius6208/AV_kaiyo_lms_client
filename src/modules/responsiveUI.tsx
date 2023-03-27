import React from "react"

import { Box } from "src/UILibrary"

export function ResponsiveUI({
  mobile,
  laptop,
}: {
  mobile: React.ReactNode
  laptop: React.ReactNode
}) {
  return (
    <>
      <Box sx={{ display: { md: "none", xs: "block" } }}>{mobile}</Box>
      <Box sx={{ display: { md: "block", xs: "none" }, width: "100%" }}>{laptop}</Box>
    </>
  )
}
