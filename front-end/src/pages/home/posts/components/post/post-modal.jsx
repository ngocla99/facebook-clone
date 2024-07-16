import React, { useCallback, useMemo } from "react"
import { getPostApi } from "@/api/services/post"
import { useMutation, useQuery } from "@tanstack/react-query"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"

import { Post } from "./post"

const PostModalHelper = ({ showPostModal, setShowPostModal, post }) => {
  return (
    <Modal
      className="w-auto p-0 sm:min-w-[700px]"
      showModal={showPostModal}
      setShowModal={setShowPostModal}
    >
      <DialogHeader className="flex h-[60px] items-center justify-center border-b border-border">
        <DialogTitle className="text-xl font-bold">
          {post.user.first_name}'s Post
        </DialogTitle>
      </DialogHeader>
      <Post post={post} isDialog />
    </Modal>
  )
}

export const usePostModal = (props) => {
  const [showPostModal, setShowPostModal] = React.useState(false)

  const { data: post } = useQuery({
    queryKey: ["posts", props?.id],
    queryFn: () => getPostApi(props?.id),
    select: ({ data }) => data,
    enabled: showPostModal,
    placeholderData: (previousData) => previousData,
  })

  console.log("🚀 ~ usePostModal ~ post:", post)
  const PostModal = useCallback(() => {
    if (!post) return null

    return (
      <PostModalHelper
        showPostModal={showPostModal}
        setShowPostModal={setShowPostModal}
        post={post}
      />
    )
  }, [post, showPostModal, setShowPostModal])

  return useMemo(
    () => ({ showPostModal, setShowPostModal, PostModal }),
    [showPostModal, setShowPostModal, PostModal]
  )
}
