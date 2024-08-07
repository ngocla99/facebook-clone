import {
  acceptFriendRequestApi,
  cancelFriendRequestApi,
  followApi,
  removeFriendRequestApi,
  sendFriendRequestApi,
  unfollowApi,
  unfriendApi,
} from "@/api/services/user"
import { PopoverClose } from "@radix-ui/react-popover"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { useProfile } from "@/hooks/use-profile"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Loading } from "@/assets/svg"

export const FriendshipActions = () => {
  const queryClient = useQueryClient()
  const { username } = useParams()
  const { data: user } = useProfile(username)

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["user", username] })
  }

  const sendFriendRequestMutation = useMutation({
    mutationFn: sendFriendRequestApi,
    onSuccess: invalidateQueries,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["user", username] })
      const prevProfile = queryClient.getQueryData(["user", username])

      prevProfile.data.friendship = {
        friends: false,
        following: true,
        requestSent: true,
        requestReceived: false,
      }
      queryClient.setQueryData(["user", username], prevProfile)
    },
  })

  const cancelFriendRequestMutation = useMutation({
    mutationFn: cancelFriendRequestApi,
    onSuccess: invalidateQueries,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["user", username] })
      const prevProfile = queryClient.getQueryData(["user", username])

      prevProfile.data.friendship = {
        friends: false,
        following: false,
        requestSent: false,
        requestReceived: false,
      }
      queryClient.setQueryData(["user", username], prevProfile)
    },
  })

  const removeFriendRequestMutation = useMutation({
    mutationFn: removeFriendRequestApi,
    onSuccess: invalidateQueries,
  })

  const acceptFriendRequestMutation = useMutation({
    mutationFn: acceptFriendRequestApi,
    onSuccess: invalidateQueries,
  })

  const unfriendMutation = useMutation({
    mutationFn: unfriendApi,
    onSuccess: invalidateQueries,
  })

  const followMutation = useMutation({
    mutationFn: followApi,
    onSuccess: invalidateQueries,
  })

  const unfollowMutation = useMutation({
    mutationFn: unfollowApi,
    onSuccess: invalidateQueries,
  })

  const sendFriendRequest = () => {
    if (
      sendFriendRequestMutation.isPending ||
      cancelFriendRequestMutation.isPending
    )
      return
    sendFriendRequestMutation.mutate(user._id)
  }

  const cancelFriendRequest = () => {
    if (
      cancelFriendRequestMutation.isPending ||
      sendFriendRequestMutation.isPending
    )
      return
    cancelFriendRequestMutation.mutate(user._id)
  }

  const acceptFriendRequest = () => {
    if (acceptFriendRequestMutation.isPending) return
    acceptFriendRequestMutation.mutate(user._id)
  }

  const removeFriendRequest = () => {
    if (removeFriendRequestMutation.isPending) return
    removeFriendRequestMutation.mutate(user._id)
  }

  const unfriend = () => {
    if (unfriendMutation.isPending) return
    unfriendMutation.mutate(user._id)
  }

  const follow = () => {
    if (followMutation.isPending) return
    followMutation.mutate(user._id)
  }
  const unfollow = () => {
    if (unfollowMutation.isPending) return
    unfollowMutation.mutate(user._id)
  }

  if (!user) return null
  const { friendship } = user

  if (friendship.friends) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">
            <img
              src="/icons/friendship/friends.png"
              alt="add friend"
              className="mr-1.5"
            />
            Friends
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          alignOffset={48}
          className="grid p-2 shadow-3xl drop-shadow"
        >
          <Button variant="ghost" className="justify-start px-2">
            <img
              src="/icons/friendship/favorites.png"
              alt="favorites"
              className="mr-3"
            />
            Favorites
          </Button>
          <Button variant="ghost" className="justify-start px-2">
            <img
              src="/icons/friendship/editFriends.png"
              alt="edit friends"
              className="mr-3"
            />
            Edit Friend List
          </Button>
          {friendship.follow ? (
            <Button
              variant="ghost"
              className="justify-start px-2"
              onClick={follow}
            >
              <img
                src="/icons/friendship/follow.png"
                alt="follow"
                className="mr-3"
              />
              Follow
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="justify-start px-2"
              onClick={unfollow}
            >
              <img
                src="/icons/friendship/unfollow.png"
                alt="unfollow"
                className="mr-3"
              />
              Unfollow
            </Button>
          )}
          <Button
            variant="ghost"
            className="justify-start px-2"
            onClick={unfriend}
          >
            <i className="unfriend_outlined_icon mr-3"></i>
            Unfriend
          </Button>
        </PopoverContent>
      </Popover>
    )
  }

  if (friendship.requestReceived) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="gap-1.5">
            <img
              src="/icons/friendship/friends.png"
              alt="add friend"
              className="invert"
            />
            Respond
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          alignOffset={48}
          className="grid p-2 shadow-3xl drop-shadow"
        >
          <PopoverClose asChild>
            <Button
              variant="ghost"
              className="justify-start px-2"
              onClick={acceptFriendRequest}
            >
              Confirm
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              variant="ghost"
              className="justify-start px-2"
              onClick={removeFriendRequest}
            >
              Delete request
            </Button>
          </PopoverClose>
        </PopoverContent>
      </Popover>
    )
  }

  if (friendship.requestSent) {
    return (
      <Button onClick={cancelFriendRequest} className="w-[146px] gap-1.5">
        {sendFriendRequestMutation.isPending ? (
          <Loading className="size-4" />
        ) : (
          <img
            src="/icons/friendship/cancelRequest.png"
            alt="cancel request"
            className="invert"
          />
        )}
        Cancel request
      </Button>
    )
  }

  return (
    <Button onClick={sendFriendRequest} className="w-[120px] gap-1.5">
      {cancelFriendRequestMutation.isPending ? (
        <Loading className="size-4" />
      ) : (
        <img
          src="/icons/friendship/addFriend.png"
          alt="add friend"
          className="invert"
        />
      )}
      Add friend
    </Button>
  )
}
