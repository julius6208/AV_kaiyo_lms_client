import { AxiosResponse, AxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"

import { getApiClient } from "src/modules/axios"
import { useGetMutation } from "src/modules/mutation"
import { Meal, SelectMeal } from "src/types/meal"

const getTeacherMealList = (token: string, date: string, id: number) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/meals/teachers/${id}?date=${date}`)
}

const getUserMealList = (token: string, date: string) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/meals?date=${date}`)
}

const getMealDetail = ({ token, id }: { token: string; id: number }) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).get(`/v1/meals/${id}`)
}

const updateSelectMeal = ({
  token,
  id,
  data,
}: {
  token: string
  id: number
  data: SelectMeal[]
}) => {
  return getApiClient({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }).put(`/v1/meals/teachers/${id}`, data)
}

export const useGetTeacherMealList = (token: string, date: string, id: number) => {
  return useQuery<AxiosResponse<Meal>, AxiosError>(["getTeacherMealList", token, date, id], () =>
    getTeacherMealList(token, date, id)
  )
}

export const useGetUserMealList = (token: string, date: string) => {
  return useQuery<AxiosResponse<Meal>, AxiosError>(["getUserMealList", token, date], () =>
    getUserMealList(token, date)
  )
}

export const useGetMealDetail = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(getMealDetail, onSuccess, onError)
}

export const useUpdateSelectMeal = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(updateSelectMeal, onSuccess, onError)
}
