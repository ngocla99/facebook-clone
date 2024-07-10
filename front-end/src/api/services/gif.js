import axiosClient from "../axios"

export const getGIFsApi = ({ searchBy, limit }) => {
  return axiosClient.get(`/gifs?searchBy=${searchBy}&limit=${limit}`)
}
