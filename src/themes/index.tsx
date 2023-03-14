import { createTheme } from "@mui/material/styles"

export const Theme = createTheme({
  palette: {
    background: {
      default: "#FFF",
      paper: "#FAFAFA",
    },
    primary: {
      main: "#00326E",
      dark: "#000000",
      contrastText: "#FFF",
    },
    text: {
      primary: "#333333",
      secondary: "#1F286F",
      disabled: "#909090",
    },
    info: {
      main: "#176B92",
    },
    divider: "#E5E5E5",
  },
})
