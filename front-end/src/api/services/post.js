import axiosClient from "../axios"

export const getAllPostApi = () => {
  return axiosClient.get("/getAllPost")
}

export const createPostApi = (post) => {
  return axiosClient.post("/createPost", post)
}
