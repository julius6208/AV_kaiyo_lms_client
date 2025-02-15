import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import {
  Box,
  CircularProgress,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from "src/UILibrary"
import { formatDate } from "src/modules/date"

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
    f === "birthday"
      ? (value = formatDate(value[f].toString(), "yyyy-MM-dd").split("."))
      : (value = value[f])
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
  checkable?: boolean
  // eslint-disable-next-line no-unused-vars
  onPageNumChange?: (value: number) => void
  isLoading?: boolean
  error?: string
}

export const UploadTable = <T extends Record<string, any>>({
  content,
  fields,
  idField = "id",
  variant = "pagination",
  pagination,
  checkable,
  onPageNumChange,
  isLoading = false,
  error,
}: AdvancedTableParams<T>) => {
  const { t } = useTranslation()

  const [checked, setChecked] = useState<boolean>(false)
  const [checkedId, setCheckedId] = useState<any>()

  const handleChecked = (checked: boolean, key: any) => {
    setChecked(checked)
    setCheckedId(key)
  }
  return (
    <TableContainer sx={{ mt: "1.6875rem", display: "flex", flexDirection: "column" }}>
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
                cursor: "pointer",
                borderWidth: "0 2px 0 0",
                borderStyle: "solid",
                bgcolor: "text.secondary",
              },
              overflow: "scroll",
            }}
          >
            {checkable && <TableCell sx={{ width: 22 }}></TableCell>}
            {fields.map((field) => (
              <TableCell key={field.label} sx={{ width: field.width, position: "relative" }}>
                {t(field.label)}
              </TableCell>
            ))}
            <TableCell sx={{ opacity: 0 }}></TableCell>
          </TableRow>
        </TableHead>
        {!error && !isLoading && (
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
                      px: 0,
                    },
                    bgcolor:
                      row[idField] === checkedId && checked === true
                        ? "secondary.main"
                        : "background.paper",
                    borderWidth: "0 2px 2px 0",
                    borderStyle: "solid",
                    borderColor: "info.light",
                    borderRightWidth: "2px",
                    borderLeftWidth: "2px",
                  },
                }}
              >
                {checkable && (
                  <TableCell>
                    <Checkbox
                      sx={{
                        p: 0,
                      }}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChecked(event.target.checked, row[idField])
                      }
                    />
                  </TableCell>
                )}
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
                {/* <TableCell sx={{ width: "125px" }}>
                  <Typography.Detail sx={{ fontSize: "12px" }}>
                    読み取りができませんでした
                  </Typography.Detail>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
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
      {variant === "pagination" && pagination && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "0.375rem" }}>
          <Pagination
            color="primary"
            count={pagination.count}
            page={pagination.currentPage}
            onChange={(_, value) => !!onPageNumChange && onPageNumChange(value)}
          />
        </Box>
      )}
    </TableContainer>
  )
}
