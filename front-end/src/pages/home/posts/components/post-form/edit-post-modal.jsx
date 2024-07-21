import React from "react"
import { uploadImageApi } from "@/api/services/image"
import { updatePostApi } from "@/api/services/post"
import { usePostEditModal } from "@/stores"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { postSchema } from "@/lib/validations/post"
import { Modal } from "@/components/ui/modal"

import { PostForm } from "./post-form"

export const EditPostModal = () => {
  const queryClient = useQueryClient()
  const { data: user } = queryClient.getQueryData(["me"])
  const postEditModal = usePostEditModal()

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      text: "",
      audience: "EVERYONE",
      images: [],
      background: null,
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: updatePostApi,
    onSuccess: () => {
      postEditModal.onClose()
      // Invalidates cache and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const uploadImageMutation = useMutation({
    mutationFn: uploadImageApi,
    onSuccess: ({ data }) => {
      updatePostMutation.mutate({
        ...form.getValues(),
        images: data,
        id: postEditModal.post._id,
      })
    },
  })

  React.useEffect(() => {
    form.reset(postEditModal.post, { keepDefaultValues: true })
  }, [postEditModal.post])

  const onSubmit = (data) => {
    if (updatePostMutation.isPending || uploadImageMutation.isPending) return
    if (data.images.length > 0) {
      const path = `${user.username}/post_images`
      const formData = new FormData()
      formData.append("path", path)
      data.images.forEach((image) => {
        formData.append("files", image)
      })
      return uploadImageMutation.mutate(formData)
    }
    updatePostMutation.mutate({ ...data, id: postEditModal.post._id })
  }

  return (
    <Modal
      className="w-auto p-0 sm:w-[500px]"
      showModal={postEditModal.isOpen}
      onClose={() => postEditModal.onClose()}
      enableCloseBtn={false}
      onInteractOutside={(e) => {
        if (updatePostMutation.isPending || uploadImageMutation.isPending)
          e.preventDefault()
      }}
    >
      <PostForm
        openBy={postEditModal.openBy}
        form={form}
        isEdit={true}
        isLoading={
          updatePostMutation.isPending || uploadImageMutation.isPending
        }
        onSubmit={onSubmit}
        onClose={() => postEditModal.onClose()}
      />
    </Modal>
  )
}
