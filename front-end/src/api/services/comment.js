import axiosClient from "../axios"

export const createCommentApi = (post) => {
  return axiosClient.post("/createComment", post)
}