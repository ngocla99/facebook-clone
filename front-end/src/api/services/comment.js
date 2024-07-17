import axiosClient from "../axios"

export const createCommentApi = (post) => {
  return axiosClient.post("/createComment", post)
}

export const deleteCommentApi = (id) => {
  return axiosClient.delete(`/deleteComment/${id}`)
}
