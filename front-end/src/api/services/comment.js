import axiosClient from "../axios"

export const createCommentApi = (comment) => {
  return axiosClient.post("/createComment", comment)
}

export const updateCommentApi = (comment) => {
  return axiosClient.post("/updateComment", comment)
}

export const deleteCommentApi = (id) => {
  return axiosClient.delete(`/deleteComment/${id}`)
}
