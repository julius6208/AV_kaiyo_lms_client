import { createTheme } from "@mui/material/styles"

export const Theme = createTheme({
  palette: {
    background: {
      default: "#F8FAFE",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#00326E",
      dark: "#000000",
      light: "#176B92",
      contrastText: "#E5EAF0",
    },
    secondary: {
      main: "#C2DEFF",
      dark: "#2A7ADA",
      light: "#CDCDCF",
      contrastText: "#195194",
    },
    text: {
      primary: "#333333",
      secondary: "#1F286F",
      disabled: "#909090",
    },
    info: {
      main: "#176B92",
      light: "#F5F5F5",
      dark: "#F4F4F4",
      contrastText: "#2A6F1F",
    },
    common: {
      black: "#2B2A2A",
    },
    error: {
      main: "#DA2A2A",
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
