import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { USER_LIST } from "src/constants/userList"
import { ITeacherListFilters } from "src/types/teacher"

import {
  Box,
  Button,
  Checkbox,
  CircleIcon,
  ExpandLessIcon,
  ExpandMoreIcon,
  FormControl,
  ListItemText,
  MenuItem,
  Popover,
  RadioButtonUncheckedIcon,
  Select,
  TextField,
  Typography,
} from "src/UILibrary"

interface SearchBoxProps {
  initialData: ITeacherListFilters
  // eslint-disable-next-line no-unused-vars
  handleFilterChange: (data: ITeacherListFilters) => void
}

export const SearchBox: React.FC<SearchBoxProps> = ({ initialData, handleFilterChange }) => {
  const { t } = useTranslation()
  const [anchorE1, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [sort] = useState<string>(initialData.sort)
  const [firstId, setFirstId] = useState<string>(initialData.ids.split(",")[0])
  const [secondId, setSecondId] = useState<string>(initialData.ids.split(",")[1])
  const [fullName, setFullName] = useState<string>(initialData.fullName)
  const [fullNameKana, setFullNameKana] = useState<string>(initialData.fullNameKana)
  const [types, setTypes] = useState<string[]>(
    !initialData.types ? [] : initialData.types.split(",")
  )

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose1 = () => {
    setAnchorEl(null)
  }

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
      fullName,
      fullNameKana,
      types: types.join(","),
    })
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
              <Box sx={{ ml: "6.25rem" }}>
                <Typography.Action>{t("user_list.user_type")}</Typography.Action>
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
                    value={types}
                    onChange={(e) => setTypes(e.target.value as string[])}
                    renderValue={(selected: any) =>
                      selected
                        .map((key: string) => {
                          return t(`${USER_LIST.find((element) => element.key === key)?.label}`)
                        })
                        .join(",")
                    }
                  >
                    {USER_LIST.map((userList) => (
                      <MenuItem key={userList.key} value={userList.key}>
                        <Checkbox
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "12px",
                            },
                          }}
                          checked={types.includes(userList.key)}
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<CircleIcon />}
                        />
                        <ListItemText primary={t(userList.label)} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography.Action>{t("user_list.hiragana_match")}</Typography.Action>
              <TextField
                sx={{ width: "100px" }}
                value={fullNameKana}
                onChange={(e) => setFullNameKana(e.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "secondary.dark",
                borderRadius: "0.1875rem",
                mt: "auto",
                ml: "6.25rem",
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
