import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { EXTRA_ACTIVITY_LIST } from "src/constants/extraActivityList"
import { HOUSE } from "src/constants/house"

import {
  AdapterDateFns,
  Box,
  Button,
  DatePicker,
  FormControl,
  FormControlLabel,
  IconButton,
  LocalizationProvider,
  MenuItem,
  Popover,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "src/UILibrary"
import { ReactComponent as EditIcon } from "src/assets/icons/edit.svg"
import { ConfirmModal } from "./components/confirmModal"
import { EditModal } from "./components/editModal"
import { WarningModal } from "./components/warningModal"

import { CATEGORY_TYPES } from "src/constants/categoryType"
import { CategoryType } from "src/types/application"
import { MEAL_TIME } from "src/constants/mealTime"

export const MealChoice: React.FC = () => {
  const { t } = useTranslation()
  const [mockCount, setMockCount] = useState<number>(0)
  const [anchorE1, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [anchorE2, setAnchorE2] = React.useState<HTMLButtonElement | null>(null)
  const [anchorE3, setAnchorE3] = React.useState<HTMLButtonElement | null>(null)
  const [anchorE4, setAnchorE4] = React.useState<HTMLButtonElement | null>(null)
  const [startDate, setStartDate] = useState<string | null>()
  const [endDate, setEndDate] = useState<string | null>()
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false)

  const confirmCount = () => {
    if (mockCount > 1) {
      setWarningModalOpen(true)
      setMockCount(mockCount + 1)
    } else {
      setEditModalOpen(true)
      setMockCount(mockCount + 1)
    }
  }

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE2(event.currentTarget)
  }

  const handleClick3 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE3(event.currentTarget)
  }

  const handleClick4 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE4(event.currentTarget)
  }

  const handleClose1 = () => {
    setAnchorEl(null)
  }

  const handleClose2 = () => {
    setAnchorE2(null)
  }

  const handleClose3 = () => {
    setAnchorE3(null)
  }

  const handleClose4 = () => {
    setAnchorE4(null)
  }

  const open1 = Boolean(anchorE1)
  const open2 = Boolean(anchorE2)
  const open3 = Boolean(anchorE3)
  const open4 = Boolean(anchorE4)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "850px",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "6rem",
            p: "1.25rem 1.5rem",
            borderRadius: "9px 9px 0px 0px",
            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography.Title sx={{ fontWeight: 500, fontSize: "24px", lineHeight: "1.5rem" }}>
            {t("meal.meal_edit")}
          </Typography.Title>
          <IconButton onClick={() => setEditModalOpen(true)}>
            <EditIcon />
          </IconButton>
        </Box>
        <Button variant="contained" sx={{ bgcolor: "text.secondary", borderRadius: 0 }}>
          <Typography.Title sx={{ mr: "5rem", fontWeight: 500, color: "background.paper" }}>
            {t("application.filter_condition")}
          </Typography.Title>
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: "6.25rem",
            p: "16px 20px 20px 20px",
            bgcolor: "info.dark",
            border: "1px solid",
            borderColor: "primary.contrastText",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box display="flex" flexDirection="column" sx={{ gap: "1.4rem" }}>
            <Box>
              <Typography.Action>{t("meal.affiliation")}</Typography.Action>
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
            </Box>
            <Box>
              <Typography.Action>{t("meal.target_number")}</Typography.Action>
              <TextField sx={{ width: "100px" }} />
            </Box>
            <Box>
              <Typography.Action>{t("meal.start_date")}</Typography.Action>
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
                <Select
                  fullWidth
                  sx={{
                    width: "100px",
                    ml: "2rem",
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
            </Box>
            <Box>
              <Typography.Action>{t("meal.end_date")}</Typography.Action>
              <Box display="flex" alignItems="center">
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
                <Select
                  fullWidth
                  sx={{
                    width: "100px",
                    ml: "2rem",
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
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" sx={{ gap: "1.25rem" }}>
            <Box>
              <Typography.Action>{t("user_list.grade_section")}</Typography.Action>
              <Button onClick={handleClick1} sx={{ width: "100px", p: 0 }}>
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
                open={open1}
                anchorEl={anchorE1}
                onClose={handleClose1}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                PaperProps={{
                  sx: {
                    width: "100px",
                    boxShadow: "none",
                  },
                }}
              >
                {new Array(6).fill(0).map((_, index) => (
                  <Box key={index} sx={{ px: "0.5rem" }}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value={index + 1}
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "12px",
                                },
                              }}
                            />
                          }
                          label={index + 1}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                ))}
              </Popover>
            </Box>
            <Box>
              <Typography.Action>{t("user_list.class_section")}</Typography.Action>
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
                    width: "100px",
                    boxShadow: "none",
                  },
                }}
              >
                {new Array(4).fill(0).map((_, index) => (
                  <Box key={index} sx={{ px: "0.5rem" }}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value={index + 1}
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "12px",
                                },
                              }}
                            />
                          }
                          label={index + 1}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                ))}
              </Popover>
            </Box>
            <Box>
              <Typography.Action>{t("user_list.house_section")}</Typography.Action>
              <Button onClick={handleClick3} sx={{ width: "100px", p: 0 }}>
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
                open={open3}
                anchorEl={anchorE3}
                onClose={handleClose3}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                PaperProps={{
                  sx: {
                    width: "100px",
                    boxShadow: "none",
                  },
                }}
              >
                {HOUSE.map((house, index) => (
                  <Box key={index} sx={{ px: "0.5rem" }}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value={house}
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "12px",
                                },
                              }}
                            />
                          }
                          label={t(house)}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                ))}
              </Popover>
            </Box>
            <Box>
              <Typography.Action>{t("user_list.extra_activity_section")}</Typography.Action>
              <Button onClick={handleClick4} sx={{ width: "200px", p: 0 }}>
                <Select
                  disabled
                  sx={{
                    width: "200px",
                    "& .MuiSelect-select": {
                      bgcolor: "background.default",
                    },
                  }}
                ></Select>
              </Button>
              <Popover
                open={open4}
                anchorEl={anchorE4}
                onClose={handleClose4}
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
                {EXTRA_ACTIVITY_LIST.map((activityList) => (
                  <Box key={activityList.key} sx={{ px: "0.5rem" }}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value={activityList.key}
                          control={
                            <Radio
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "12px",
                                },
                              }}
                            />
                          }
                          label={t(activityList.label)}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                ))}
              </Popover>
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "secondary.dark",
              borderRadius: "0.1875rem",
              mt: "500px",
              px: "2rem",
            }}
            onClick={confirmCount}
          >
            <Typography.Detail>{t("application.confirm")}</Typography.Detail>
          </Button>
        </Box>
        <ConfirmModal open={confirmModalOpen} handleConfirmOpen={setConfirmModalOpen} />
        <EditModal open={editModalOpen} handleEditOpen={setEditModalOpen} />
        <WarningModal open={warningModalOpen} handleWarningOpen={setWarningModalOpen} />
      </Box>
    </Box>
  )
}
