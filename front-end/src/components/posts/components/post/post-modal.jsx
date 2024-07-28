import { getPostApi } from "@/api/services/post"
import { usePostModal } from "@/stores"
import { useQuery } from "@tanstack/react-query"

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"

import { Post } from "./post"

export const PostModal = () => {
  const postModal = usePostModal()

  const { data: post } = useQuery({
    queryKey: ["posts", postModal.postId],
    queryFn: () => getPostApi(postModal.postId),
    select: ({ data }) => data,
    enabled: postModal.isOpen,
  })

  if (!post) return null

  return (
    <Modal
      className="w-auto p-0 drop-shadow sm:min-w-[700px]"
      showModal={postModal.isOpen}
      onClose={postModal.onClose}
      onEscapeKeyDown={(event) => event.preventDefault()}
    >
      <DialogHeader className="flex h-[60px] items-center justify-center border-b border-border">
        <DialogTitle className="text-xl font-bold">
          {post?.user?.firstName}'s Post
        </DialogTitle>
        <DialogDescription className="hidden">
          Post Description
        </DialogDescription>
      </DialogHeader>
      <Post post={post} isDialog />
    </Modal>
  )
}
