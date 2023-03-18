export interface Application {
  id: number
  student: string
  hm: string
  applicationtime: string
  leavetime: string
  returntime: string
  category: CategoryType | string
  reason: string
  approval: ApproveType | string
  checked?: boolean
}

export type CategoryType = "all" | "go_out" | "absence" | "go_home"

export type ApproveType = "un_approve" | "approve" | "deny"
