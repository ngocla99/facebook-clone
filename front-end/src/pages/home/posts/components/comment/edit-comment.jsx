import React from "react"
import { updateCommentApi } from "@/api/services/comment"
import { uploadImageApi } from "@/api/services/image"
import { useCommentState } from "@/stores/use-comment-state"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { commentSchema } from "@/lib/validations/comment"

import { CommentForm } from "./comment-form"

export const EditComment = ({ postId, comment, onHideEditComment }) => {
  const queryClient = useQueryClient()
  const commentState = useCommentState()
  const { data: user } = queryClient.getQueryData(["me"])
  const [isEditing, setIsEditing] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: "",
      images: [],
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: updateCommentApi,
    onSuccess: () => {
      setIsEditing(false)
      onHideEditComment()
      commentState.onSuccess()
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (err) => {
      setIsEditing(false)
      onHideEditComment()
      commentState.onError()
    },
  })

  const uploadImageMutation = useMutation({
    mutationFn: uploadImageApi,
    onSuccess: ({ data }) => {
      updateCommentMutation.mutate({
        id: comment._id,
        text: commentState.text,
        image: data[0].url,
      })
    },
  })

  React.useEffect(() => {
    form.reset(
      { text: comment.text, images: comment.image ? [comment.image] : [] },
      { keepDefaultValues: true }
    )
  }, [comment])

  const onSubmit = (data) => {
    if (isEditing) return

    setIsEditing(true)
    commentState.mutate({ text: data.text })
    form.reset()

    if (data.images.length > 0 && typeof data.images[0] !== "string") {
      createCommentWithImage(data.images)
    } else {
      updateCommentMutation.mutate({ id: comment._id, text: data.text })
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
    <>
      {isEditing ? (
        <div className="flex flex-col items-start gap-0.5">
          <div className="space-y-0.5 rounded-[18px] bg-background-comment px-3 py-2">
            <p className="text-[13px] font-semibold leading-[14px]">
              {user.firstName + " " + user.lastName}
            </p>
            <p className="text-[15px] leading-5">{commentState.text}</p>
          </div>

          <p className="ml-3 text-xs leading-none text-muted-foreground">
            Posting...
          </p>
        </div>
      ) : (
        <div className="flex-1">
          <CommentForm form={form} onSubmit={onSubmit} />
          <p className="my-1 text-xs leading-none text-muted-foreground">
            Press Esc to{" "}
            <span
              onClick={onHideEditComment}
              className="cursor-pointer text-primary hover:underline hover:underline-offset-1"
            >
              cancel.
            </span>
          </p>
        </div>
      )}
    </>
  )
}
