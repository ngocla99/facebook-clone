import axiosClient from "../axios"

export const getCollectionsApi = () => {
  return axiosClient.get("/collections")
}

export const addPostToCollectionApi = ({ collectionName, postId }) => {
  return axiosClient.patch("/collections/savePost", {
    collectionName,
    postId,
  })
}
