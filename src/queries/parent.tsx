import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"

import { getApiClient } from "src/modules/axios"
import { createParentSearchParams } from "src/modules/query"
import { IParentResponse } from "src/types/parent"

const getParentList = (
  pageNum: number,
  perPage: number,
  token: string,
  sort: string,
  ids?: string,
  fullName?: string,
  fullNameKana?: string,
  address?: string
) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(
    `/v1/users/parents${createParentSearchParams(
      pageNum,
      perPage,
      sort,
      ids,
      fullName,
      fullNameKana,
      address
    )}`
  )
}

const getExportParentList = (token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/users/parents/export`)
}

export const useGetParentList = (
  pageNum: number,
  perPage: number,
  token: string,
  sort: string,
  id?: string,
  fullName?: string,
  fullNameKana?: string,
  address?: string
) => {
  return useQuery<AxiosResponse<IParentResponse>, AxiosError>(
    ["getParentList", pageNum, perPage, token, sort, id, fullName, fullNameKana, address],
    () => getParentList(pageNum, perPage, token, sort, id, fullName, fullNameKana, address)
  )
}

export const useGetExportParentList = (token: string) => {
  return useQuery<AxiosResponse<any>, AxiosError>(["getExportParentList", token], () =>
    getExportParentList(token)
  )
}
