export interface Teacher {
  user_id: number
  fullName: string
  fullNameKana: string
  type: string
  phone1: string
  phone2: string
}

export interface ITeacherResponse {
  teachers: Teacher[]
  total: number
}

export interface ITeacherSorts {
  sort: string
  ids: string
  fullName: string
  fullNameKana: string
  types: string
}

export interface ITeacherListFilters {
  sort: string
  ids: string
  fullName: string
  fullNameKana: string
  types: string
}
