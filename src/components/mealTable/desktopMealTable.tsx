import React from "react"
import { useTranslation } from "react-i18next"

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from "src/UILibrary"
import { useSession } from "src/modules/sessionProvider"

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
  variant = "pagination",
  pagination,
  onDetail,
}: AdvancedTableParams<T>) => {
  const { t } = useTranslation()
  const session = useSession()
  const handleDetail = () => {
    onDetail && onDetail(true)
  }

  return (
    <TableContainer sx={{ mt: "1.6875rem" }}>
      <Table size="small" sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow
            sx={{
              "&>th": {
                textAlign: "center",
                color: "background.paper",
                fontWeight: 500,
                fontSize: "24px",
                lineHeight: "1.5rem",
                p: "10px 2px",
                borderWidth: "0 2px 0 0",
                borderStyle: "solid",
                bgcolor: "text.secondary",
                "&:first-of-type": {
                  borderRadius: "9px 0 0 0",
                },
                "&:last-of-type": {
                  borderRadius: "0 9px 0 0",
                },
              },
              overflow: "scroll",
            }}
          >
            {fields.map((field) => (
              <TableCell key={field.label} sx={{ width: field.width }}>
                {t(field.label)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((row) => (
            <TableRow
              key={row[idField]}
              sx={{
                "&>td": {
                  textAlign: "center",
                  p: "0.625rem 1.25rem",
                  color: "text.secondary",
                  borderWidth: "2px 2px 0 0",
                  borderStyle: "solid",
                  borderColor: "info.light",
                  borderCollapse: "collapse",
                },
              }}
            >
              {fields.map((f, index) => (
                <TableCell
                  key={`cell-${f.attribute}`}
                  sx={{
                    bgcolor: "background.paper",
                    width: f.width,
                  }}
                >
                  <Box
                    sx={{
                      height: "85px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    {f.widget ? (
                      f.widget({ value: getProperty(row, f.attribute), row: row })
                    ) : (
                      <Typography.Action
                        sx={{
                          fontSize: "18px",
                          fontWeight: 400,
                          whiteSpace: "nowrap",
                          lineHeight: "24px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {getProperty(row, f.attribute)}
                      </Typography.Action>
                    )}
                    {session?.value.id === "teacher" && index !== 0 && index !== 1 && (
                      <Typography.Detail
                        onClick={handleDetail}
                        sx={{
                          width: "100%",
                          cursor: "pointer",
                          fontSize: "10px",
                          color: "secondary.dark",
                          lineHeight: "0.625rem",
                        }}
                      >
                        {t("meal.check_detail")}
                      </Typography.Detail>
                    )}
                    {session?.value.id !== "teacher" && index !== 0 && (
                      <Typography.Detail
                        onClick={handleDetail}
                        sx={{
                          width: "100%",
                          cursor: "pointer",
                          fontSize: "10px",
                          color: "secondary.dark",
                          lineHeight: "0.625rem",
                        }}
                      >
                        {t("meal.check_detail")}
                      </Typography.Detail>
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {variant === "pagination" && pagination && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "0.375rem" }}>
          <Pagination count={pagination.count} page={pagination.currentPage} color="primary" />
        </Box>
      )}
    </TableContainer>
  )
}
