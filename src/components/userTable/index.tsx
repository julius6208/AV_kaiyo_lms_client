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
import { SortIcon } from "../applicationTable/components/sortIcon"

export interface FieldDefinition<T> {
  attribute: string
  label: string
  width?: number
  sort?: boolean
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
}

export const UserTable = <T extends Record<string, any>>({
  content,
  fields,
  idField = "id",
  variant = "pagination",
  pagination,
}: AdvancedTableParams<T>) => {
  const { t } = useTranslation()

  return (
    <TableContainer sx={{ mt: "1.6875rem" }}>
      <Table size="small" sx={{ tableLayout: "fixed", width: "auto" }}>
        <TableHead>
          <TableRow
            sx={{
              "&>th": {
                textAlign: "center",
                color: "background.paper",
                fontWeight: 500,
                fontSize: "0.875rem",
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
                  px: "10px",
                },
              },
              overflow: "scroll",
            }}
          >
            {fields.map((field) => (
              <TableCell key={field.label} sx={{ width: field.width, position: "relative" }}>
                {t(field.label)}
                {field.sort === true && <SortIcon />}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((row) => (
            <TableRow
              key={row[idField]}
              sx={{
                cursor: "pointer",
                "&>td": {
                  textAlign: "center",
                  p: "0.625rem 0.5rem",
                  color: "text.secondary",
                  "&:first-of-type": {
                    color: "secondary.dark",
                  },
                  borderWidth: "0 2px 2px 0",
                  borderStyle: "solid",
                  borderColor: "info.light",
                  borderRightWidth: "2px",
                  borderLeftWidth: "2px",
                },
              }}
            >
              {fields.map((f) => (
                <TableCell
                  key={`cell-${f.attribute}`}
                  sx={{
                    bgcolor: "background.paper",
                    width: f.width,
                  }}
                >
                  {f.widget ? (
                    f.widget({ value: getProperty(row, f.attribute), row: row })
                  ) : (
                    <Typography.Action
                      sx={{
                        fontWeight: 400,
                        lineHeight: "24px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "hidden",
                      }}
                    >
                      {getProperty(row, f.attribute)}
                    </Typography.Action>
                  )}
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
