import React from "react"
import "dayjs/locale/ja"

import {
  AdapterDayjs,
  Box,
  DatePicker,
  LocalizationProvider,
  TextField,
  Typography,
} from "src/UILibrary"

interface DateTypeProps {
  mealDate: string
  setMealDate?: Function
}

export const DateType: React.FC<DateTypeProps> = ({ mealDate, setMealDate }) => {
  const getYear = new Date(mealDate).getFullYear()
  const getMonth = new Date(mealDate).getMonth()
  const getDay = new Date(mealDate).getDate()

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { md: "flex-start", xs: "center" },
        alignItems: "center",
      }}
    >
      <Box sx={{ display: { md: "block", xs: "none" } }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
          <DatePicker
            views={["month", "year"]}
            value={mealDate || ""}
            onChange={(value) => !!setMealDate && setMealDate(value)}
            renderInput={(params) => <TextField fullWidth sx={{ width: "160px" }} {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ position: "absolute", display: { md: "none", xs: "block" } }}>
        <Typography.Action sx={{ fontSize: "20px", color: "text.secondary" }}>
          {`${getYear}年${getMonth + 1}月${getDay}日`}
        </Typography.Action>
      </Box>
      <Box sx={{ display: { md: "none", xs: "block", opacity: 0 } }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
          <DatePicker
            views={["month", "day", "year"]}
            value={mealDate || ""}
            onChange={(value) => !!setMealDate && setMealDate(value)}
            renderInput={(params) => <TextField fullWidth sx={{ width: "160px" }} {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  )
}
