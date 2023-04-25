import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { MEAL_TIME } from "src/constants/mealTime"
import { USER_LIST } from "src/constants/userList"

import {
  AdapterDateFns,
  Box,
  Button,
  DatePicker,
  ExpandLessIcon,
  ExpandMoreIcon,
  LocalizationProvider,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from "src/UILibrary"

export const SearchBox: React.FC = () => {
  const { t } = useTranslation()
  const [startDate, setStartDate] = useState<string | null>()
  const [endDate, setEndDate] = useState<string | null>()
  const [anchorE1, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose1 = () => {
    setAnchorEl(null)
  }

  const open1 = Boolean(anchorE1)
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
            <Typography.Action>{t("meal.display_month")}</Typography.Action>
            <Box display="flex" alignItems="center">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={startDate}
                  onChange={(value) => setStartDate(value)}
                  inputFormat="yyyy/MM/dd"
                  renderInput={(params) => (
                    <TextField fullWidth sx={{ width: "140px" }} {...params} />
                  )}
                />
              </LocalizationProvider>
              <Typography.Description sx={{ mx: 1 }}>~</Typography.Description>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={endDate}
                  onChange={(value) => setEndDate(value)}
                  inputFormat="yyyy/MM/dd"
                  renderInput={(params) => (
                    <TextField fullWidth sx={{ width: "140px" }} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box>
            <Typography.Action>{t("meal.division")}</Typography.Action>
            <Select
              fullWidth
              sx={{
                width: "140px",
                "& .MuiSelect-select": {
                  bgcolor: "background.default",
                },
              }}
            >
              {USER_LIST.map((userList) => (
                <MenuItem key={userList.key} value={userList.key}>
                  {t(userList.label)}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography.Action>{t("meal.meal")}</Typography.Action>
              <Select
                fullWidth
                sx={{
                  width: "140px",
                  "& .MuiSelect-select": {
                    bgcolor: "background.default",
                  },
                }}
              >
                {MEAL_TIME.map((mealTime) => (
                  <MenuItem key={mealTime.value} value={mealTime.value}>
                    {t(mealTime.label)}
                  </MenuItem>
                ))}
              </Select>
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
