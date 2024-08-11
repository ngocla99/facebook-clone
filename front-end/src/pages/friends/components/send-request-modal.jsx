import React from "react"
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

export const SendRequestModal = () => {
  const [showRequestModal, setShowRequestModal] = React.useState(false)

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
          <DialogTitle className="leading-9">Select audience</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="py-10 text-center">
          <p className="text-xs leading-none text-muted-foreground">When you send someone a friend request, it will appear here.</p>
        </div>

        {/* <ScrollArea className="h-[380px] px-2">
          <p className="mt-3 px-2 text-lg font-semibold">1 Sent Request</p>
          <div className="mt-3 grid">
            <Link
              to="ro"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "h-auto justify-start gap-3 p-2",
                })
              )}
            >
              <Avatar className="size-[60px]">
                <AvatarImage src="" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <p className="font-semibold">Ngoclias</p>
              <Button
                className="z-[1] ml-auto w-[174px]"
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                Cancel request
              </Button>
            </Link>
          </div>
        </ScrollArea> */}
      </Modal>
    </>
  )
}
