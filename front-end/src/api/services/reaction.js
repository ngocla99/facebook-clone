import axiosClient from "../axios"

export const getReactsApi = (postId) => {
  return axiosClient.get(`/reactions/${postId}`)
}

export const reactPostApi = (data) => {
  return axiosClient.post("/reactions", data)
}
