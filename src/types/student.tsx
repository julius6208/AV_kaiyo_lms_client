export interface Student {
  user_id: number
  fullName: string
  fullNameKana: string
  birthday: string
  phone: string
  postCode: string
  address: string
  grade: number
  learningG: number
  attendanceNumber: number
  dormitory: string
  club_name: string
  curriculum: string
  enrolledSiblings: string
  parent_name: string
  parent_phone: string
}

export interface IStudentResponse {
  students: Student[]
  total: number
}

export interface IStudentSorts {
  sort: string
  ids: string
  fullName: string
  fullNameKana: string
  birthday: string
  postCode: string
  grade: string
  learningG: string
  attendanceNumber: string
  dormitory: string
  club_id: string
  curriculum: string
  enrolledSibling: string
}

export interface IStudentListFilters {
  sort: string
  ids: string
  fullName: string
  fullNameKana: string
  birthday: string
  grades?: string
  learningG?: string
  dormitory?: string
  club_id?: string
  curriculum: string
  enrolledSibling: string
}
