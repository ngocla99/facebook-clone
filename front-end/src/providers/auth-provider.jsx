import { createContext, useContext, useMemo, useReducer } from "react"
import axiosClient from "@/api/axios"
import Cookies from "js-cookie"

// Create the authentication context
const AuthContext = createContext()

// Define the possible actions for the authReducer
const ACTIONS = {
  setAuth: "setAuth",
  clearAuth: "clearAuth",
}

// Reducer function to handle authentication state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.setAuth:
      // Set the authentication token in axios headers and local storage
      axiosClient.defaults.headers.common["Authorization"] =
        "Bearer " + action.payload.token
      Cookies.set("auth", JSON.stringify(action.payload))

      return {
        ...state,
        auth: action.payload,
      }
    case ACTIONS.clearAuth:
      // Clear the authentication token from axios headers and local storage
      delete axiosClient.defaults.headers.common["Authorization"]
      Cookies.set("auth", "")

      return { ...state, auth: null }
    // Handle other actions (if any)

    default:
      console.error(
        `You passed an action.type: ${action.type} which doesn't exist`
      )
  }
}

// Initial state for the authentication context
const initialData = {
  auth: Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null,
}

const AuthProvider = ({ children }) => {
  // Use reducer to manage the authentication state
  const [state, dispatch] = useReducer(authReducer, initialData)

  const setAuth = (auth) => {
    dispatch({ type: ACTIONS.setAuth, payload: auth })
  }

  const clearAuth = () => {
    dispatch({ type: ACTIONS.clearAuth })
  }

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      ...state,
      setAuth,
      clearAuth,
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
