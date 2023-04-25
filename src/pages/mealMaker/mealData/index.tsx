import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, DownloadIcon, Typography, UploadIcon } from "src/UILibrary"

import { FieldDefinition, MealTable } from "src/components/mealTable"
import { DateType } from "src/pages/user/mealList/components/dateType"
import { MealDetailModal } from "src/pages/user/mealDetail"
import { ConfirmModal } from "./components/confirmModal"
import { UploadModal } from "./components/uploadModal"

import { MOCK_MEAL_DETAIL_DATA } from "src/pages/user/mealDetail/mockMedalDetail"
import { MOCK_MEAL_DATA } from "src/pages/user/mealList/mockmeal"

import { Meal } from "src/types/meal"

const mealData: Meal[] = MOCK_MEAL_DATA

const fields: FieldDefinition<Meal>[] = [
  {
    attribute: "date",
    label: "meal.date",
    width: 136,
  },
  {
    attribute: "breakfast",
    label: "meal.breakfast",
    widget: () => (
      <Box>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[0].menu_name}
        </Typography.Action>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[1].menu_name}
        </Typography.Action>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[2].menu_name}
        </Typography.Action>
      </Box>
    ),
  },
  {
    attribute: "lunch",
    label: "meal.lunch",
    widget: () => (
      <Box>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[0].menu_name}
        </Typography.Action>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[1].menu_name}
        </Typography.Action>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[2].menu_name}
        </Typography.Action>
      </Box>
    ),
  },
  {
    attribute: "dinner_a",
    label: "meal.dinner_a",
    widget: () => (
      <Box>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[0].menu_name}
        </Typography.Action>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[1].menu_name}
        </Typography.Action>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[2].menu_name}
        </Typography.Action>
      </Box>
    ),
  },
  {
    attribute: "dinner_b",
    label: "meal.dinner_b",
    widget: () => (
      <Box>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[0].menu_name}
        </Typography.Action>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[1].menu_name}
        </Typography.Action>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[2].menu_name}
        </Typography.Action>
      </Box>
    ),
  },
  {
    attribute: "dinner_c",
    label: "meal.dinner_c",
    widget: () => (
      <Box>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[0].menu_name}
        </Typography.Action>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[1].menu_name}
        </Typography.Action>
        <Typography.Action
          sx={{
            textAlign: "start",
            fontSize: "18px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {MOCK_MEAL_DETAIL_DATA[2].menu_name}
        </Typography.Action>
      </Box>
    ),
  },
  {
    attribute: "other",
    label: "user_list.other",
  },
]

export const MealData: React.FC = () => {
  const { t } = useTranslation()
  const [mealDate, setMealDate] = useState<string>(new Date().toString())
  const [mealDetailModalOpen, setMealDetailModalOpen] = useState<boolean>(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "1098px",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: "1.25rem",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: "4rem" }}>
            <DateType setMealDate={setMealDate} mealDate={mealDate} />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "secondary.dark",
                borderRadius: "0.5625rem",
                p: "0.375rem 1.625rem",
              }}
            >
              <Typography.DetailHeading sx={{ fontWeight: 500 }}>
                {t("meal.meal_results")}
              </Typography.DetailHeading>
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "error.main",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "0.1875rem",
                p: "0.5625rem 0.875rem",
              }}
              onClick={() => setUploadModalOpen(true)}
            >
              <Typography.Title
                sx={{
                  fontWeight: 500,
                  fontSize: "14px",
                  textAlign: "center",
                  lineHeight: "0.875rem",
                  mr: "1rem",
                }}
              >
                {t("meal.menu_upload")}
              </Typography.Title>
              <UploadIcon sx={{ width: "20px", height: "20px" }} />
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "info.contrastText",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "0.1875rem",
                p: "0.5625rem 0.875rem",
              }}
              onClick={() => setConfirmModalOpen(true)}
            >
              <Typography.Title
                sx={{
                  fontWeight: 500,
                  fontSize: "14px",
                  textAlign: "center",
                  lineHeight: "0.875rem",
                  mr: "1rem",
                }}
              >
                {t("meal.meal_download")}
              </Typography.Title>
              <DownloadIcon sx={{ width: "20px", height: "20px" }} />
            </Button>
          </Box>
        </Box>
        <MealTable fields={fields} content={mealData} onDetail={setMealDetailModalOpen} />
      </Box>
      <ConfirmModal open={confirmModalOpen} handleWarningOpen={setConfirmModalOpen} />
      <UploadModal open={uploadModalOpen} handleUploadOpen={setUploadModalOpen} />
      <MealDetailModal
        open={mealDetailModalOpen}
        handleMealDetailOpen={setMealDetailModalOpen}
        mealDate={mealDate}
      />
    </Box>
  )
}
