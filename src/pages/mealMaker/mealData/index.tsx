import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, DownloadIcon, Typography, UploadIcon } from "src/UILibrary"

import { FieldDefinition, MealTable } from "src/components/mealTable"
import { DateType } from "src/pages/user/mealList/components/dateType"
import { MealDetailModal } from "src/pages/user/mealDetail"
import { ConfirmModal } from "./components/confirmModal"
import { UploadModal } from "./components/uploadModal"

import { MealList, SelectMeal } from "src/types/meal"
import { useGetUserMealList } from "src/queries/meal"
import { useSession } from "src/modules/sessionProvider"
import { formatDate } from "src/modules/date"

export const MealData: React.FC = () => {
  const { t } = useTranslation()
  const session = useSession()

  const [mealDate, setMealDate] = useState<string>(new Date().toString())
  const [mealDetailModalOpen, setMealDetailModalOpen] = useState<boolean>(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false)
  const [selectMeal, setSelectMeal] = useState<SelectMeal[]>([])
  const [mealId, setMealId] = useState<number>(0)
  const mealMonth = formatDate(mealDate, "yyyy-MM")

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
        <MealTable
          fields={fields}
          content={mealList?.data.meals || []}
          isLoading={isLoading}
          error={error?.message}
          handleMealDetailOpen={setMealDetailModalOpen}
          selectMeal={selectMeal}
          setSelectMeal={setSelectMeal}
          setMealId={setMealId}
        />
      </Box>
      <ConfirmModal open={confirmModalOpen} handleWarningOpen={setConfirmModalOpen} />
      <UploadModal open={uploadModalOpen} handleUploadOpen={setUploadModalOpen} />
      <MealDetailModal
        mealId={mealId}
        open={mealDetailModalOpen}
        handleMealDetailOpen={setMealDetailModalOpen}
        mealDate={mealDate}
      />
    </Box>
  )
}
