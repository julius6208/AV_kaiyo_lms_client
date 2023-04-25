import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, Divider, DownloadIcon, Pagination, Typography } from "src/UILibrary"
import { UserTable, FieldDefinition } from "src/components/userTable"
import { SearchBox } from "./components/searchBox"

import { MOCK_HISTORY_DATA } from "./components/mockHistory"
import { MealHistory } from "src/types/mealHistory"
import { MealDetailModal } from "./components/mealDetail"

const mealHistoryData: MealHistory[] = MOCK_HISTORY_DATA

const fields: FieldDefinition<MealHistory>[] = [
  {
    attribute: "date",
    label: "meal.date",
    width: 150,
  },
  {
    attribute: "user_type",
    label: "meal.division",
    width: 150,
  },
  {
    attribute: "meal_time",
    label: "meal.meal",
    width: 150,
  },
  {
    attribute: "meal_number",
    label: "meal.meal_number",
    width: 150,
  },
]

export const MealExpense: React.FC = () => {
  const { t } = useTranslation()
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
        }}
      >
        <Box
          sx={{
            p: "1.5rem 1.625rem",
            my: "1.125rem",
            borderRadius: "9px 9px 0px 0px",
            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography.Title sx={{ fontWeight: 500, fontSize: "24px", lineHeight: "1.5rem" }}>
            {t("meal.history")}
          </Typography.Title>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "55%",
            }}
          >
            <SearchBox />
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ flex: 3 }}>
              <UserTable
                fields={fields}
                content={mealHistoryData}
                pagination={{ count: 10, currentPage: 1 }}
              />
            </Box>
            <Box sx={{ p: "1.625rem", mt: "1.6875rem", flex: 2, bgcolor: "info.dark" }}>
              <Typography.Heading sx={{ fontWeight: 500, textAlign: "center" }}>
                {t("meal.history_detail")}
              </Typography.Heading>
              <Divider sx={{ borderColor: "text.primary", width: "100%", mt: "1rem" }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: "1rem" }}>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Typography.Heading sx={{ fontWeight: 400 }}>11月分</Typography.Heading>
                    <Typography.Heading sx={{ fontWeight: 400 }}>
                      {t("meal.history")}
                    </Typography.Heading>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "secondary.dark",
                      borderRadius: "0.1875rem",
                      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
                      p: "0.375rem 1.625rem",
                    }}
                  >
                    <Typography.Detail>{t("meal.details")}</Typography.Detail>
                  </Button>
                </Box>
                {new Array(13).fill(0).map((_, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", justifyContent: "space-between", mt: "1rem" }}
                  >
                    <Box sx={{ display: "flex", gap: 3 }}>
                      <Typography.Heading sx={{ fontWeight: 400 }}>11月25日</Typography.Heading>
                      <Typography.Heading sx={{ fontWeight: 400 }}>
                        {t("meal.history")}
                      </Typography.Heading>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "secondary.dark",
                        borderRadius: "0.1875rem",
                        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
                        p: "0.375rem 1.625rem",
                      }}
                      onClick={() => setMealDetailModalOpen(true)}
                    >
                      <Typography.Detail>{t("meal.details")}</Typography.Detail>
                    </Button>
                  </Box>
                ))}
                <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
                  <Pagination count={10} page={1} color="primary" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <MealDetailModal open={mealDetailModalOpen} handleMealDetailOpen={setMealDetailModalOpen} />
    </Box>
  )
}
