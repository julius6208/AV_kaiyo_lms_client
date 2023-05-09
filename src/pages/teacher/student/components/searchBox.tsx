import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import {
  AdapterDateFns,
  Box,
  Button,
  Checkbox,
  CircleIcon,
  DatePicker,
  ExpandLessIcon,
  ExpandMoreIcon,
  FormControl,
  ListItemText,
  LocalizationProvider,
  MenuItem,
  Popover,
  Radio,
  RadioButtonUncheckedIcon,
  Select,
  TextField,
  Typography,
} from "src/UILibrary"

import { HOUSE } from "src/constants/house"
import { IStudentListFilters } from "src/types/student"
import { EXTRA_ACTIVITY_LIST } from "src/constants/extraActivityList"
import { formatDate } from "src/modules/date"

interface SearchBoxProps {
  initialData: IStudentListFilters
  // eslint-disable-next-line no-unused-vars
  handleFilterChange: (data: IStudentListFilters) => void
}

export const SearchBox: React.FC<SearchBoxProps> = ({ initialData, handleFilterChange }) => {
  const { t } = useTranslation()

  const [anchorE0, setAnchorE0] = React.useState<HTMLButtonElement | null>(null)

  const [sort] = useState<string>(initialData.sort)
  const [firstId, setFirstId] = useState<string>(initialData.ids.split(",")[0])
  const [secondId, setSecondId] = useState<string>(initialData.ids.split(",")[1])
  const [fullName, setFullName] = useState<string>(initialData.fullName)
  const [fullNameKana, setFullNameKana] = useState<string>(initialData.fullNameKana)
  const [startBirthday, setStartBirthday] = useState<string | null>(
    initialData.birthday.split(",")[0] ? initialData.birthday.split(",")[0] : null
  )
  const [endBirthday, setEndBirthday] = useState<string | null>(
    initialData.birthday.split(",")[1] ? initialData.birthday.split(",")[1] : null
  )
  const [curriculum, setCurriculum] = useState<string>(initialData.curriculum)
  const [enrolledSibling, setEnrolledSibling] = useState<string>(initialData.enrolledSibling)

  const [grades, setGrades] = useState<number[]>(
    !initialData.grades ? [] : initialData.grades.split(",").map(Number)
  )
  const [learningGs, setLearningGs] = useState<number[]>(
    !initialData.learningG ? [] : initialData.learningG.split(",").map(Number)
  )
  const [dormitories, setDormitories] = useState<string[]>(
    !initialData.dormitory ? [] : initialData.dormitory.split(",")
  )
  const [clubs, setClubs] = useState<number[]>(
    !initialData.club_id ? [] : initialData.club_id.split(",").map(Number)
  )

  const handleClick = () => {
    handleFilterChange({
      sort,
      ids:
        firstId && secondId
          ? firstId + "," + secondId
          : firstId && !secondId
          ? firstId
          : !firstId && secondId
          ? "," + secondId
          : "",
      birthday:
        startBirthday && endBirthday
          ? formatDate(startBirthday.toString(), "yyyy-MM-dd") +
            "," +
            formatDate(endBirthday.toString(), "yyyy-MM-dd")
          : startBirthday && !endBirthday
          ? formatDate(startBirthday.toString(), "yyyy-MM-dd")
          : !startBirthday && endBirthday
          ? "," + formatDate(endBirthday.toString(), "yyyy-MM-dd")
          : "",
      fullName,
      fullNameKana,
      grades: grades.join(","),
      learningG: learningGs.join(","),
      dormitory: dormitories.join(","),
      club_id: clubs.join(","),
      curriculum,
      enrolledSibling,
    })
    setAnchorE0(null)
  }

  const handleClick0 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE0(event.currentTarget)
  }

  const handleClose0 = () => {
    setAnchorE0(null)
  }

  const open0 = Boolean(anchorE0)
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClick0}
        sx={{ bgcolor: "text.secondary", borderRadius: 0 }}
      >
        <Typography.Title sx={{ mr: "5rem", fontWeight: 500, color: "background.paper" }}>
          {t("application.filter_condition")}
        </Typography.Title>
        {open0 ? (
          <ExpandLessIcon sx={{ width: "16px", height: "16px" }} />
        ) : (
          <ExpandMoreIcon sx={{ width: "16px", height: "16px" }} />
        )}
      </Button>
      <Popover
        open={open0}
        anchorEl={anchorE0}
        onClose={handleClose0}
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
              <Typography.Action>{t("user_list.id_range")}</Typography.Action>
              <Box display="flex" alignItems="center">
                <TextField
                  sx={{ width: "100px" }}
                  value={firstId}
                  onChange={(e) => setFirstId(e.target.value)}
                />
                <Typography.Description sx={{ mx: 1 }}>~</Typography.Description>
                <TextField
                  sx={{ width: "100px" }}
                  value={secondId}
                  onChange={(e) => setSecondId(e.target.value)}
                />
              </Box>
            </Box>
            <Box>
              <Typography.Action>{t("user_list.name_match")}</Typography.Action>
              <TextField
                sx={{ width: "100px" }}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Box>
            <Box>
              <Typography.Action>{t("user_list.hiragana_match")}</Typography.Action>
              <TextField
                sx={{ width: "100px" }}
                value={fullNameKana}
                onChange={(e) => setFullNameKana(e.target.value)}
              />
            </Box>
            <Box>
              <Typography.Action>{t("user_list.birth_period")}</Typography.Action>
              <Box display="flex" alignItems="center">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={startBirthday}
                    onChange={(value) => setStartBirthday(value)}
                    inputFormat="yyyy-MM-dd"
                    renderInput={(params) => (
                      <TextField fullWidth sx={{ width: "140px" }} {...params} />
                    )}
                  />
                </LocalizationProvider>
                <Typography.Description sx={{ mx: 1 }}>~</Typography.Description>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={endBirthday}
                    onChange={(value) => setEndBirthday(value)}
                    inputFormat="yyyy-MM-dd"
                    renderInput={(params) => (
                      <TextField fullWidth sx={{ width: "140px" }} {...params} />
                    )}
                  />
                </LocalizationProvider>
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
          <Box display="flex" flexDirection="column" sx={{ gap: "1.25rem" }}>
            <Box>
              <Typography.Action>{t("user_list.curriculum")}</Typography.Action>
              <TextField
                sx={{ width: "100px" }}
                value={curriculum}
                onChange={(e) => setCurriculum(e.target.value)}
              />
            </Box>
            <Box>
              <Typography.Action>{t("user_list.enrolled_sibling")}</Typography.Action>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ mr: "0.5rem" }}>
                  <Typography.Action>{t("user_list.exist")}</Typography.Action>
                  <Radio
                    sx={{
                      p: 0,
                      "& .MuiSvgIcon-root": {
                        fontSize: "12px",
                      },
                    }}
                    value="yes"
                    checked={enrolledSibling === "yes"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEnrolledSibling(e.target.value)
                    }
                  />
                </Box>
                <Box>
                  <Typography.Action>{t("user_list.nothing")}</Typography.Action>
                  <Radio
                    sx={{
                      p: 0,
                      "& .MuiSvgIcon-root": {
                        fontSize: "12px",
                      },
                    }}
                    value="no"
                    checked={enrolledSibling === "no"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEnrolledSibling(e.target.value)
                    }
                  />
                </Box>
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "secondary.dark",
                borderRadius: "0.1875rem",
                mt: "auto",
              }}
              onClick={handleClick}
            >
              <Typography.Detail>{t("application.search_condition")}</Typography.Detail>
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}
