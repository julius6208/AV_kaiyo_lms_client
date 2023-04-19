import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, Checkbox, Typography } from "src/UILibrary"

import { FieldDefinition, MealTable } from "src/components/mealTable"
import { DateType } from "src/pages/user/mealList/components/dateType"
import { MealDetailModal } from "src/pages/user/mealDetail"

import { Meal } from "src/types/meal"
import { MOCK_MEAL_DATA } from "src/pages/user/mealList/mockmeal"
import { MOCK_MEAL_DETAIL_DATA } from "src/pages/user/mealDetail/mockMedalDetail"

export const MealManagement: React.FC = () => {
  const { t } = useTranslation()
  const mealData: Meal[] = MOCK_MEAL_DATA
  const [mealDate, setMealDate] = useState<string>(new Date().toString())
  const [mealDetailModalOpen, setMealDetailModalOpen] = useState<boolean>(false)

  const fields: FieldDefinition<Meal>[] = [
    {
      attribute: "date",
      label: "meal.date",
      width: 136,
    },
    {
      attribute: "meal",
      label: "menu.meal",
      width: 90,
      widget: () => (
        <Box>
          <Box sx={{ display: "flex" }}>
            <Typography.Action
              sx={{
                textAlign: "start",
                fontSize: "18px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {t("meal.morning")}
            </Typography.Action>
            <Checkbox sx={{ p: 0, mx: "auto", "& .MuiSvgIcon-root": { fontSize: "1.25rem" } }} />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography.Action
              sx={{
                textAlign: "start",
                fontSize: "18px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {t("meal.noon")}
            </Typography.Action>
            <Checkbox sx={{ p: 0, m: "auto", "& .MuiSvgIcon-root": { fontSize: "1.25rem" } }} />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography.Action
              sx={{
                textAlign: "start",
                fontSize: "18px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {t("meal.evening")}
            </Typography.Action>
            <Checkbox sx={{ p: 0, m: "auto", "& .MuiSvgIcon-root": { fontSize: "1.25rem" } }} />
          </Box>
        </Box>
      ),
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
            mt: "1.125rem",
          }}
        >
          <Box sx={{ flex: 10 }}>
            <DateType setMealDate={setMealDate} mealDate={mealDate} />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "secondary.dark",
                borderRadius: "0.1875rem",
                mt: "1rem",
                p: "0.5rem 2rem",
              }}
            >
              <Typography.Detail>{t("meal.reflect")}</Typography.Detail>
            </Button>
          </Box>
          <Box sx={{ display: "flex", flex: 4, gap: 3, color: "text.secondary" }}>
            <Box>
              <Box sx={{ display: "flex", gap: 2, mb: "1rem" }}>
                <Typography.Detail>{t("meal.breakfast")}</Typography.Detail>
                <Typography.Detail>{"480円"}</Typography.Detail>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography.Detail>{t("meal.lunch")}</Typography.Detail>
                <Typography.Detail>{"550円"}</Typography.Detail>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: "1rem" }}>
                <Typography.Detail>{t("meal.dinner")}</Typography.Detail>
                <Typography.Detail>{"550円"}</Typography.Detail>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography.Detail>{t("user_list.other")}</Typography.Detail>
                <Typography.Detail>{"20円"}</Typography.Detail>
              </Box>
            </Box>
            <Box sx={{ position: "absolute", mt: "1.5rem", ml: "14rem" }}>
              <Typography.Detail>{t("meal.total_amount")}</Typography.Detail>
              <Typography.Detail sx={{ textAlign: "right" }}>1600{t("meal.yen")}</Typography.Detail>
            </Box>
          </Box>
        </Box>
        <MealTable fields={fields} content={mealData} onDetail={setMealDetailModalOpen} />
      </Box>
      <MealDetailModal
        open={mealDetailModalOpen}
        handleMealDetailOpen={setMealDetailModalOpen}
        mealDate={mealDate}
      />
    </Box>
  )
}
