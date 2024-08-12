import axios from "axios"
import Cookies from "js-cookie"

// Set config defaults when creating the instance
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// let startTime
// let endTime

// Add token (if existed) to request when reload
axiosClient.interceptors.request.use(
  (config) => {
    // startTime = Date.now()
    const token = Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  async (response) => {
    // endTime = Date.now()
    // const delay = 1000 - (endTime - startTime)
    // if (delay > 0) {
    //   await new Promise((resolve) => setTimeout(resolve, delay))
    // }
    return response.data
  },
  async (error) => {
    const originalRequest = error.config

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      Cookies.set("token", "")
      window.location.replace("/login")
    }

    return Promise.reject(error)
  }
)

export default axiosClient
