import React from "react"
import { getProfileApi } from "@/api/services/user"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"

import { getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "@/assets/svg"

import { ProfileInfo } from "./components/profile-info"
import { ProfileMenu } from "./components/profile-menu"

const Profile = () => {
  const { username } = useParams()
  const navigate = useNavigate()

  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getProfileApi(username),
    select: ({ data }) => data,
  })

  React.useEffect(() => {
    if (isSuccess && !user) return navigate("/page-not-found")
  }, [isSuccess, user])

  if (isLoading) return "Loading..."

  return (
    <div className="bg-card">
      <ProfileInfo user={user} />
      <ProfileMenu />
    </div>
  )
}

export default Profile
