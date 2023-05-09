import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, Divider, DownloadIcon, Radio, Typography } from "src/UILibrary"
import { Modal } from "src/components/modal"
import { FieldDefinition, UserTable } from "src/components/userTable"

import { StaffMealDetail } from "src/types/staffMealDetail"
import { MOCK_MEAL_DATA } from "./mockMealDetail"

const staffMealDetail: StaffMealDetail[] = MOCK_MEAL_DATA

interface ApplicationModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleMealDetailOpen: (open: boolean) => void
}

const fields: FieldDefinition<StaffMealDetail>[] = [
  {
    attribute: "id",
    label: "ID",
    width: 120,
  },
  {
    attribute: "name",
    label: "mypage.name",
    width: 125,
  },
  {
    attribute: "breakfast",
    label: "meal.breakfast",
    width: 125,
    widget: () => (
      <Box>
        <Typography.Action
          sx={{
            textAlign: "center",
          }}
        >
          <Radio
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "12px",
              },
            }}
          />
        </Typography.Action>
      </Box>
    ),
  },
  {
    attribute: "lunch",
    label: "meal.lunch",
    width: 125,
    widget: () => (
      <Box>
        <Typography.Action
          sx={{
            textAlign: "center",
          }}
        >
          <Radio
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "12px",
              },
            }}
          />
        </Typography.Action>
      </Box>
    ),
  },
  {
    attribute: "dinner",
    label: "meal.dinner",
    width: 125,
    widget: () => (
      <Box>
        <Typography.Action
          sx={{
            textAlign: "center",
          }}
        >
          <Radio
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: "12px",
              },
            }}
          />
        </Typography.Action>
      </Box>
    ),
  },
]

export const MealDetailModal: React.FC<ApplicationModalProps> = ({
  open,
  handleMealDetailOpen,
}) => {
  const { t } = useTranslation()

  const handleClose = () => {
    handleMealDetailOpen(false)
  }

  return (
    <Modal handleClose={handleClose} open={open} title={`2022/10/10${t("meal.staff_meal_detail")}`}>
      <Divider sx={{ borderColor: "text.primary", width: "100%" }} />
      <Box sx={{ p: "2rem 1.5rem" }}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "info.contrastText",
              borderRadius: "0.1875rem",
              p: "0.5625rem 2rem",
            }}
          >
            <Typography.Title
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                textAlign: "center",
                lineHeight: "0.875rem",
              }}
            >
              {t("user_list.csv_download")}
            </Typography.Title>
            <DownloadIcon sx={{ width: "20px", height: "20px" }} />
          </Button>
        </Box>
        <UserTable fields={fields} content={staffMealDetail} sortBy="" sortOrder="" />
        <Box sx={{ mt: "2rem", display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 2, bgcolor: "text.secondary", py: "0.625rem" }}>
            <Typography.Detail
              sx={{
                color: "background.paper",
                textAlign: "center",
                lineHeight: "1.5rem",
              }}
            >
              {t("meal.total")}
            </Typography.Detail>
          </Box>
          <Box
            sx={{
              flex: 1,
              py: "0.625rem",
              bgcolor: "background.paper",
              borderWidth: "0 2px 0 0",
              borderColor: "info.light",
              borderStyle: "solid",
            }}
          >
            <Typography.Detail
              sx={{
                color: "text.secondary",
                textAlign: "center",
                lineHeight: "1.5rem",
              }}
            >
              47
            </Typography.Detail>
          </Box>
          <Box
            sx={{
              flex: 1,
              py: "0.625rem",
              bgcolor: "background.paper",
              borderWidth: "0 2px 0 0",
              borderColor: "info.light",
              borderStyle: "solid",
            }}
          >
            <Typography.Detail
              sx={{
                color: "text.secondary",
                textAlign: "center",
                lineHeight: "1.5rem",
              }}
            >
              60
            </Typography.Detail>
          </Box>
          <Box
            sx={{
              flex: 1,
              py: "0.625rem",
              bgcolor: "background.paper",
              borderWidth: "0 2px 0 0",
              borderColor: "info.light",
              borderStyle: "solid",
            }}
          >
            <Typography.Detail
              sx={{
                color: "text.secondary",
                textAlign: "center",
                lineHeight: "1.5rem",
              }}
            >
              22
            </Typography.Detail>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            mt: "2.5rem",
            mb: "3.75rem",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              fontWeight: "500",
              lineHeight: "0.875rem",
              color: "secondary.dark",
              p: "0.5625rem 2.375rem",
            }}
          >
            {t("meal.close")}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
