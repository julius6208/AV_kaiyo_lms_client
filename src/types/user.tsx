export type UserState = "teacher" | "student" | "parent" | "meal-maker"

export interface ISessionState {
  value: UserState
  setValue: Function
}
