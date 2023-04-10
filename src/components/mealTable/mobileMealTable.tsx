import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Typography } from "src/UILibrary"

export interface FieldDefinition<T> {
  attribute: string
  label: string
  width?: number
  widget?: React.FC<{ value?: any; row?: T }>
}

function getProperty(obj: any, field: string): any {
  let value = obj
  let attrs = field.split(".")
  let f = attrs.shift()
  while (value && f) {
    value = value[f]
    f = attrs.shift()
  }
  return value
}

interface AdvancedTableParams<T> {
  content: T[]
  fields: FieldDefinition<T>[]
  idField?: string
  variant?: "pagination" | "next-previous"
  pagination?: {
    count: number
    currentPage: number
  }
  onDetail?: Function
}

export const MealTable = <T extends Record<string, any>>({
  content,
  fields,
  idField = "id",
  onDetail,
}: AdvancedTableParams<T>) => {
  const { t } = useTranslation()
  const handleDetail = () => {
    onDetail && onDetail(true)
  }

  return (
    <Box sx={{ mt: "1.6875rem", display: "flex" }}>
      <Box
        sx={{
          bgcolor: "text.secondary",
          borderRadius: "9px 0px 0px 9px",
          overflow: "scroll",
          flex: "2",
        }}
      >
        {fields.slice(1, 7).map((field) => (
          <Box
            key={field.label}
            sx={{
              // p: "1.875rem 4.15rem",
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
      <Box sx={{ flex: "4" }}>
        {content.slice(0, 1).map((row) => (
          <Box key={row[idField]}>
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
                {f.widget ? (
                  f.widget({ value: getProperty(row, f.attribute), row: row })
                ) : (
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
                      {getProperty(row, f.attribute)}
                    </Typography.Action>
                  </Box>
                )}
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
  )
}
