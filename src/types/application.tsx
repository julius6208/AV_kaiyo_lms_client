export interface Application {
  id: number
  student_id: number
  student_name: string
  hm: string
  created_at: string
  departure_datetime: string
  departure_companion: string
  departure_detail: string
  arrival_datetime: string
  arrival_companion: string
  arrival_detail: string
  content: string
  category: CategoryType | string
  rejected_reason: string
  type: string
  status: ApproveType | string
  checked?: boolean
}

export type ApplicationItem = Application & { checked: boolean }

export interface IApplicationResponse {
  applications: Application[]
  total: number
}

export interface IApplicationSorts {
  sort: string
  student_name: string
  category: CategoryType | string
  status: ApproveType | string
  created_at: string
  departure_datetime: string
  arrival_datetime: string
}

export interface IApplicationListFilters {
  sort: string
  student_name: string
  category: CategoryType | string
  status: ApproveType | string
  created_at: string
  departure_date: string
  arrival_date: string
}

export interface DenyReason {
  reason: string
}

export type CategoryType = "go_out" | "absence" | "go_home"

export type ApproveType = "un_approve" | "approve" | "deny"
