import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { EXTRA_ACTIVITY_LIST } from "src/constants/extraActivityList"
import { HOUSE } from "src/constants/house"

import {
  AdapterDateFns,
  Box,
  Button,
  Checkbox,
  CircleIcon,
  DatePicker,
  FormControl,
  IconButton,
  ListItemText,
  LocalizationProvider,
  MenuItem,
  RadioButtonUncheckedIcon,
  Select,
  TextField,
  Typography,
} from "src/UILibrary"
import { FieldDefinition, UserTable } from "src/components/userTable"
import { ReactComponent as EditIcon } from "src/assets/icons/edit.svg"
import { ConfirmModal } from "./components/confirmModal"
import { EditModal } from "./components/editModal"
import { WarningModal } from "./components/warningModal"

import { CATEGORY_TYPES } from "src/constants/categoryType"
import { CategoryType } from "src/types/application"
import { MEAL_TIME } from "src/constants/mealTime"
import { MealSkip } from "src/types/mealSkip"
import { MOCK_MEAL_SKIP_DATA } from "./mockMealSkip"

const mealSkipData: MealSkip[] = MOCK_MEAL_SKIP_DATA

const fields: FieldDefinition<MealSkip>[] = [
  {
    attribute: "affiliation",
    label: "meal.affiliation",
    width: 90,
  },
  {
    attribute: "target_number",
    label: "meal.target_number",
    width: 100,
  },
  {
    attribute: "start_date",
    label: "meal.start_date",
    width: 130,
  },
  {
    attribute: "end_date",
    label: "meal.end_date",
    width: 130,
  },
  {
    attribute: "grade",
    label: "user_list.grade",
    width: 80,
  },
  {
    attribute: "class",
    label: "user_list.class",
    width: 70,
  },
  {
    attribute: "house",
    label: "user_list.house",
    width: 70,
  },
  {
    attribute: "extra_activity",
    label: "user_list.extra_activity",
    width: 170,
  },
]

export const MealChoice: React.FC = () => {
  const { t } = useTranslation()
  const [mockCount, setMockCount] = useState<number>(0)
  const [startDate, setStartDate] = useState<string | null>()
  const [endDate, setEndDate] = useState<string | null>()
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false)

  const [grades, setGrades] = useState<number[]>([])
  const [learningGs, setLearningGs] = useState<number[]>([])
  const [dormitories, setDormitories] = useState<string[]>([])
  const [clubs, setClubs] = useState<number[]>([])

  const confirmCount = () => {
    if (mockCount > 1) {
      setWarningModalOpen(true)
      setMockCount(mockCount + 1)
    } else {
      setEditModalOpen(true)
      setMockCount(mockCount + 1)
    }
  }

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
            mt: "2rem",
            p: "1.25rem 1.5rem",
            borderRadius: "9px 9px 0px 0px",
            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.08)",
          }}
        >
          {edit === false && (
            <Typography.Title sx={{ fontWeight: 500, fontSize: "24px", lineHeight: "1.5rem" }}>
              {t("meal.meal_skip")}
            </Typography.Title>
          )}
          {edit === true && (
            <Typography.Title sx={{ fontWeight: 500, fontSize: "24px", lineHeight: "1.5rem" }}>
              {t("meal.meal_edit")}
            </Typography.Title>
          )}
          <IconButton onClick={() => setEdit(true)}>
            <EditIcon />
          </IconButton>
        </Box>
        {edit === false && (
          <UserTable
            fields={fields}
            content={mealSkipData}
            pagination={{ count: 10, currentPage: 1 }}
          />
        )}
        {edit === true && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              gap: "6.25rem",
              p: "16px 20px 20px 20px",
              mt: "3rem",
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
                <FormControl sx={{ width: "100px" }}>
                  <Select
                    sx={{
                      "& .MuiSelect-select": {
                        bgcolor: "background.default",
                      },
                    }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={grades}
                    onChange={(e) => setGrades(e.target.value as number[])}
                    renderValue={(selected: any) => selected.join(",")}
                  >
                    {new Array(6).fill(0).map((_, index) => (
                      <MenuItem key={index} value={index + 1}>
                        <Checkbox
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "12px",
                            },
                          }}
                          checked={grades.includes(index + 1)}
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<CircleIcon />}
                        />
                        <ListItemText primary={index + 1} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography.Action>{t("user_list.class_section")}</Typography.Action>
                <FormControl sx={{ width: "100px" }}>
                  <Select
                    sx={{
                      "& .MuiSelect-select": {
                        bgcolor: "background.default",
                      },
                    }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={learningGs}
                    onChange={(e) => setLearningGs(e.target.value as number[])}
                    renderValue={(selected: any) => selected.join(",")}
                  >
                    {new Array(4).fill(0).map((_, index) => (
                      <MenuItem key={index} value={index + 1}>
                        <Checkbox
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "12px",
                            },
                          }}
                          checked={learningGs.includes(index + 1)}
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<CircleIcon />}
                        />
                        <ListItemText primary={index + 1} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography.Action>{t("user_list.house_section")}</Typography.Action>
                <FormControl sx={{ width: "100px" }}>
                  <Select
                    sx={{
                      "& .MuiSelect-select": {
                        bgcolor: "background.default",
                      },
                    }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={dormitories}
                    onChange={(e) => setDormitories(e.target.value as string[])}
                    renderValue={(selected: any) => selected.join(",")}
                  >
                    {HOUSE.map((house, index) => (
                      <MenuItem key={index} value={house}>
                        <Checkbox
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "12px",
                            },
                          }}
                          checked={dormitories.includes(house)}
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<CircleIcon />}
                        />
                        <ListItemText primary={t(house)} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography.Action>{t("user_list.extra_activity_section")}</Typography.Action>
                <FormControl sx={{ width: "250px" }}>
                  <Select
                    sx={{
                      "& .MuiSelect-select": {
                        bgcolor: "background.default",
                      },
                    }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={clubs}
                    onChange={(e) => setClubs(e.target.value as number[])}
                    renderValue={(selected: any) =>
                      selected
                        .map((key: number) => {
                          return t(
                            `${EXTRA_ACTIVITY_LIST.find((element) => element.key === key)?.label}`
                          )
                        })
                        .join(",")
                    }
                  >
                    {EXTRA_ACTIVITY_LIST.map((activityList) => (
                      <MenuItem key={activityList.key} value={activityList.key}>
                        <Checkbox
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "12px",
                            },
                          }}
                          checked={clubs.includes(activityList.key)}
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<CircleIcon />}
                        />
                        <ListItemText primary={t(activityList.label)} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
        )}
        <ConfirmModal open={confirmModalOpen} handleConfirmOpen={setConfirmModalOpen} />
        <EditModal open={editModalOpen} handleEditOpen={setEditModalOpen} />
        <WarningModal open={warningModalOpen} handleWarningOpen={setWarningModalOpen} />
      </Box>
    </Box>
  )
}
