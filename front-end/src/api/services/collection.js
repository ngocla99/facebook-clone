import axiosClient from "../axios"

export const getCollectionsApi = () => {
  return axiosClient.get("/getCollections")
}

export const addPostToCollectionApi = ({ collectionName, postId }) => {
  return axiosClient.patch("/savePostInCollection", { collectionName, postId })
}
