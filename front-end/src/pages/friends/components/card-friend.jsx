import {
  acceptFriendRequestApi,
  removeFriendRequestApi,
} from "@/api/services/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const CardFriend = ({ className, friend }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const acceptFriendRequestMutation = useMutation({
    mutationFn: acceptFriendRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends-page-info"] })
    },
  })

  const removeFriendRequestMutation = useMutation({
    mutationFn: removeFriendRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends-page-info"] })
    },
  })

  const acceptFriendRequest = () => {
    if (acceptFriendRequestMutation.isPending) return
    acceptFriendRequestMutation.mutate(friend._id)
  }

  const removeFriendRequest = () => {
    if (removeFriendRequestMutation.isPending) return
    removeFriendRequestMutation.mutate(friend._id)
  }

  return (
    <Card
      className={cn("overflow-hidden shadow", className)}
      onClick={() => navigate(`requests/${friend.username}`)}
    >
      <CardContent className="relative p-0">
        <img
          src={friend.picture}
          alt={friend.username}
          className="aspect-square w-full object-cover"
        />
        <div className="mx-3 space-y-2 overflow-hidden border-t border-border pb-3 pt-2">
          <p className="whitespace-nowrap text-lg font-semibold leading-none">
            {friend.firstName} {friend.lastName}
          </p>
          <div className="flex items-center gap-1">
            <p className="h-[15px] whitespace-nowrap leading-none text-muted-foreground">
              {/* 42 mutual friends */}
            </p>
          </div>
          <Button
            className={cn(
              "w-full",
              (acceptFriendRequestMutation.isPending ||
                removeFriendRequestMutation.isPending) &&
                "opacity-0"
            )}
            onClick={(e) => {
              e.preventDefault()
              acceptFriendRequest()
            }}
          >
            Confirm
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={(e) => {
              e.preventDefault()
              removeFriendRequest
            }}
            disabled={acceptFriendRequestMutation.isPending}
          >
            {acceptFriendRequestMutation.isPending
              ? removeFriendRequestMutation.isPending
                ? "Request Deleted"
                : "Request accepted"
              : "Delete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
