import React from "react"
import { Box, BoxProps } from "@mui/material"

export const Image: React.FC<BoxProps & { src: string; alt?: string }> = ({
  src,
  alt = "Image",
  sx,
  ...rest
}) => {
  return (
    <Box
      display="flex"
      sx={{
        overflow: "hidden",
        "& img": { objectFit: "cover", maxWidth: "100%", height: "auto" },
        ...sx,
      }}
      {...rest}
    >
      <Box component="img" src={src} alt={alt} />
    </Box>
  )
}
