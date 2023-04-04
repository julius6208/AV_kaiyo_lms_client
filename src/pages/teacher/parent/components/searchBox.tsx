import React from "react"
import { useTranslation } from "react-i18next"

import {
  Box,
  Button,
  ExpandLessIcon,
  ExpandMoreIcon,
  Popover,
  TextField,
  Typography,
} from "src/UILibrary"

export const SearchBox: React.FC = () => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{ bgcolor: "text.secondary", borderRadius: 0 }}
      >
        <Typography.Title sx={{ mr: "5rem", fontWeight: 500, color: "background.paper" }}>
          {t("application.filter_condition")}
        </Typography.Title>
        {open ? (
          <ExpandLessIcon sx={{ width: "16px", height: "16px" }} />
        ) : (
          <ExpandMoreIcon sx={{ width: "16px", height: "16px" }} />
        )}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            boxShadow: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            p: "16px 20px 20px 20px",
            bgcolor: "info.dark",
            border: "1px solid",
            borderColor: "primary.contrastText",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box>
            <Typography.Action>{t("user_list.id_range")}</Typography.Action>
            <Box display="flex" alignItems="center">
              <TextField sx={{ width: "100px" }} />
              <Typography.Description sx={{ mx: 1 }}>~</Typography.Description>
              <TextField sx={{ width: "100px" }} />
            </Box>
          </Box>
          <Box>
            <Typography.Action>{t("user_list.name_match")}</Typography.Action>
            <TextField sx={{ width: "100px" }} />
          </Box>
          <Box>
            <Typography.Action>{t("user_list.hiragana_match")}</Typography.Action>
            <TextField sx={{ width: "100px" }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography.Action>{t("user_list.address_match")}</Typography.Action>
              <TextField sx={{ width: "233px" }} />
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "secondary.dark",
                borderRadius: "0.1875rem",
                mt: "auto",
                ml: "6.25rem",
              }}
            >
              <Typography.Detail>{t("application.search_condition")}</Typography.Detail>
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}
