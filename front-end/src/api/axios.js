import axios from "axios"
import Cookies from "js-cookie"

// Set config defaults when creating the instance
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Add token (if existed) to request when reload
axiosClient.interceptors.request.use(
  (config) => {
    const auth = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null
    if (auth?.token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      localStorage.removeItem("token")
      window.location.replace("/signin")
    }

    return Promise.reject(error)
  }
)

export default axiosClient
