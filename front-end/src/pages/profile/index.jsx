import React from "react"
import { getProfileApi } from "@/api/services/user"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"

import { getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus } from "@/assets/svg"

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
    <div className="container">
      <div className="relative overflow-hidden rounded-bl-lg rounded-br-lg bg-background-comment hover:bg-hover">
        <div className="pt-[38%]"></div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-end bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.6)] px-5 py-[22px]">
          <Button
            className="mx-3 gap-2 bg-white text-[15px] font-semibold hover:bg-background-comment"
            variant="secondary"
          >
            <i className="camera_filled_icon"></i>
            Add cover photo
          </Button>
        </div>
      </div>
      <div className="bg-white px-4">
        <div className="flex gap-3">
          <div className="-mt-[84px]">
            <Avatar className="size-[176px] cursor-pointer rounded-full border border-border bg-white shadow-[0_0_0_4px_white]">
              <AvatarImage src={user.picture} alt={user.username} />
              <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="grid flex-1 grid-cols-2 pb-4 pt-8">
            <h3 className="text-[32px] font-bold">
              {user.firstName + " " + user.lastName}
            </h3>
            <div className="flex justify-end gap-2">
              <Button>
                <Plus className="mr-1.5 size-4" />
                Add to story
              </Button>
              <Button variant="secondary">
                <i className="edit_icon_16 filter-primary-icon mr-1.5"></i>
                Edit profile
              </Button>
              <Button variant="secondary" className="w-[48px]">
                <i className="arrow_up_icon filter-primary-icon"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
