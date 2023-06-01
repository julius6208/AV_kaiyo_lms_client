import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"

import { getApiClient } from "src/modules/axios"
//import { ITeacherInfo, IParentInfo } from "src/types/userDetail"

const getUserList = (token: string, id: number) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/users/${id}`)
}

export const useGetTeacherList = (token: string, id: number) => {
  return useQuery<AxiosResponse, AxiosError>(["getUserList", token, id], () =>
    getUserList(token, id)
  )
}
