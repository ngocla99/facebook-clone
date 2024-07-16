import axiosClient from "../axios"

export const getAllPostApi = () => {
  return axiosClient.get("/getAllPost")
}

export const getPostApi = (id) => {
  return axiosClient.get(`/getPost/${id}`)
}

export const createPostApi = (post) => {
  return axiosClient.post("/createPost", post)
}
