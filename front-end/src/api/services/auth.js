import axiosClient from "../axios"

export function logInApi(user) {
  return axiosClient.post("/login", user)
}

export function signUpApi(user) {
  return axiosClient.post("/register", user)
}
