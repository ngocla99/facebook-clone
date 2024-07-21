import { uploadImageApi } from "@/api/services/image"
import { createPostApi } from "@/api/services/post"
import { usePostCreateModal } from "@/stores"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { postSchema } from "@/lib/validations/post"
import { Modal } from "@/components/ui/modal"

import { PostForm } from "./post-form"

export const CreatePostModal = () => {
  const queryClient = useQueryClient()
  const { data: user } = queryClient.getQueryData(["me"])
  const postCreateModal = usePostCreateModal()

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      text: "",
      audience: "EVERYONE",
      images: [],
      background: null,
    },
  })

  const createPostMutation = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      postCreateModal.onClose()
      // Invalidates cache and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const uploadImageMutation = useMutation({
    mutationFn: uploadImageApi,
    onSuccess: ({ data }) => {
      createPostMutation.mutate({ ...form.getValues(), images: data })
    },
  })

  const onSubmit = (data) => {
    if (createPostMutation.isPending || uploadImageMutation.isPending) return
    if (data.images.length > 0) {
      const path = `${user.username}/post_images`
      const formData = new FormData()
      formData.append("path", path)
      data.images.forEach((image) => {
        formData.append("files", image)
      })
      return uploadImageMutation.mutate(formData)
    }
    createPostMutation.mutate(data)
  }

  return (
    <Modal
      className="w-auto p-0 sm:w-[500px]"
      showModal={postCreateModal.isOpen}
      onClose={() => postCreateModal.onClose()}
      enableCloseBtn={false}
      onInteractOutside={(e) => {
        if (createPostMutation.isPending || uploadImageMutation.isPending)
          e.preventDefault()
      }}
    >
      <PostForm
        form={form}
        isLoading={
          createPostMutation.isPending || uploadImageMutation.isPending
        }
        onSubmit={onSubmit}
        onClose={() => postCreateModal.onClose()}
      />
    </Modal>
  )
}
