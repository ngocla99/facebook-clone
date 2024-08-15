import { ProfileInfo } from "@/pages/profile/components/profile-info"
import { ProfileMenu } from "@/pages/profile/components/profile-menu"
import { Outlet, useParams } from "react-router-dom"

import { cn } from "@/lib/utils"

import { EmptyFriend } from "../components/empty-friend"

export const Right = ({ className }) => {
  const { username } = useParams()

  if (!username) {
    return (
      <div className={cn("", className)}>
        <EmptyFriend title="Select people's names to preview their profile." />
      </div>
    )
  }

  return (
    <>
      <div className="bg-card">
        <ProfileInfo className="container px-0" />
        <ProfileMenu className="container sticky top-[56px] px-4" />
      </div>
      <Outlet />
    </>
  )
}
