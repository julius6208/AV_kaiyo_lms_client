import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"

import { getApiClient } from "src/modules/axios"
import { useGetMutation } from "src/modules/mutation"
import { createApplicationSearchParams } from "src/modules/query"
import { IApplicationResponse, Application, DenyReason } from "src/types/application"

const getApplicationList = (
  pageNum: number,
  perPage: number,
  token: string,
  sort: string,
  studentName: string,
  category: string,
  status: string,
  createdAt: string,
  departureDate: string,
  arrivalDate: string
) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(
    `/v1/applications${createApplicationSearchParams(
      pageNum,
      perPage,
      sort,
      studentName,
      category,
      status,
      createdAt,
      departureDate,
      arrivalDate
    )}`
  )
}

export const useGetApplicationList = (
  pageNum: number,
  perPage: number,
  token: string,
  sort: string,
  studentName: string,
  category: string,
  status: string,
  createdAt: string,
  departureDate: string,
  arrivalDate: string
) => {
  return useQuery<AxiosResponse<IApplicationResponse>, AxiosError>(
    [
      "getApplicationList",
      pageNum,
      perPage,
      token,
      sort,
      studentName,
      category,
      status,
      createdAt,
      departureDate,
      arrivalDate,
    ],
    () =>
      getApplicationList(
        pageNum,
        perPage,
        token,
        sort,
        studentName,
        category,
        status,
        createdAt,
        departureDate,
        arrivalDate
      )
  )
}

const getApplication = (id: string, token: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/applications/${id}`)
}

export const useGetApplication = (id: string, token: string) => {
  return useQuery<AxiosResponse<Application>, AxiosError>(["getApplication", token, id], () =>
    getApplication(id, token)
  )
}

const addApplication = ({ data, token }: { data: Application; token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).post(`/v1/applications`, data)
}

export const useAddApplication = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(addApplication, onSuccess, onError)
}

const approveApplication = ({ data, token }: { data: number; token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).post(`/v1/applications/${data}/approve`)
}

export const useApproveApplication = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(approveApplication, onSuccess, onError)
}

const rejectApplication = ({
  id,
  data,
  token,
}: {
  id: number
  data: DenyReason
  token: string
}) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).post(`/v1/applications/${id}/deny`, data)
}

export const useRejectApplication = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(rejectApplication, onSuccess, onError)
}

const approveApplications = ({ ids, token }: { ids: number[]; token: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).post(`/v1/applications/approve?ids=${ids}`)
}

export const useApproveApplications = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(approveApplications, onSuccess, onError)
}
