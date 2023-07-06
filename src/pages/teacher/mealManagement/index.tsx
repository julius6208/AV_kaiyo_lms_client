import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { AxiosError } from "axios"
import { useQueryClient } from "@tanstack/react-query"

import { Box, Button, Typography } from "src/UILibrary"

import { FieldDefinition, MealTable } from "src/components/mealTable"
import { DateType } from "src/pages/user/mealList/components/dateType"
import { MealDetailModal } from "src/pages/user/mealDetail"

import { MealList, SelectMeal } from "src/types/meal"
import { formatDate } from "src/modules/date"
import { useGetTeacherMealList, useUpdateSelectMeal } from "src/queries/meal"
import { useSession } from "src/modules/sessionProvider"
import { usePushAlerts } from "src/hooks/alerts"

export const MealManagement: React.FC = () => {
  const { t } = useTranslation()
  const session = useSession()
  const queryClient = useQueryClient()
  const pushAlerts = usePushAlerts()

  const [mealDate, setMealDate] = useState<string>(new Date().toString())
  const [mealDetailModalOpen, setMealDetailModalOpen] = useState<boolean>(false)
  const mealMonth = formatDate(mealDate, "yyyy-MM")
  const [mealId, setMealId] = useState<number>(0)
  const [selectMeal, setSelectMeal] = useState<SelectMeal[]>([])

  const {
    data: mealList,
    isLoading,
    error,
  } = useGetTeacherMealList(
    session?.value.tokenInfo.id_token || "",
    mealMonth,
    session?.value.user.id || 0
  )

  const { mutate: updateSelectMeal, isLoading: updateLoading } = useUpdateSelectMeal({
    onSuccess: () => {
      queryClient.invalidateQueries(["getApplicationList"])
    },
    onError: (err: AxiosError) => {
      pushAlerts({ message: err.message, color: "error" })
    },
  })

  const fields: FieldDefinition<MealList>[] = [
    {
      attribute: "date",
      label: "meal.date",
      width: 136,
      color: "background.paper",
    },
    {
      attribute: "meal",
      label: "menu.meal",
      width: 90,
      color: "background.paper",
    },
    {
      attribute: "breakfast",
      label: "meal.breakfast",
    },
    {
      attribute: "lunch",
      label: "meal.lunch",
    },
    {
      attribute: "dinner_a",
      label: "meal.dinner_a",
    },
    {
      attribute: "dinner_b",
      label: "meal.dinner_b",
    },
    {
      attribute: "dinner_c",
      label: "meal.dinner_c",
    },
    {
      attribute: "other",
      label: "user_list.other",
      color: "background.paper",
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
              onClick={() =>
                updateSelectMeal({
                  token: session?.value.tokenInfo.id_token || "",
                  id: session?.value.user.id || 0,
                  data: selectMeal,
                })
              }
            >
              <Typography.Detail>{t("meal.reflect")}</Typography.Detail>
            </Button>
          </Box>
          <Box sx={{ display: "flex", flex: 4, gap: 3, color: "text.secondary" }}>
            <Box>
              <Box sx={{ display: "flex", gap: 2, mb: "1rem" }}>
                <Typography.Detail>{t("meal.breakfast")}</Typography.Detail>
                <Typography.Detail>
                  {mealList?.data.totalBreakfast}
                  {t("meal.yen")}
                </Typography.Detail>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography.Detail>{t("meal.lunch")}</Typography.Detail>
                <Typography.Detail>
                  {mealList?.data.totalLunch}
                  {t("meal.yen")}
                </Typography.Detail>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: "1rem" }}>
                <Typography.Detail>{t("meal.dinner")}</Typography.Detail>
                <Typography.Detail>
                  {mealList?.data.totalDinner}
                  {t("meal.yen")}
                </Typography.Detail>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography.Detail>{t("meal.total_amount")}</Typography.Detail>
                <Typography.Detail>
                  {mealList?.data.totalCost}
                  {t("meal.yen")}
                </Typography.Detail>
              </Box>
            </Box>
          </Box>
        </Box>
        <MealTable
          fields={fields}
          content={mealList?.data.meals || []}
          isLoading={isLoading || updateLoading}
          error={error?.message}
          handleMealDetailOpen={setMealDetailModalOpen}
          selectMeal={selectMeal}
          setSelectMeal={setSelectMeal}
          setMealId={setMealId}
        />
      </Box>
      <MealDetailModal
        mealId={mealId}
        open={mealDetailModalOpen}
        handleMealDetailOpen={setMealDetailModalOpen}
        mealDate={mealDate}
      />
    </Box>
  )
}
