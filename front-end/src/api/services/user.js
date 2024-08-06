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

export const sendFriendRequestApi = (userId) => {
  return axiosClient.put(`/sendFriendRequest`, { userId })
}

export const cancelFriendRequestApi = (userId) => {
  return axiosClient.put(`/cancelFriendRequest`, { userId })
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
