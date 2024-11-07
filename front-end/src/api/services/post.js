import axiosClient from "../axios"

export const getAllPostApi = () => {
  return axiosClient.get("/posts")
}

export const getPostApi = (id) => {
  return axiosClient.get(`/posts/${id}`)
}

export const createPostApi = (post) => {
  return axiosClient.post("/posts", post)
}

export const updatePostApi = (post) => {
  return axiosClient.patch(`/posts/${post._id}`, post)
}

export const deletePostApi = (id) => {
  return axiosClient.delete(`/posts/${id}`)
}

export const savePostApi = (data) => {
  return axiosClient.patch(`/posts/save`, data)
}

export const unSavePostApi = (data) => {
  return axiosClient.patch(`/posts/unSave`, data)
}

export const getSavedPostsApi = () => {
  return axiosClient.get(`/posts/saved`)
}
