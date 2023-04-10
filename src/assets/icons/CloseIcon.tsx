import React from "react"

import { Box } from "src/UILibrary"

import { IconProps } from "src/types/icon"

export const CloseIcon: React.FC<IconProps> = ({ sx, width, height, color }: IconProps) => {
  return (
    <Box sx={{ ...sx }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.85123 7.43402L1.41447 0L0 1.41395L7.43702 8.84823L0.00324735 16.282L1.41746 17.6962L8.85149 10.2622L16.2839 17.6919L17.6984 16.2779L10.2657 8.84797L17.6984 1.4153L16.2842 0.00108844L8.85123 7.43402Z"
          fill={color || "grey"}
        />
      </svg>
    </Box>
  )
}
