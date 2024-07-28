import axiosClient from "../axios"

export const getGIFsApi = ({ searchBy, limit }) => {
  return axiosClient.get(`/gifs?searchBy=${searchBy}&limit=${limit}`)
}

export const getImagesApi = (data) => {
  return axiosClient.post("/getImages", data)
}

export const uploadImageApi = (data) => {
  return axiosClient.post("/uploadImages", data)
}
