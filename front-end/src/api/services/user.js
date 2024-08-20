import axiosClient from "../axios"

export const getMeApi = () => {
  return axiosClient.get("/getMe")
}

export const getProfileApi = (username) => {
  return axiosClient.get(`/getProfile/${username}`)
}

export const updateProfileApi = (data) => {
  return axiosClient.patch(`/updateProfile`, data)
}

export const sendFriendRequestApi = async (userId) => {
  //https://github.com/TanStack/query/discussions/6905
  const startTime = Date.now()
  const response = await axiosClient.patch(`/sendFriendRequest`, { userId })
  const endTime = Date.now()
  const delay = 1000 - (endTime - startTime)
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
  return response
}

export const cancelFriendRequestApi = async (userId) => {
  const startTime = Date.now()
  const response = await axiosClient.patch(`/cancelFriendRequest`, { userId })
  const endTime = Date.now()
  const delay = 1000 - (endTime - startTime)
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
  return response
}

export const acceptFriendRequestApi = (userId) => {
  return axiosClient.patch(`/acceptFriendRequest`, { userId })
}

export const removeFriendRequestApi = (userId) => {
  return axiosClient.patch(`/removeFriendRequest`, { userId })
}

export const unfriendApi = (userId) => {
  return axiosClient.patch(`/unfriend`, { userId })
}

export const followApi = (userId) => {
  return axiosClient.patch(`/follow`, { userId })
}

export const unfollowApi = (userId) => {
  return axiosClient.patch(`/unfollow`, { userId })
}

export const getFriendsPageInfoApi = () => {
  return axiosClient.get("/getFriendsPageInfo")
}

export const getOthersApi = () => {
  return axiosClient.get("/getOthers")
}
