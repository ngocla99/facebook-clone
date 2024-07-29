import axiosClient from "../axios"

export const getMeApi = () => {
  return axiosClient.get("/getMe")
}

export const getProfileApi = (username) => {
  return axiosClient.get(`/getProfile/${username}`)
}

export const updateProfileApi = (data) => {
  return axiosClient.put(`/updateProfile`, data)
}
