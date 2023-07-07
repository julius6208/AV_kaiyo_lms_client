import React from "react"
import { useTranslation } from "react-i18next"

import {
  Box,
  CircularProgress,
  Table,
  // TableBody,
  // TableCell,
  // TableHead,
  // TableRow,
  Typography,
} from "src/UILibrary"

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
  isLoading?: boolean
  error?: string
}

export const MealDetailTable = <T extends Record<string, any>>({
  content,
  fields,
  idField = "id",
  isLoading = false,
  error,
}: AdvancedTableParams<T>) => {
  const { t } = useTranslation()

  return (
    <Table
      size="small"
      sx={{ tableLayout: "fixed", bgcolor: "info.dark", color: "text.secondary" }}
    >
      {content.map((row) => (
        <Box key={row[idField]}>
          {fields.slice(0, 1).map((f) => (
            <Box
              key={`cell-${f.attribute}`}
              sx={{
                borderWidth: "2px 0 2px 0",
                borderStyle: "solid",
                borderColor: "background.paper",
                borderCollapse: "collapse",
                p: "0.75rem",
              }}
            >
              <Typography.Action
                sx={{
                  fontSize: "16px",
                  lineHeight: "1.125rem",
                  overflow: "hidden",
                  textOverflow: "hidden",
                }}
              >
                {t(f.label)}
              </Typography.Action>
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
            }}
          >
            {fields.slice(1, 5).map((f) => (
              <Box
                key={`cell-${f.attribute}`}
                sx={{
                  py: "0.5rem",
                  flex: "1",
                  textAlign: "center",
                  borderWidth: "2px 2px 0 0",
                  borderStyle: "solid",
                  borderColor: "background.paper",
                  borderCollapse: "collapse",
                }}
              >
                <Typography.Detail
                  sx={{
                    fontWeight: 400,
                    overflow: "hidden",
                    textOverflow: "hidden",
                  }}
                >
                  {t(f.label)}
                </Typography.Detail>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex" }}>
            {fields.slice(1, 5).map((f) => (
              <Box
                key={`cell-${f.attribute}`}
                sx={{
                  flex: "1",
                  py: "0.5rem",
                  textAlign: "center",
                  borderWidth: "2px 2px 0 0",
                  borderStyle: "solid",
                  borderColor: "background.paper",
                  borderCollapse: "collapse",
                }}
              >
                <Typography.Detail
                  sx={{
                    lineHeight: "1.25rem",
                    fontWeight: 400,
                    overflow: "hidden",
                    textOverflow: "hidden",
                  }}
                >
                  {getProperty(row, f.attribute)}
                </Typography.Detail>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
      {!!error && (
        <Typography.Description color="error" sx={{ textAlign: "center", py: 3 }}>
          {error}
        </Typography.Description>
      )}
      {!error && content.length === 0 && !isLoading && (
        <Typography.Description color="error" sx={{ textAlign: "center", py: 3 }}>
          {t("user_list.no_data")}
        </Typography.Description>
      )}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress color="primary" />
        </Box>
      )}
    </Table>
  )
}
