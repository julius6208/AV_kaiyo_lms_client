import axios, { RawAxiosRequestHeaders } from "axios"

export const getApiClient = (headers?: RawAxiosRequestHeaders) => {
  const baseURL = `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_PORT}`
  return axios.create({
    headers,
    withCredentials: true,
    baseURL,
  })
}
