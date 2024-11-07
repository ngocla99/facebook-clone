import axiosClient from "../axios"

export const createCommentApi = (comment) => {
  return axiosClient.post("/comments", comment)
}

export const updateCommentApi = (comment) => {
  return axiosClient.patch(`/comments/${comment._id}`, comment)
}

export const deleteCommentApi = (id) => {
  return axiosClient.delete(`/comments/${id}`)
}
