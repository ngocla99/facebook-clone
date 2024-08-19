import {
  acceptFriendRequestApi,
  getFriendsPageInfoApi,
  removeFriendRequestApi,
} from "@/api/services/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"

import { cn, getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Return } from "@/assets/svg"

import { SendRequestModal } from "../components/send-request-modal"

export const Left = ({ className }) => {
  const { username } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const acceptFriendRequestMutation = useMutation({
    mutationFn: acceptFriendRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends-page-info"] })
      queryClient.invalidateQueries({ queryKey: ["user", username] })
    },
  })

  const removeFriendRequestMutation = useMutation({
    mutationFn: removeFriendRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends-page-info"] })
    },
  })

  const acceptFriendRequest = (id) => {
    if (acceptFriendRequestMutation.isPending) return
    acceptFriendRequestMutation.mutate(id)
  }

  const removeFriendRequest = (id) => {
    if (removeFriendRequestMutation.isPending) return
    removeFriendRequestMutation.mutate(id)
  }

  const { data: friendsInfo, isLoading } = useQuery({
    queryKey: ["friends-page-info"],
    queryFn: getFriendsPageInfoApi,
  })

  if (isLoading) return "Loading..."

  return (
    <div className={cn("pt-5", className)}>
      <div className="flex items-center gap-2 px-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-9 text-muted-foreground"
          onClick={() => navigate("/friends")}
        >
          <Return />
        </Button>
        <div className="">
          <p className="text-sm text-muted-foreground">Friends</p>
          <h3 className="text-[24px] font-bold leading-none">
            Friend Requests
          </h3>
        </div>
      </div>
      <div className="mt-2 px-2">
        <div className="px-2">
          <p className="text-lg font-semibold">
            {friendsInfo.requests.length || ""} Friend Requests
          </p>
          <SendRequestModal friends={friendsInfo.sentRequests} />
        </div>
        {friendsInfo.requests.length ? (
          <div className="mt-3 grid">
            {friendsInfo.requests.map((friend) => (
              <Link
                key={friend._id}
                to={`/friends/requests/${friend.username}`}
                className={cn(
                  buttonVariants({
                    variant:
                      username === friend.username ? "secondary" : "ghost",
                    className: "flex h-auto justify-start gap-3 px-2 py-[10px]",
                  })
                )}
              >
                <Avatar className="size-[60px]">
                  <AvatarImage src={friend.picture} alt={friend.username} />
                  <AvatarFallback>{getInitialsName(friend)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="">{`${friend.firstName} ${friend.lastName}`}</p>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        acceptFriendRequest(friend._id)
                      }}
                      className="z-10"
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={(e) => {
                        e.preventDefault()
                        removeFriendRequest(friend._id)
                      }}
                      className="z-10"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <p className="text-sm leading-none text-muted-foreground">
              No new requests
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
