import { ForgotPassword } from "@/pages/auth/forgot-password"
import { PasswordChanged } from "@/pages/auth/forgot-password/password-changed"
import Login from "@/pages/auth/login"
import Home from "@/pages/home"
import { PageNotFound } from "@/pages/page-not-found"
import Profile from "@/pages/profile"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { useAuth } from "@/providers/auth-provider"
import { AppLayout } from "@/components/layouts/app-layout"
import { AuthLayout } from "@/components/layouts/auth-layout"
import ErrorBoundary from "@/components/layouts/error-boundary"

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
      element: <PageNotFound />,
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
      errorElement: <ErrorBoundary />,
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
          path: "/password/change/reason",
          element: <PasswordChanged />,
        },
      ],
    },
  ]

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
      ],
    },
  ]

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ])

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />
}

export default Routes
