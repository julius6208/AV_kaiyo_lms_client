import React, { useEffect, useMemo } from "react"
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
  CircularProgress,
  Checkbox,
} from "src/UILibrary"

import { formatDate, getDay } from "src/modules/date"
import { Meals, Menu } from "src/types/meal"
import { useSession } from "src/modules/sessionProvider"
import { SelectMeal } from "src/types/meal"

export interface FieldDefinition<T> {
  attribute: string
  label: string
  width?: number
  color?: string
  widget?: React.FC<{ value?: any; row?: T }>
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
  isLoading?: boolean
  error?: string
  selectMeal: SelectMeal[]
  setSelectMeal: Function
  setMealId?: Function
  onDetail?: Function
}

export const MealTable = <T extends Record<string, any>>({
  content,
  fields,
  idField = "id",
  variant = "pagination",
  pagination,
  isLoading = false,
  error,
  selectMeal,
  setSelectMeal,
  setMealId,
  onDetail,
}: AdvancedTableParams<T>) => {
  const { t } = useTranslation()
  const session = useSession()

  const handleChange = (mealId: number, status: boolean) => {
    const existingItem = selectMeal.find((item) => item.mealId === mealId)

    if (existingItem) {
      const updatedSelectMeal = selectMeal.map((item) =>
        item.mealId === mealId ? { ...item, status } : item
      )
      setSelectMeal(updatedSelectMeal)
    } else {
      setSelectMeal([...selectMeal, { mealId, status }])
    }
  }

  const handleDetail = (mealId: number) => {
    onDetail && onDetail(true)
    setMealId && setMealId(mealId)
  }

  const initialMeal: SelectMeal[] = useMemo(() => {
    return content.flatMap((item) =>
      item.meals.map((meal: Meals) => ({
        mealId: meal.id,
        status: meal.selected,
      }))
    )
  }, [content])

  useEffect(() => {
    setSelectMeal(initialMeal)
  }, [initialMeal, setSelectMeal])

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
              <TableCell>
                <Box
                  sx={{
                    height: "85px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
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
                    {formatDate(row.date, "MM/dd") +
                      " (" +
                      t(`day.${getDay(row.date.toString())}`) +
                      ")"}
                  </Typography.Action>
                </Box>
              </TableCell>
              {session?.value.user.role === "teacher" && (
                <TableCell>
                  <Box
                    sx={{
                      height: "85px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Typography.Action
                        sx={{
                          textAlign: "start",
                          fontSize: "18px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {t("meal.morning")}
                      </Typography.Action>
                      <Checkbox
                        checked={
                          selectMeal.find(
                            (element: SelectMeal) =>
                              element.mealId ===
                              row.meals.find((item: Meals) => item.type === "Breakfast")?.id
                          )?.status || false
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(
                            row.meals.find((item: Meals) => item.type === "Breakfast").id,
                            e.target.checked
                          )
                        }
                        sx={{ p: 0, mx: "auto", "& .MuiSvgIcon-root": { fontSize: "1.25rem" } }}
                      />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography.Action
                        sx={{
                          textAlign: "start",
                          fontSize: "18px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {t("meal.noon")}
                      </Typography.Action>
                      <Checkbox
                        checked={
                          selectMeal.find(
                            (element: SelectMeal) =>
                              element.mealId ===
                              row.meals.find((item: Meals) => item.type === "Lunch")?.id
                          )?.status || false
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(
                            row.meals.find((item: Meals) => item.type === "Lunch").id,
                            e.target.checked
                          )
                        }
                        sx={{ p: 0, m: "auto", "& .MuiSvgIcon-root": { fontSize: "1.25rem" } }}
                      />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography.Action
                        sx={{
                          textAlign: "start",
                          fontSize: "18px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {t("meal.evening")}
                      </Typography.Action>
                      <Checkbox
                        checked={
                          selectMeal.find(
                            (element: SelectMeal) =>
                              element.mealId ===
                              row.meals.find(
                                (item: Meals) =>
                                  item.type === "DinnerA" ||
                                  item.type === "DinnerB" ||
                                  item.type === "DinnerC"
                              )?.id
                          )?.status || false
                        }
                        sx={{ p: 0, m: "auto", "& .MuiSvgIcon-root": { fontSize: "1.25rem" } }}
                      />
                    </Box>
                  </Box>
                </TableCell>
              )}
              <TableCell
                sx={{
                  bgcolor: selectMeal.find(
                    (element: SelectMeal) =>
                      element.mealId ===
                      row.meals.find((item: Meals) => item.type === "Breakfast")?.id
                  )?.status
                    ? "secondary.main"
                    : "background.paper",
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
                  {row.meals.map(
                    (meal: Meals) =>
                      meal.type === "Breakfast" && (
                        <>
                          {meal.menus.map((menu: Menu, index: number) => (
                            <Box key={index}>
                              <Typography.Action
                                sx={{
                                  fontSize: "18px",
                                  fontWeight: 400,
                                  textAlign: "start",
                                  whiteSpace: "nowrap",
                                  lineHeight: "24px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {menu.title}
                              </Typography.Action>
                            </Box>
                          ))}
                          <Typography.Detail
                            onClick={() => handleDetail(meal.id)}
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
                        </>
                      )
                  )}
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: selectMeal.find(
                    (element: SelectMeal) =>
                      element.mealId === row.meals.find((item: Meals) => item.type === "Lunch")?.id
                  )?.status
                    ? "secondary.main"
                    : "background.paper",
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
                  {row.meals.map(
                    (meal: Meals) =>
                      meal.type === "Lunch" && (
                        <>
                          {meal.menus.map((menu: Menu, index: number) => (
                            <Box key={index}>
                              <Typography.Action
                                sx={{
                                  fontSize: "18px",
                                  fontWeight: 400,
                                  textAlign: "start",
                                  whiteSpace: "nowrap",
                                  lineHeight: "24px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {menu.title}
                              </Typography.Action>
                            </Box>
                          ))}
                          <Typography.Detail
                            onClick={() => handleDetail(meal.id)}
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
                        </>
                      )
                  )}
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: selectMeal.find(
                    (element: SelectMeal) =>
                      element.mealId ===
                      row.meals.find((item: Meals) => item.type === "DinnerA")?.id
                  )?.status
                    ? "secondary.main"
                    : "background.paper",
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
                  {row.meals.map(
                    (meal: Meals) =>
                      meal.type === "DinnerA" && (
                        <>
                          {meal.menus.map((menu: Menu, index: number) => (
                            <Box key={index}>
                              <Typography.Action
                                sx={{
                                  fontSize: "18px",
                                  fontWeight: 400,
                                  textAlign: "start",
                                  whiteSpace: "nowrap",
                                  lineHeight: "24px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {menu.title}
                              </Typography.Action>
                            </Box>
                          ))}
                          <Typography.Detail
                            onClick={() => handleDetail(meal.id)}
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
                        </>
                      )
                  )}
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: selectMeal.find(
                    (element: SelectMeal) =>
                      element.mealId ===
                      row.meals.find((item: Meals) => item.type === "DinnerB")?.id
                  )?.status
                    ? "secondary.main"
                    : "background.paper",
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
                  {row.meals.map(
                    (meal: Meals) =>
                      meal.type === "DinnerB" && (
                        <>
                          {meal.menus.map((menu: Menu, index: number) => (
                            <Box key={index}>
                              <Typography.Action
                                sx={{
                                  fontSize: "18px",
                                  fontWeight: 400,
                                  textAlign: "start",
                                  whiteSpace: "nowrap",
                                  lineHeight: "24px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {menu.title}
                              </Typography.Action>
                            </Box>
                          ))}
                          <Typography.Detail
                            onClick={() => handleDetail(meal.id)}
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
                        </>
                      )
                  )}
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: selectMeal.find(
                    (element: SelectMeal) =>
                      element.mealId ===
                      row.meals.find((item: Meals) => item.type === "DinnerC")?.id
                  )?.status
                    ? "secondary.main"
                    : "background.paper",
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
                  {row.meals.map(
                    (meal: Meals) =>
                      meal.type === "DinnerC" && (
                        <>
                          {meal.menus.map((menu: Menu, index: number) => (
                            <Box key={index}>
                              <Typography.Action
                                sx={{
                                  fontSize: "18px",
                                  fontWeight: 400,
                                  textAlign: "start",
                                  whiteSpace: "nowrap",
                                  lineHeight: "24px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {menu.title}
                              </Typography.Action>
                            </Box>
                          ))}
                          <Typography.Detail
                            onClick={() => handleDetail(meal.id)}
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
                        </>
                      )
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    height: "85px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  {row.meals.map(
                    (meal: Meals) =>
                      meal.type === "OtherMeal" && (
                        <>
                          {meal.menus.map((menu: Menu, index: number) => (
                            <Box key={index}>
                              <Typography.Action
                                sx={{
                                  fontSize: "18px",
                                  fontWeight: 400,
                                  textAlign: "start",
                                  whiteSpace: "nowrap",
                                  lineHeight: "24px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {menu.title}
                              </Typography.Action>
                            </Box>
                          ))}
                          <Typography.Detail
                            onClick={() => handleDetail(meal.id)}
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
                        </>
                      )
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
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
          <Pagination count={pagination.count} page={pagination.currentPage} color="primary" />
        </Box>
      )}
    </TableContainer>
  )
}
