import axiosClient from "../axios"

export const getCollectionsApi = () => {
  return axiosClient.get("/getCollections")
}
