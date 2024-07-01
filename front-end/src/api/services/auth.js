import axiosClient from "../axios"

export const logInApi = (user) => {
  return axiosClient.post("/login", user)
}

export const signUpApi = (user) => {
  return axiosClient.post("/register", user)
}

export const findUserApi = (user) => {
  return axiosClient.post("/findUser", user)
}

export const sendResetPasswordCodeApi = ({ email }) => {
  return axiosClient.post("/sendResetPasswordCode", { email })
}

export const validateResetCodeApi = ({ email, code }) => {
  return axiosClient.post("/validateResetCode", { email, code })
}
