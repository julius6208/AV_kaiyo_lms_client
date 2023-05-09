import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"

import { getApiClient } from "src/modules/axios"
import { createStudentSearchParams } from "src/modules/query"
import { IStudentResponse } from "src/types/student"

const getStudentList = (
  pageNum: number,
  perPage: number,
  token: string,
  sort: string,
  ids?: string,
  fullName?: string,
  fullNameKana?: string,
  birthday?: string,
  grades?: string,
  learningG?: string,
  dormitory?: string,
  club_id?: string,
  curriculum?: string,
  enrolledSibling?: string
) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(
    `/v1/users/students${createStudentSearchParams(
      pageNum,
      perPage,
      sort,
      ids,
      fullName,
      fullNameKana,
      birthday,
      grades,
      learningG,
      dormitory,
      club_id,
      curriculum,
      enrolledSibling
    )}`
  )
}

const getExportStudentList = (token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/users/students/export`)
}

export const useGetStudentList = (
  pageNum: number,
  perPage: number,
  token: string,
  sort: string,
  ids?: string,
  fullName?: string,
  fullNameKana?: string,
  birthday?: string,
  grades?: string,
  learningG?: string,
  dormitory?: string,
  club_id?: string,
  curriculum?: string,
  enrolledSibling?: string
) => {
  return useQuery<AxiosResponse<IStudentResponse>, AxiosError>(
    [
      "getStudentList",
      pageNum,
      perPage,
      token,
      sort,
      ids,
      fullName,
      fullNameKana,
      birthday,
      grades,
      learningG,
      dormitory,
      club_id,
      curriculum,
      enrolledSibling,
    ],
    () =>
      getStudentList(
        pageNum,
        perPage,
        token,
        sort,
        ids,
        fullName,
        fullNameKana,
        birthday,
        grades,
        learningG,
        dormitory,
        club_id,
        curriculum,
        enrolledSibling
      )
  )
}

export const useGetExportStudentList = (token: string) => {
  return useQuery<AxiosResponse<any>, AxiosError>(["getExportStudentList", token], () =>
    getExportStudentList(token)
  )
}
