import { createTheme } from "@mui/material/styles"

export const Theme = createTheme({
  palette: {
    background: {
      default: "#F8FAFE",
      paper: "#FFF",
    },
    primary: {
      main: "#00326E",
      dark: "#000",
      light: "#176B92",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#C2DEFF",
      dark: "#2A7ADA",
    },
    text: {
      primary: "#333333",
      secondary: "#C2DEFF",
      disabled: "#909090",
    },
    info: {
      main: "#2A7ADA",
    },
    divider: "#E5E5E5",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "secondary" && {
              color: "#00326E",
            }),
        }),
      },
    },
  },
})
