import axiosClient from "../axios"

export const getReactsApi = (postId) => {
  return axiosClient.get(`/getReactions/${postId}`)
}

export const reactPostApi = (data) => {
  return axiosClient.post("/reactPost", data)
}
