import React, { useCallback, useMemo } from "react"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"

import { Post } from "./post"

const PostModalHelper = ({ showPostModal, setShowPostModal, props }) => {
  return (
    <Modal
      className="w-auto p-0 sm:min-w-[700px]"
      showModal={showPostModal}
      setShowModal={setShowPostModal}
    >
      <DialogHeader className="flex h-[60px] items-center justify-center border-b border-border">
        <DialogTitle className="text-xl font-bold">
          {props.post.user.first_name}'s Post
        </DialogTitle>
      </DialogHeader>
      <Post post={props.post} isDialog />
    </Modal>
  )
}

export const usePostModal = (props) => {
  const [showPostModal, setShowPostModal] = React.useState(false)

  const PostModal = useCallback(() => {
    return (
      <PostModalHelper
        showPostModal={showPostModal}
        setShowPostModal={setShowPostModal}
        props={props}
      />
    )
  }, [showPostModal, setShowPostModal])

  return useMemo(
    () => ({ showPostModal, setShowPostModal, PostModal }),
    [showPostModal, setShowPostModal, PostModal]
  )
}
