import axiosClient from "../axios"

export const getMeApi = () => {
  return axiosClient.get("/users/profile/me")
}

export const getProfileApi = (username) => {
  return axiosClient.get(`/users/profile/${username}`)
}

export const updateProfileApi = (data) => {
  return axiosClient.patch(`/users/profile/update`, data)
}

export const sendFriendRequestApi = async (userId) => {
  //https://github.com/TanStack/query/discussions/6905
  const startTime = Date.now()
  const response = await axiosClient.patch(`/users/friends/sendRequest`, {
    userId,
  })
  const endTime = Date.now()
  const delay = 1000 - (endTime - startTime)
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
  return response
}

export const cancelFriendRequestApi = async (userId) => {
  const startTime = Date.now()
  const response = await axiosClient.patch(`/users/friends/cancelRequest`, {
    userId,
  })
  const endTime = Date.now()
  const delay = 1000 - (endTime - startTime)
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
  return response
}

export const acceptFriendRequestApi = (userId) => {
  return axiosClient.patch(`/users/friends/acceptRequest`, { userId })
}

export const removeFriendRequestApi = (userId) => {
  return axiosClient.patch(`/users/friends/removeRequest`, { userId })
}

export const unfriendApi = (userId) => {
  return axiosClient.patch(`/users/friends/unfriend`, { userId })
}

export const followApi = (userId) => {
  return axiosClient.patch(`/users/follow`, { userId })
}

export const unfollowApi = (userId) => {
  return axiosClient.patch(`/users/unfollow`, { userId })
}

export const getFriendsPageInfoApi = () => {
  return axiosClient.get("/users/friends/info")
}

export const getOthersApi = () => {
  return axiosClient.get("/users/others")
}
