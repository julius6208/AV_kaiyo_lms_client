import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"

import { UserState } from "src/types/user"
import { LoginLink } from "src/types/session"
import { getApiClient } from "src/modules/axios"
import { useGetMutation } from "src/modules/mutation"

const getLoginLink = (data: UserState) => {
  return getApiClient({
    "Content-Type": "application/json",
  }).get(`/v1/auth/login/${data}`)
}

const login = ({ role, code }: { role: string; code: string }) => {
  console.log(role, code, "query check")
  return getApiClient({
    "Content-Type": "application/json",
  }).post("/v1/auth/login", { role: role, code: code })
}

const logout = ({ code }: { code: string }) => {
  return getApiClient({
    "Content-Type": "application/json",
  }).post("/v1/auth/logout", { code: code })
}

const refresh = () => {
  return getApiClient({
    "Content-Type": "application/json",
  }).post("/v1/auth/refresh")
}

export const useGetLoginLink = (state: UserState) => {
  return useQuery<AxiosResponse<LoginLink>, AxiosError>(["getLoginLink", state], () =>
    getLoginLink(state)
  )
}

export const useRefresh = ({ onSuccess, onError }: { onSuccess: Function; onError: Function }) => {
  return useGetMutation(refresh, onSuccess, onError)
}

export const useLogout = ({ onSuccess, onError }: { onSuccess: Function; onError: Function }) => {
  return useGetMutation(logout, onSuccess, onError)
}

const getAuthCode = (link: any) => {
  return axios.get(link)
}

export const useGetAuthCode = (link: any) => {
  return useQuery<AxiosResponse<any>, AxiosError>(["getAuthCode", link], () => getAuthCode(link))
}

export const useMicroSoftLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(login, onSuccess, onError)
}
