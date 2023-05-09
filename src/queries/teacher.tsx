import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"

import { getApiClient } from "src/modules/axios"
import { ITeacherResponse } from "src/types/teacher"
import { createTeacherSearchParams } from "src/modules/query"

const getTeacherList = (
  pageNum: number,
  perPage: number,
  token: string,
  sort: string,
  ids?: string,
  fullName?: string,
  fullNameKana?: string,
  types?: string
) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(
    `/v1/users/teachers${createTeacherSearchParams(
      pageNum,
      perPage,
      sort,
      ids,
      fullName,
      fullNameKana,
      types
    )}`
  )
}

const getExportTeacherList = (token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/users/teachers/export`)
}

export const useGetTeacherList = (
  pageNum: number,
  perPage: number,
  token: string,
  sort: string,
  id?: string,
  fullName?: string,
  fullNameKana?: string,
  types?: string
) => {
  return useQuery<AxiosResponse<ITeacherResponse>, AxiosError>(
    ["getTeacherList", pageNum, perPage, token, sort, id, fullName, fullNameKana, types],
    () => getTeacherList(pageNum, perPage, token, sort, id, fullName, fullNameKana, types)
  )
}

export const useGetExportTeacherList = (token: string) => {
  return useQuery<AxiosResponse<any>, AxiosError>(["getExportTeacherList", token], () =>
    getExportTeacherList(token)
  )
}
