import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import {
  AdapterDateFns,
  Box,
  Button,
  DatePicker,
  ExpandLessIcon,
  ExpandMoreIcon,
  LocalizationProvider,
  Popover,
  TextField,
  Typography,
} from "src/UILibrary"

export const StudentSearchBox: React.FC = () => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [startDate, setStartDate] = useState<string | null>()
  const [endDate, setEndDate] = useState<string | null>()

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
        <Typography.Title
          sx={{
            fontWeight: 500,
            color: "background.paper",
            mr: { md: "5rem", xs: "2.5rem" },
            ml: { md: 0, xs: "2.5rem" },
          }}
        >
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
            p: "16px 20px 20px 20px",
            bgcolor: "info.dark",
            border: "1px solid",
            borderColor: "primary.contrastText",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.08)",
            width: { md: "524px", xs: "334px" },
          }}
        >
          <Box>
            <Typography.Action>{t("application.application_time")}</Typography.Action>
            <Box display="flex" alignItems="center" sx={{ mt: "0.625rem", mb: "1.25rem" }}>
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
            <Typography.Action>{t("application.departure_time")}</Typography.Action>
            <Box display="flex" alignItems="center" sx={{ mt: "0.625rem", mb: "1.25rem" }}>
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
            <Typography.Action>{t("application.return_time")}</Typography.Action>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <Box display="flex" alignItems="center" sx={{ mt: "0.625rem" }}>
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
              <Button
                sx={{
                  backgroundColor: "secondary.dark",
                  borderRadius: "0.1875rem",
                  p: "0.5625rem 0.4375rem",
                  mt: "0.625rem",
                  mx: "auto",
                  width: "115px",
                }}
                variant="contained"
              >
                <Typography.Detail>{t("application.search_condition")}</Typography.Detail>
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}
