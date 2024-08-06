import React from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"

import { useProfile } from "@/hooks/use-profile"

import { ProfileInfo } from "./components/profile-info"
import { ProfileMenu } from "./components/profile-menu"

export const ProfileLayout = () => {
  const navigate = useNavigate()
  const { username } = useParams()
  const { data: user, isLoading, isSuccess } = useProfile(username)

  React.useEffect(() => {
    if (!isSuccess) return
    if (!user) return navigate("/page-not-found")
  }, [isSuccess, user])

  if (isLoading) return "Loading..."

  return (
    <>
      <div className="bg-card">
        <ProfileInfo className="container px-0" user={user} />
        <ProfileMenu className="container sticky top-[56px] px-4" />
      </div>
      <Outlet />
    </>
  )
}
