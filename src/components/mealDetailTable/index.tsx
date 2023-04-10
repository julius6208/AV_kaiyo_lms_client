import React from "react"

import { MealDetailTable as DesktopMealDetailTable } from "./desktopMealDetailTable"
import { MealDetailTable as MobileMealDetailTable } from "./mobileMealDetailTable"
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

export const MealDetailTable = <T extends Record<string, any>>({
  content,
  fields,
  onDetail,
}: AdvancedTableParams<T>) => {
  return (
    <ResponsiveUI
      mobile={<MobileMealDetailTable fields={fields} content={content} onDetail={onDetail} />}
      laptop={<DesktopMealDetailTable fields={fields} content={content} onDetail={onDetail} />}
    />
  )
}
