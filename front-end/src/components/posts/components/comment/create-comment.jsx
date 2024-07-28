import { createCommentApi } from "@/api/services/comment"
import { uploadImageApi } from "@/api/services/image"
import { useCommentState } from "@/stores"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { commentSchema } from "@/lib/validations/comment"

import { CommentForm } from "./comment-form"

export const CreateComment = ({ postId, setIsUpload }) => {
  const queryClient = useQueryClient()
  const commentState = useCommentState()
  const { data: user } = queryClient.getQueryData(["me"])

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: "",
      images: [],
    },
  })

  const createCommentMutation = useMutation({
    mutationFn: createCommentApi,
    onSuccess: () => {
      commentState.onSuccess()
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (err) => {
      commentState.onError()
    },
  })

  const uploadImageMutation = useMutation({
    mutationFn: uploadImageApi,
    onSuccess: ({ data }) => {
      createCommentMutation.mutate({
        text: commentState.text,
        image: data[0].url,
        post: postId,
      })
    },
  })

  const onSubmit = (data) => {
    if (createCommentMutation.isPending || uploadImageMutation.isPending) return

    commentState.mutate({ text: data.text })
    form.reset()

    if (data.images.length > 0) {
      createCommentWithImage(data.images)
    } else {
      createCommentMutation.mutate({ text: data.text, post: postId })
    }
  }

  const createCommentWithImage = (images) => {
    const path = `${user.username}/post_images/${postId}`
    const formData = new FormData()
    formData.append("path", path)
    images.forEach((image) => {
      formData.append("files", image)
    })
    uploadImageMutation.mutate(formData)
  }

  return (
    <CommentForm form={form} onSubmit={onSubmit} setIsUpload={setIsUpload} />
  )
}
