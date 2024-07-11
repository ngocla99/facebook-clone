import React, { createContext, useContext, useMemo, useReducer } from "react"
import axiosClient from "@/api/axios"
import Cookies from "js-cookie"

// Create the authentication context
const AuthContext = createContext()

// Define the possible actions for the authReducer
const ACTIONS = {
  setToken: "setToken",
  clearToken: "clearToken",
}

// Reducer function to handle authentication state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.setToken:
      // Set the authentication token in axios headers and local storage
      axiosClient.defaults.headers.common["Authorization"] =
        "Bearer " + action.payload
      Cookies.set("token", JSON.stringify(action.payload))

      return {
        ...state,
        token: action.payload,
      }
    case ACTIONS.clearToken:
      // Clear the authentication token from axios headers and local storage
      delete axiosClient.defaults.headers.common["Authorization"]
      Cookies.set("token", "")

      return { ...state, token: null }
    // Handle other actions (if any)

    default:
      console.error(
        `You passed an action.type: ${action.type} which doesn't exist`
      )
  }
}

// Initial state for the authentication context
const initialData = {
  token: Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null,
}

const AuthProvider = ({ children }) => {
  // Use reducer to manage the authentication state
  const [state, dispatch] = useReducer(authReducer, initialData)

  const setToken = (token) => {
    dispatch({ type: ACTIONS.setToken, payload: token })
  }

  const clearToken = () => {
    dispatch({ type: ACTIONS.clearToken })
  }

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      ...state,
      setToken,
      clearToken,
    }),
    [state]
  )

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

// Custom hook to easily access the authentication context
export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
