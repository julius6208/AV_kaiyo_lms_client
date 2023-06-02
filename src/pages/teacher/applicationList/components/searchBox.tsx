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

import { CategoryType, IApplicationListFilters } from "src/types/application"
import { CATEGORY_TYPES } from "src/constants/categoryType"
import { APPROVE_TYPES } from "src/constants/approveType"
import { formatDate } from "src/modules/date"

interface SearchBoxProps {
  initialData: IApplicationListFilters
  // eslint-disable-next-line no-unused-vars
  handleFilterChange: (data: IApplicationListFilters) => void
}

export const SearchBox: React.FC<SearchBoxProps> = ({ initialData, handleFilterChange }) => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const [sort] = useState<string>(initialData.sort)
  const [studentName, setStudentName] = useState<string>(initialData.student_name)
  const [category, setCategory] = useState<string>(initialData.category)
  const [status, setStatus] = useState<string>(initialData.status)
  const [startCreatedAt, setStartCreatedAt] = useState<string | null>(
    initialData.created_at.split(",")[0] ? initialData.created_at.split(",")[0] : null
  )
  const [endCreatedAt, setEndCreatedAt] = useState<string | null>(
    initialData.created_at.split(",")[1] ? initialData.created_at.split(",")[1] : null
  )
  const [startDepartureDate, setStartDepartureDate] = useState<string | null>(
    initialData.departure_date.split(",")[0] ? initialData.departure_date.split(",")[0] : null
  )
  const [endDepartureDate, setEndDepartureDate] = useState<string | null>(
    initialData.departure_date.split(",")[1] ? initialData.departure_date.split(",")[1] : null
  )
  const [startArrivalDate, setStartArrivalDate] = useState<string | null>(
    initialData.arrival_date.split(",")[0] ? initialData.arrival_date.split(",")[0] : null
  )
  const [endArrivalDate, setEndArrivalDate] = useState<string | null>(
    initialData.arrival_date.split(",")[1] ? initialData.arrival_date.split(",")[1] : null
  )

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleFilter = () => {
    handleFilterChange({
      sort,
      student_name: studentName,
      category,
      status,
      created_at:
        startCreatedAt && endCreatedAt
          ? formatDate(startCreatedAt.toString(), "yyyy-MM-dd hh:mm:ss") +
            "," +
            formatDate(endCreatedAt.toString(), "yyyy-MM-dd hh:mm:ss")
          : startCreatedAt && !endCreatedAt
          ? formatDate(startCreatedAt.toString(), "yyyy-MM-dd hh:mm:ss")
          : !startCreatedAt && endCreatedAt
          ? "," + formatDate(endCreatedAt.toString(), "yyyy-MM-dd hh:mm:ss")
          : "",
      departure_date:
        startDepartureDate && endDepartureDate
          ? formatDate(startDepartureDate.toString(), "yyyy-MM-dd hh:mm:ss") +
            "," +
            formatDate(endDepartureDate.toString(), "yyyy-MM-dd hh:mm:ss")
          : startDepartureDate && !endDepartureDate
          ? formatDate(startDepartureDate.toString(), "yyyy-MM-dd hh:mm:ss")
          : !startDepartureDate && endDepartureDate
          ? "," + formatDate(endDepartureDate.toString(), "yyyy-MM-dd hh:mm:ss")
          : "",
      arrival_date:
        startArrivalDate && endArrivalDate
          ? formatDate(startArrivalDate.toString(), "yyyy-MM-dd hh:mm:ss") +
            "," +
            formatDate(endArrivalDate.toString(), "yyyy-MM-dd hh:mm:ss")
          : startArrivalDate && !endArrivalDate
          ? formatDate(startArrivalDate.toString(), "yyyy-MM-dd hh:mm:ss")
          : !startArrivalDate && endArrivalDate
          ? "," + formatDate(endArrivalDate.toString(), "yyyy-MM-dd hh:mm:ss")
          : "",
    })
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
              <Typography.Action>{t("application.name")}</Typography.Action>
              <TextField
                sx={{ width: "100px" }}
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </Grid>
            <Grid item sm={6}>
              <Typography.Action>{t("application.application_time")}</Typography.Action>
              <Box display="flex" alignItems="center">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={startCreatedAt}
                    onChange={(value) => setStartCreatedAt(value)}
                    inputFormat="yyyy/MM/dd"
                    renderInput={(params) => (
                      <TextField fullWidth sx={{ width: "140px" }} {...params} />
                    )}
                  />
                </LocalizationProvider>
                <Typography.Description sx={{ mx: 1 }}>~</Typography.Description>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={endCreatedAt}
                    onChange={(value) => setEndCreatedAt(value)}
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
                value={category}
                onChange={(e) => setCategory(e.target.value as string)}
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
                    value={startDepartureDate}
                    onChange={(value) => setStartDepartureDate(value)}
                    inputFormat="yyyy/MM/dd"
                    renderInput={(params) => (
                      <TextField fullWidth sx={{ width: "140px" }} {...params} />
                    )}
                  />
                </LocalizationProvider>
                <Typography.Description sx={{ mx: 1 }}>~</Typography.Description>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={endDepartureDate}
                    onChange={(value) => setEndDepartureDate(value)}
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
                value={status}
                onChange={(e) => setStatus(e.target.value as string)}
              >
                {APPROVE_TYPES.map((approveType) => (
                  <MenuItem key={approveType.key} value={approveType.value}>
                    {t(approveType.label)}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item sm={6}>
              <Typography.Action>{t("application.return_time")}</Typography.Action>
              <Box display="flex" alignItems="center">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={startArrivalDate}
                    onChange={(value) => setStartArrivalDate(value)}
                    inputFormat="yyyy/MM/dd"
                    renderInput={(params) => (
                      <TextField fullWidth sx={{ width: "140px" }} {...params} />
                    )}
                  />
                </LocalizationProvider>
                <Typography.Description sx={{ mx: 1 }}>~</Typography.Description>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={endArrivalDate}
                    onChange={(value) => setEndArrivalDate(value)}
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
                onClick={handleFilter}
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
