import Logout from "@/pages/auth/logout"
import Error from "@/pages/error"
import Home from "@/pages/home"
import Profile from "@/pages/profile"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { useAuth } from "@/providers/auth-provider"

import { AppLayout } from "./app-layout"
import ErrorBoundary from "./error-boundary"
import { ProtectedRoute } from "./protected-route"

const Routes = () => {
  const { token } = useAuth()
  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
    {
      path: "*",
      element: "Page not found!",
    },
  ]

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: (
        <AppLayout>
          <ProtectedRoute />
        </AppLayout>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ]

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      lazy: async () => {
        let Login = await import("@/pages/auth/login")
        return { Component: Login.default }
      },
    },
    {
      path: "/error",
      element: <Error />,
      errorElement: <ErrorBoundary />,
    },
  ]

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    // ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ])

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />
}

export default Routes
