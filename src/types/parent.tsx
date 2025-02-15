export interface Parent {
  user_id: number
  fullName: string
  fullNameKana: string
  phone1: string
  phone2: string
  enrolledStudents: string
  postCode: string
  address: string
}

export interface IParentResponse {
  parents: Parent[]
  total: number
}

export interface IParentSorts {
  sort: string
  ids: string
  fullName: string
  fullNameKana: string
  address: string
}

export interface IParentListFilters {
  sort: string
  ids: string
  fullName: string
  fullNameKana: string
  address: string
}
