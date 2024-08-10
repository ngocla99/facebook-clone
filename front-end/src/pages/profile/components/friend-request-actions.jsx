import {
  acceptFriendRequestApi,
  removeFriendRequestApi,
} from "@/api/services/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { cn } from "@/lib/utils"
import { useProfile } from "@/hooks/use-profile"
import { Button } from "@/components/ui/button"

export const FriendRequestActions = ({ className }) => {
  const queryClient = useQueryClient()
  const { username } = useParams()
  const { data: user } = useProfile(username)

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["user", username] })
  }

  const removeFriendRequestMutation = useMutation({
    mutationFn: removeFriendRequestApi,
    onSuccess: invalidateQueries,
  })

  const acceptFriendRequestMutation = useMutation({
    mutationFn: acceptFriendRequestApi,
    onSuccess: invalidateQueries,
  })

  const acceptFriendRequest = () => {
    if (acceptFriendRequestMutation.isPending) return
    acceptFriendRequestMutation.mutate(user._id)
  }

  const removeFriendRequest = () => {
    if (removeFriendRequestMutation.isPending) return
    removeFriendRequestMutation.mutate(user._id)
  }

  if (!user.isVisitor || !user.friendship.requestReceived) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg bg-card-flat p-4",
        className
      )}
    >
      <p className="text-lg font-semibold">
        {user.firstName} sent you a friend request
      </p>
      <div className="space-x-2">
        <Button onClick={acceptFriendRequest}>Confirm request</Button>
        <Button variant="secondary" onClick={removeFriendRequest}>
          Delete request
        </Button>
      </div>
    </div>
  )
}
