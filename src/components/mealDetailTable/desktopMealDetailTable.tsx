import React from "react"
import { useTranslation } from "react-i18next"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  onDetail?: Function
}

export const MealDetailTable = <T extends Record<string, any>>({
  content,
  fields,
  idField = "id",
}: AdvancedTableParams<T>) => {
  const { t } = useTranslation()

  return (
    <TableContainer sx={{ mt: "1.6875rem" }}>
      <Table size="small" sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow
            sx={{
              "&>th": {
                fontWeight: 500,
                fontSize: "14px",
                color: "text.secondary",
                lineHeight: "0.875rem",
                p: "0.625rem 1.25rem",
              },
              overflow: "scroll",
            }}
          >
            {fields.map((field) => (
              <TableCell key={field.label} sx={{ width: field.width, position: "relative" }}>
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
                cursor: "pointer",
                "&>td": {
                  p: "0.625rem 1.25rem",
                  color: "text.secondary",
                  "&:not(:last-of-type)": {
                    borderWidth: "2px 2px 0 0",
                    borderStyle: "solid",
                    borderColor: "background.paper",
                    borderCollapse: "collapse",
                  },
                },
              }}
            >
              {fields.map((f) => (
                <TableCell
                  key={`cell-${f.attribute}`}
                  sx={{
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
    </TableContainer>
  )
}
