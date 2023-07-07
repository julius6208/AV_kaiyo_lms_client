import React from "react"
import { useTranslation } from "react-i18next"

import { Box, CircularProgress, Typography } from "src/UILibrary"
import { Meals, Menu } from "src/types/meal"
import { formatDate } from "src/modules/date"

export interface FieldDefinition<T> {
  attribute: string
  label: string
  width?: number
  widget?: React.FC<{ value?: any; row?: T }>
}

// function getProperty(obj: any, field: string): any {
//   let value = obj
//   let attrs = field.split(".")
//   let f = attrs.shift()
//   while (value && f) {
//     value = value[f]
//     f = attrs.shift()
//   }
//   return value
// }

interface AdvancedTableParams<T> {
  content: T[]
  fields: FieldDefinition<T>[]
  idField?: string
  isLoading?: boolean
  error?: string
  setMealId?: Function
  onDetail?: Function
  mealDate?: string
}

export const MealTable = <T extends Record<string, any>>({
  content,
  fields,
  //idField = "id",
  isLoading = false,
  error,
  setMealId,
  onDetail,
  mealDate,
}: AdvancedTableParams<T>) => {
  const { t } = useTranslation()
  const handleDetail = () => {
    onDetail && onDetail(true)
    setMealId && setMealId(1)
  }

  return (
    <Box sx={{ mt: "1.6875rem", display: "flex" }}>
      <Box
        sx={{
          bgcolor: "text.secondary",
          borderRadius: "9px 0px 0px 9px",
          overflow: "scroll",
          flex: "1",
        }}
      >
        {fields.slice(1, 7).map((field) => (
          <Box
            key={field.label}
            sx={{
              py: "1.875rem",
              textAlign: "center",
              color: "background.paper",
              borderWidth: "0 0 2px 0",
              fontSize: "18px",
              borderStyle: "solid",
              lineHeight: "1.125rem",
            }}
          >
            {t(field.label)}
          </Box>
        ))}
      </Box>
      {!error && content.length !== 0 && !isLoading && (
        <Box sx={{ display: "flex", flex: 3 }}>
          <Box sx={{ flex: "4" }}>
            {fields.slice(1, 7).map((f) => (
              <Box
                key={`cell-${f.attribute}`}
                sx={{
                  p: "0.5rem 1.25rem",
                  height: "80px",
                  color: "text.secondary",
                  borderWidth: "2px 2px 0 0",
                  borderStyle: "solid",
                  borderColor: "info.light",
                  borderCollapse: "collapse",
                  bgcolor: "background.paper",
                }}
              >
                {!!mealDate &&
                  content
                    .find(
                      (meal) =>
                        formatDate(meal.date.toString(), "yyyy-MM-dd") ===
                        formatDate(mealDate?.toString(), "yyyy-MM-dd")
                    )
                    ?.meals.find((item: Meals) => item.type === f.attribute)
                    ?.menus.map((menu: Menu) => (
                      <Box key={menu.id}>
                        <Typography.Action
                          sx={{
                            textAlign: "start",
                            fontSize: "18px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {menu.title}
                        </Typography.Action>
                      </Box>
                    ))}
              </Box>
            ))}
          </Box>
          <Box sx={{ flex: "1" }}>
            {fields.slice(1, 7).map((f) => (
              <Box
                key={`cell-${f.attribute}`}
                sx={{
                  p: "1.375rem 2.5rem",
                  height: "80px",
                  width: "116px",
                  color: "text.secondary",
                  borderWidth: "2px 2px 0 0",
                  borderStyle: "solid",
                  borderColor: "info.light",
                  bgcolor: "background.paper",
                }}
              >
                <Typography.Detail
                  onClick={handleDetail}
                  sx={{
                    fontSize: "14px",
                    cursor: "pointer",
                    color: "secondary.dark",
                    lineHeight: "1rem",
                  }}
                >
                  {t("meal.detail")}
                </Typography.Detail>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      {!!error && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 3 }}>
          <Typography.Description color="error">{error}</Typography.Description>
        </Box>
      )}
      {!error && content.length === 0 && !isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 3 }}>
          <Typography.Description color="error">{t("user_list.no_data")}</Typography.Description>
        </Box>
      )}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 3 }}>
          <CircularProgress color="primary" />
        </Box>
      )}
    </Box>
  )
}
