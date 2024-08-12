import axiosClient from "../axios"

export const getMeApi = () => {
  return axiosClient.get("/getMe")
}

export const getProfileApi = (username) => {
  return axiosClient.get(`/getProfile/${username}`)
}

export const updateProfileApi = (data) => {
  return axiosClient.put(`/updateProfile`, data)
}

export const sendFriendRequestApi = async (userId) => {
  //https://github.com/TanStack/query/discussions/6905
  const startTime = Date.now()
  const response = await axiosClient.put(`/sendFriendRequest`, { userId })
  const endTime = Date.now()
  const delay = 1000 - (endTime - startTime)
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
  return response
}

export const cancelFriendRequestApi = async (userId) => {
  const startTime = Date.now()
  const response = await axiosClient.put(`/cancelFriendRequest`, { userId })
  const endTime = Date.now()
  const delay = 1000 - (endTime - startTime)
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
  return response
}

export const acceptFriendRequestApi = (userId) => {
  return axiosClient.put(`/acceptFriendRequest`, { userId })
}

export const removeFriendRequestApi = (userId) => {
  return axiosClient.put(`/removeFriendRequest`, { userId })
}

export const unfriendApi = (userId) => {
  return axiosClient.put(`/unfriend`, { userId })
}

export const followApi = (userId) => {
  return axiosClient.put(`/follow`, { userId })
}

export const unfollowApi = (userId) => {
  return axiosClient.put(`/unfollow`, { userId })
}

export const getFriendsPageInfo = () => {
  return axiosClient.get("/getFriendsPageInfo")
}
