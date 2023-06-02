export const createStudentSearchParams = (
  pageNum: number,
  perPage: number,
  sort: string,
  ids?: string,
  fullName?: string,
  fullNameKana?: string,
  birthday?: string,
  grade?: string,
  learningG?: string,
  dormitory?: string,
  club_id?: string,
  curriculum?: string,
  enrolledSibling?: string
) => {
  let result = `?pageNum=${pageNum}&perPage=${perPage}&sort=${sort}`
  if (ids) {
    result += `&ids=${ids}`
  }
  if (fullName) {
    result += `&fullName=${fullName}`
  }
  if (fullNameKana) {
    result += `&fullNameKana=${fullNameKana}`
  }
  if (birthday) {
    result += `&birthday=${birthday}`
  }
  if (grade) {
    result += `&grades=${grade}`
  }
  if (learningG) {
    result += `&learningG=${learningG}`
  }
  if (dormitory) {
    result += `&dormitory=${dormitory}`
  }
  if (club_id) {
    result += `&club_id=${club_id}`
  }
  if (curriculum) {
    result += `&curriculum=${curriculum}`
  }
  if (enrolledSibling) {
    result += `&enrolledSiblings=${enrolledSibling}`
  }
  return result
}

export const createParentSearchParams = (
  pageNum: number,
  perPage: number,
  sort: string,
  ids?: string,
  fullName?: string,
  fullNameKana?: string,
  address?: string
) => {
  let result = `?pageNum=${pageNum}&perPage=${perPage}&sort=${sort}`
  if (ids) {
    result += `&ids=${ids}`
  }
  if (fullName) {
    result += `&fullName=${fullName}`
  }
  if (fullNameKana) {
    result += `&fullNameKana=${fullNameKana}`
  }
  if (address) {
    result += `&address=${address}`
  }
  return result
}

export const createTeacherSearchParams = (
  pageNum: number,
  perPage: number,
  sort: string,
  ids?: string,
  fullName?: string,
  fullNameKana?: string,
  types?: string
) => {
  let result = `?pageNum=${pageNum}&perPage=${perPage}&sort=${sort}`
  if (ids) {
    result += `&ids=${ids}`
  }
  if (fullName) {
    result += `&fullName=${fullName}`
  }
  if (fullNameKana) {
    result += `&fullNameKana=${fullNameKana}`
  }
  if (types) {
    result += `&types=${types}`
  }
  return result
}

export const createApplicationSearchParams = (
  pageNum: number,
  perPage: number,
  sort?: string,
  student_name?: string,
  category?: string,
  status?: string,
  created_at?: string,
  departure_date?: string,
  arrival_date?: string
) => {
  let result = `?pageNum=${pageNum}&perPage=${perPage}&sort=${sort}`
  if (student_name) {
    result += `&student_name=${student_name}`
  }
  if (category) {
    result += `&category=${category}`
  }
  if (status) {
    result += `&status=${status}`
  }
  if (created_at) {
    result += `&created_at=${created_at}`
  }
  if (departure_date) {
    result += `&departure_date=${departure_date}`
  }
  if (arrival_date) {
    result += `&arrival_date=${arrival_date}`
  }
  return result
}
