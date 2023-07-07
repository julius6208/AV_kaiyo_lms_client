import React from "react"

import { MealTable as DesktopMealTable } from "./desktopMealTable"
import { MealTable as MobileMealTable } from "./mobileMealTable"
import { ResponsiveUI } from "src/modules/responsiveUI"
import { SelectMeal } from "src/types/meal"

export interface FieldDefinition<T> {
  attribute: string
  label: string
  width?: number
  color?: string
  widget?: React.FC<{ value?: any; row?: T }>
}

interface AdvancedTableParams<T> {
  fields: FieldDefinition<T>[]
  content: T[]
  idField?: string
  variant?: "pagination" | "next-previous"
  pagination?: {
    count: number
    currentPage: number
  }
  isLoading?: boolean
  error?: string
  handleMealDetailOpen?: Function
  selectMeal: SelectMeal[]
  setSelectMeal: Function
  setMealId?: Function
  mealDate?: string
}

export const MealTable = <T extends Record<string, any>>({
  fields,
  content,
  handleMealDetailOpen,
  selectMeal,
  setSelectMeal,
  setMealId,
  mealDate,
  isLoading,
  error,
}: AdvancedTableParams<T>) => {
  return (
    <ResponsiveUI
      mobile={
        <MobileMealTable
          fields={fields}
          content={content}
          setMealId={setMealId}
          onDetail={handleMealDetailOpen}
          mealDate={mealDate}
          isLoading={isLoading}
          error={error}
        />
      }
      laptop={
        <DesktopMealTable
          fields={fields}
          content={content}
          selectMeal={selectMeal}
          setSelectMeal={setSelectMeal}
          setMealId={setMealId}
          onDetail={handleMealDetailOpen}
          isLoading={isLoading}
          error={error}
        />
      }
    />
  )
}
