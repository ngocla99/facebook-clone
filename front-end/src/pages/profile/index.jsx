import React from "react"
import { getProfileApi } from "@/api/services/user"
import { useMe } from "@/hooks"
import { useProfileUser } from "@/stores"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"

import { ProfileInfo } from "./components/profile-info"
import { ProfileMenu } from "./components/profile-menu"
import { ProfilePosts } from "./profile-posts"

const Profile = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  const { mutate } = useProfileUser()

  const { data: me } = useMe()

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
    if (!isSuccess) return
    if (!user) return navigate("/page-not-found")

    mutate({ user: { ...user, isVisitor: user._id !== me?._id } })
  }, [isSuccess, user])

  if (isLoading) return "Loading..."

  return (
    <>
      <div className="bg-card">
        <ProfileInfo className="container px-0" user={user} />
        <ProfileMenu className="container sticky top-[56px] px-4" />
      </div>
      <ProfilePosts className="container mt-4 px-4" />
    </>
  )
}

export default Profile
