export interface Meal {
  meals: MealList[]
  totalBreakfast: number
  totalLunch: number
  totalDinner: number
  totalCost: number
}

export interface MealList {
  date: string
  meals: Meals[]
}

export interface Meals {
  id: number
  date: string
  type: MealCategory
  menus: Menu[]
  selected: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface Menu {
  id: number
  title: string
  energy: string
  protein: string
  lipid: string
  saltiness: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface SelectMeal {
  mealId: number
  status: boolean
}

export type MealCategory = "Breakfast" | "Lunch" | "DinnerA" | "DinnerB" | "DinnerC" | "OtherMeal"
