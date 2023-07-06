import React, { useState } from "react"

import { Box } from "src/UILibrary"

import { FieldDefinition, MealTable } from "src/components/mealTable"
import { DateType } from "src/pages/user/mealList/components/dateType"
import { MealDetailModal } from "src/pages/user/mealDetail"

import { formatDate } from "src/modules/date"
import { MealList, SelectMeal } from "src/types/meal"
import { useGetUserMealList } from "src/queries/meal"
import { useSession } from "src/modules/sessionProvider"

export const UserMealList: React.FC = () => {
  const session = useSession()

  const [mealDate, setMealDate] = useState<string>(new Date().toString())
  const [mealDetailModalOpen, setMealDetailModalOpen] = useState<boolean>(false)
  const mealMonth = formatDate(mealDate, "yyyy-MM")
  const [mealId, setMealId] = useState<number>(0)
  const [selectMeal, setSelectMeal] = useState<SelectMeal[]>([])

  const {
    data: mealList,
    isLoading,
    error,
  } = useGetUserMealList(session?.value.tokenInfo.id_token || "", mealMonth)

  const fields: FieldDefinition<MealList>[] = [
    {
      attribute: "date",
      label: "meal.date",
      width: 136,
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
          </Box>
        </Box>
        <MealTable
          fields={fields}
          content={mealList?.data.meals || []}
          isLoading={isLoading}
          error={error?.message}
          handleMealDetailOpen={setMealDetailModalOpen}
          selectMeal={selectMeal}
          setSelectMeal={setSelectMeal}
          setMealId={setMealId}
          mealDate={mealDate}
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
