import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { EXTRA_ACTIVITY_LIST } from "src/constants/extraActivityList"
import { HOUSE } from "src/constants/house"

import {
  AdapterDateFns,
  Box,
  Button,
  DatePicker,
  ExpandLessIcon,
  ExpandMoreIcon,
  //Grid,
  LocalizationProvider,
  Popover,
  Radio,
  Select,
  TextField,
  Typography,
} from "src/UILibrary"

export const SearchBox: React.FC = () => {
  const { t } = useTranslation()
  const [anchorE0, setAnchorE0] = React.useState<HTMLButtonElement | null>(null)
  const [anchorE1, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [anchorE2, setAnchorE2] = React.useState<HTMLButtonElement | null>(null)
  const [anchorE3, setAnchorE3] = React.useState<HTMLButtonElement | null>(null)
  const [anchorE4, setAnchorE4] = React.useState<HTMLButtonElement | null>(null)
  const [startDate, setStartDate] = useState<string | null>()
  const [endDate, setEndDate] = useState<string | null>()

  const handleClick0 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE0(event.currentTarget)
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

  const handleClose0 = () => {
    setAnchorE0(null)
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

  const open0 = Boolean(anchorE0)
  const open1 = Boolean(anchorE1)
  const open2 = Boolean(anchorE2)
  const open3 = Boolean(anchorE3)
  const open4 = Boolean(anchorE4)
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
        {open1 ? (
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
                <TextField sx={{ width: "100px" }} />
                <Typography.Description sx={{ mx: 1 }}>~</Typography.Description>
                <TextField sx={{ width: "100px" }} />
              </Box>
            </Box>
            <Box>
              <Typography.Action>{t("user_list.name_match")}</Typography.Action>
              <TextField sx={{ width: "100px" }} />
            </Box>
            <Box>
              <Typography.Action>{t("user_list.hiragana_match")}</Typography.Action>
              <TextField sx={{ width: "100px" }} />
            </Box>
            <Box>
              <Typography.Action>{t("user_list.birth_period")}</Typography.Action>
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
                  <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: "12px",
                        },
                      }}
                    />
                    <Typography.Action>{index + 1}</Typography.Action>
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
                  <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: "12px",
                        },
                      }}
                    />
                    <Typography.Action>{index + 1}</Typography.Action>
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
                  <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: "12px",
                        },
                      }}
                    />
                    <Typography.Action>{t(house)}</Typography.Action>
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
                  <Box key={activityList.key} sx={{ display: "flex", alignItems: "center" }}>
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: "12px",
                        },
                      }}
                    />
                    <Typography.Action>{t(activityList.label)}</Typography.Action>
                  </Box>
                ))}
              </Popover>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" sx={{ gap: "1.25rem" }}>
            <Box>
              <Typography.Action>{t("user_list.curriculum")}</Typography.Action>
              <TextField sx={{ width: "100px" }} />
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
            >
              <Typography.Detail>{t("application.search_condition")}</Typography.Detail>
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}
