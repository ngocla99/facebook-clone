import axiosClient from "../axios"

export const getGIFsApi = ({ searchBy, limit }) => {
  return axiosClient.get(`/gifs?searchBy=${searchBy}&limit=${limit}`)
}

export const getImagesApi = (query) => {
  return axiosClient.post("/upload/getImages", query)
}

export const uploadImageApi = (data) => {
  return axiosClient.post("/upload", data)
}
