import { Navigate, Outlet } from "react-router-dom"

import { useAuth } from "@/providers/auth-provider"

export const ProtectedRoute = () => {
  const { token } = useAuth()

  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />
  }

  // If authenticated, render the child routes
  return <Outlet />
}
