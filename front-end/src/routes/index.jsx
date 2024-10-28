import { ForgotPassword } from "@/pages/auth/forgot-password"
import { PasswordChanged } from "@/pages/auth/forgot-password/password-changed"
import Login from "@/pages/auth/login"
import { FriendHome } from "@/pages/friends/friend-home"
import { FriendList } from "@/pages/friends/friend-list"
import { FriendRequests } from "@/pages/friends/friend-requests"
import { FriendSuggestions } from "@/pages/friends/friend-suggestions"
import Home from "@/pages/home"
import PageNotFound from "@/pages/page-not-found"
import { ProfileAbout } from "@/pages/profile/profile-about"
import { ProfileLayout } from "@/pages/profile/profile-layout"
import { ProfilePosts } from "@/pages/profile/profile-posts"
import { Saved } from "@/pages/saved"
import { CollectionView } from "@/pages/saved/components/collection-view"
import { SavedView } from "@/pages/saved/components/saved-view"
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
      path: "/page-not-found",
      element: <PageNotFound />,
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
          path: "/profile/:username",
          element: <ProfileLayout />,
          children: [
            {
              path: "",
              element: <ProfilePosts />,
            },
            {
              path: "posts",
              element: <ProfilePosts />,
            },
            {
              path: "about",
              element: <ProfileAbout />,
            },
          ],
        },
        {
          path: "/friends",
          children: [
            {
              path: "",
              element: <FriendHome />,
            },
            {
              path: "requests/:username",
              element: <FriendRequests />,
              children: [
                {
                  path: "",
                  element: <ProfilePosts />,
                },
                {
                  path: "posts",
                  element: <ProfilePosts />,
                },
                {
                  path: "about",
                  element: <ProfileAbout />,
                },
              ],
            },
            {
              path: "requests",
              element: <FriendRequests />,
            },
            {
              path: "suggestions/:username",
              element: <FriendSuggestions />,
              children: [
                {
                  path: "",
                  element: <ProfilePosts />,
                },
                {
                  path: "posts",
                  element: <ProfilePosts />,
                },
                {
                  path: "about",
                  element: <ProfileAbout />,
                },
              ],
            },
            {
              path: "suggestions",
              element: <FriendSuggestions />,
            },
            {
              path: "list/:username",
              element: <FriendList />,
              children: [
                {
                  path: "",
                  element: <ProfilePosts />,
                },
                {
                  path: "posts",
                  element: <ProfilePosts />,
                },
                {
                  path: "about",
                  element: <ProfileAbout />,
                },
              ],
            },
            {
              path: "list",
              element: <FriendList />,
            },
          ],
        },
        {
          path: "/saved",
          element: <Saved />,
          children: [
            {
              path: "",
              element: <SavedView />,
            },
            {
              path: "items",
              element: <SavedView />,
            },
            {
              path: "collection/:id",
              element: <CollectionView />,
            },
          ],
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
