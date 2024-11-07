import axiosClient from "../axios"

export const logInApi = (user) => {
  return axiosClient.post("/auth/login", user)
}

export const signUpApi = (user) => {
  return axiosClient.post("/auth/register", user)
}

export const findUserApi = (user) => {
  return axiosClient.post("/auth/findUser", user)
}

export const sendResetPasswordCodeApi = ({ email }) => {
  return axiosClient.post("/auth/sendResetPasswordCode", { email })
}

export const validateResetCodeApi = ({ email, code }) => {
  return axiosClient.post("/auth/validateResetCode", { email, code })
}

export const changePasswordApi = (data) => {
  return axiosClient.post("/auth/changePassword", data)
}
