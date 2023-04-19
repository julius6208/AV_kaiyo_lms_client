import React, { useState } from "react"

import { Box, Typography } from "src/UILibrary"

//import { PAGE_SIZE } from "src/constants/common"
import { FieldDefinition, MealTable } from "src/components/mealTable"
import { DateType } from "./components/dateType"
import { MealDetailModal } from "../mealDetail"

import { MOCK_MEAL_DATA } from "./mockmeal"
import { Meal } from "src/types/meal"
import { MOCK_MEAL_DETAIL_DATA } from "../mealDetail/mockMedalDetail"

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

export const MealList: React.FC = () => {
  const [mealDate, setMealDate] = useState<string>(new Date().toString())
  const [mealDetailModalOpen, setMealDetailModalOpen] = useState<boolean>(false)
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
        <DateType setMealDate={setMealDate} mealDate={mealDate} />
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
