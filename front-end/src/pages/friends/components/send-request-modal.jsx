import React from "react"
import { cancelFriendRequestApi } from "@/api/services/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"
import { ScrollArea } from "@/components/ui/scroll-area"

export const SendRequestModal = ({ friends }) => {
  const queryClient = useQueryClient()
  const [showRequestModal, setShowRequestModal] = React.useState(false)

  const cancelFriendRequestMutation = useMutation({
    mutationFn: cancelFriendRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends-page-info"] })
    },
  })

  const cancelFriendRequest = (id) => {
    if (cancelFriendRequestMutation.isPending) return
    cancelFriendRequestMutation.mutate(id)
  }

  return (
    <>
      <button
        className="text-sm text-primary"
        onClick={() => setShowRequestModal(true)}
      >
        View sent requests
      </button>
      <Modal
        className="w-auto p-0 sm:w-[548px]"
        showModal={showRequestModal}
        onClose={() => setShowRequestModal(false)}
      >
        <DialogHeader className="flex-rows relative items-center space-y-0 border-b border-border px-4 py-3 text-center">
          <DialogTitle className="leading-9">Sent Requests</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {friends.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-xs leading-none text-muted-foreground">
              When you send someone a friend request, it will appear here.
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[380px] px-2">
            <p className="mt-3 px-2 text-lg font-semibold">1 Sent Request</p>
            <div className="mt-3 grid">
              {friends.map((friend) => (
                <Link
                  key={friend._id}
                  to={`/profile/${friend.username}`}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      className: "h-auto justify-start gap-3 p-2",
                    })
                  )}
                >
                  <Avatar className="size-[60px]">
                    <AvatarImage src={friend.picture} alt={friend.username} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">
                    {friend.firstName} {friend.lastName}
                  </p>
                  <Button
                    className="z-[1] ml-auto w-[174px]"
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault()
                      cancelFriendRequest(friend._id)
                    }}
                  >
                    Cancel request
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
        )}
      </Modal>
    </>
  )
}
