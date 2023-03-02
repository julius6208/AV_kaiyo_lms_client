import React from "react"
import { Box } from "src/UILibrary"

export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex", overflow: "hidden" }}>
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
