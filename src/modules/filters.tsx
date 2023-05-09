import { IParentListFilters } from "src/types/parent"
import { IStudentListFilters } from "src/types/student"
import { ITeacherListFilters } from "src/types/teacher"

export const getOptimizedStudentListFilters = (
  params: IStudentListFilters
): Partial<IStudentListFilters> => {
  const result: Partial<IStudentListFilters> = { ...params }

  !params.sort && delete result.sort
  !params.ids && delete result.ids
  !params.fullName && delete result.fullName
  !params.fullNameKana && delete result.fullNameKana
  !params.birthday && delete result.birthday
  !params.grades && delete result.grades
  !params.learningG && delete result.learningG
  !params.dormitory && delete result.dormitory
  !params.club_id && delete result.club_id
  !params.curriculum && delete result.curriculum
  !params.enrolledSibling && delete result.enrolledSibling

  return result
}

export const getOptimizedParentListFilters = (
  params: IParentListFilters
): Partial<IParentListFilters> => {
  const result: Partial<IParentListFilters> = { ...params }

  !params.sort && delete result.sort
  !params.ids && delete result.ids
  !params.fullName && delete result.fullName
  !params.fullNameKana && delete result.fullNameKana
  !params.address && delete result.address

  return result
}

export const getOptimizedTeacherListFilters = (
  params: ITeacherListFilters
): Partial<ITeacherListFilters> => {
  const result: Partial<ITeacherListFilters> = { ...params }

  !params.sort && delete result.sort
  !params.ids && delete result.ids
  !params.fullName && delete result.fullName
  !params.fullNameKana && delete result.fullNameKana
  !params.types && delete result.types

  return result
}
