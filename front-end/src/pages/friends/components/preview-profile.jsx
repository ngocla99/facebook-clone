import { ProfileInfo } from "@/pages/profile/components/profile-info"
import { ProfileMenu } from "@/pages/profile/components/profile-menu"
import { Outlet, useParams } from "react-router-dom"

import { cn } from "@/lib/utils"
import { useProfile } from "@/hooks/use-profile"

import { EmptyFriend } from "../components/empty-friend"

export const PreviewProfile = ({ className }) => {
  const { username } = useParams()
  const { data: user } = useProfile(username)

  if (!username) {
    return (
      <div className={cn("", className)}>
        <EmptyFriend title="Select people's names to preview their profile." />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <div className="bg-card">
        <ProfileInfo className="container px-0" />
        <ProfileMenu />
      </div>
      <Outlet />
    </>
  )
}
