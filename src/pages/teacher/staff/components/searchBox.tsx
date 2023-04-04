import React from "react"
import { useTranslation } from "react-i18next"
import { USER_LIST } from "src/constants/userList"

import {
  Box,
  Button,
  ExpandLessIcon,
  ExpandMoreIcon,
  Popover,
  Radio,
  Select,
  TextField,
  Typography,
} from "src/UILibrary"

export const SearchBox: React.FC = () => {
  const { t } = useTranslation()
  const [anchorE1, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [anchorE2, setAnchorE2] = React.useState<HTMLButtonElement | null>(null)

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("event testing")
    setAnchorE2(event.currentTarget)
  }

  const handleClose1 = () => {
    setAnchorEl(null)
  }

  const handleClose2 = () => {
    setAnchorE2(null)
  }

  const open1 = Boolean(anchorE1)
  const open2 = Boolean(anchorE2)
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClick1}
        sx={{ bgcolor: "text.secondary", borderRadius: 0 }}
      >
        <Typography.Title sx={{ mr: "5rem", fontWeight: 500, color: "background.paper" }}>
          {t("application.filter_condition")}
        </Typography.Title>
        {open1 ? (
          <ExpandLessIcon sx={{ width: "16px", height: "16px" }} />
        ) : (
          <ExpandMoreIcon sx={{ width: "16px", height: "16px" }} />
        )}
      </Button>
      <Popover
        open={open1}
        anchorEl={anchorE1}
        onClose={handleClose1}
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
              <Box sx={{ ml: "6.25rem" }}>
                <Typography.Action>{t("user_list.user_type")}</Typography.Action>
                <Button onClick={handleClick2} sx={{ width: "100px", p: 0 }}>
                  <Select
                    disabled
                    sx={{
                      width: "100px",
                      "& .MuiSelect-select": {
                        bgcolor: "background.default",
                      },
                    }}
                  ></Select>
                </Button>
                <Popover
                  open={open2}
                  anchorEl={anchorE2}
                  onClose={handleClose2}
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
                  {USER_LIST.map((userList) => (
                    <Box key={userList.key} sx={{ display: "flex", alignItems: "center" }}>
                      <Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "12px",
                          },
                        }}
                      />
                      <Typography.Action>{t(userList.label)}</Typography.Action>
                    </Box>
                  ))}
                </Popover>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography.Action>{t("user_list.name_match")}</Typography.Action>
            <TextField sx={{ width: "100px" }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography.Action>{t("user_list.hiragana_match")}</Typography.Action>
              <TextField sx={{ width: "100px" }} />
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
