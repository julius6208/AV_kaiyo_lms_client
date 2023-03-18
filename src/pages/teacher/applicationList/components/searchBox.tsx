import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import {
  AdapterDateFns,
  Box,
  Button,
  DatePicker,
  ExpandLessIcon,
  ExpandMoreIcon,
  Grid,
  LocalizationProvider,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from "src/UILibrary"

import { CategoryType, ApproveType } from "src/types/application"
import { CATEGORY_TYPES } from "src/constants/categoryType"
import { APPROVE_TYPES } from "src/constants/approveType"

export const SearchBox: React.FC = () => {
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
            p: "16px 20px 20px 20px",
            bgcolor: "info.dark",
            border: "1px solid",
            borderColor: "primary.contrastText",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.08)",
            width: "684px",
          }}
        >
          <Grid container>
            <Grid item sm={3}>
              <Typography.Action>{t("application.registration_number")}</Typography.Action>
              <TextField sx={{ width: "100px" }} />
            </Grid>
            <Grid item sm={6}>
              <Typography.Action>{t("application.application_time")}</Typography.Action>
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
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={3}>
              <Typography.Action>{t("application.category")}</Typography.Action>
              <Select
                fullWidth
                sx={{
                  width: "100px",
                  "& .MuiSelect-select": {
                    bgcolor: "background.default",
                  },
                }}
              >
                {Object.keys(CATEGORY_TYPES).map((categoryType) => (
                  <MenuItem key={categoryType} value={categoryType}>
                    {t(CATEGORY_TYPES[categoryType as CategoryType])}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item sm={6}>
              <Typography.Action>{t("application.departure_time")}</Typography.Action>
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
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={3}>
              <Typography.Action>{t("application.approval_status")}</Typography.Action>
              <Select
                fullWidth
                sx={{
                  width: "100px",
                  "& .MuiSelect-select": {
                    bgcolor: "background.default",
                  },
                }}
              >
                {Object.keys(APPROVE_TYPES).map((approveType) => (
                  <MenuItem key={approveType} value={approveType}>
                    {t(APPROVE_TYPES[approveType as ApproveType])}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item sm={6}>
              <Typography.Action>{t("application.return_time")}</Typography.Action>
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
            </Grid>
            <Grid
              item
              sm={3}
              sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "secondary.dark",
                  borderRadius: "0.1875rem",
                }}
              >
                <Typography.Detail>{t("application.search_condition")}</Typography.Detail>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </Box>
  )
}
