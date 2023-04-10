import React from "react"

import { MealTable as DesktopMealTable } from "./desktopMealTable"
import { MealTable as MobileMealTable } from "./mobileMealTable"
import { ResponsiveUI } from "src/modules/responsiveUI"

export interface FieldDefinition<T> {
  attribute: string
  label: string
  width?: number
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
  onDetail?: Function
}

export const MealTable = <T extends Record<string, any>>({
  content,
  fields,
  onDetail,
}: AdvancedTableParams<T>) => {
  return (
    <ResponsiveUI
      mobile={<MobileMealTable fields={fields} content={content} onDetail={onDetail} />}
      laptop={<DesktopMealTable fields={fields} content={content} onDetail={onDetail} />}
    />
  )
}
