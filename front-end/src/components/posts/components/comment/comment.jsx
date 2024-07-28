import React from "react"
import { deleteCommentApi } from "@/api/services/comment"
import { useCommentState } from "@/stores"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { confirm } from "@/components/confirm"
import { TimeFromNow } from "@/components/time-from-now"

import { CommentActions } from "./comment-actions"
import { EditComment } from "./edit-comment"

export const Comment = ({ postId, comment }) => {
  const { _id, commentBy, image, text, createdAt } = comment
  const [showEditForm, setShowEditForm] = React.useState(false)
  const commentState = useCommentState()

  const queryClient = useQueryClient()

  const deleteCommentMutation = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const handleDeleteComment = () => {
    if (deleteCommentMutation.isPending) return
    confirm({
      title: "Delete Comment?",
      description: "Are you sure you want to delete this comment?",
      confirmText: "Delete",
      cancelText: "No",
      onConfirm: () => deleteCommentMutation.mutate(_id),
    })
  }

  const handleShowEditComment = () => {
    commentState.edit(true)
    setShowEditForm(true)
  }

  const handleHideEditComment = () => {
    commentState.edit(false)
    setShowEditForm(false)
  }

  return (
    <div className="group flex gap-2">
      <Avatar className="size-8">
        <AvatarImage
          src={commentBy.picture}
          alt={commentBy.firstName + " " + commentBy.lastName}
        />
        <AvatarFallback>{getInitialsName(commentBy)}</AvatarFallback>
      </Avatar>
      {showEditForm ? (
        <EditComment
          postId={postId}
          comment={comment}
          onHideEditComment={handleHideEditComment}
        />
      ) : (
        <div className="flex flex-col items-start gap-1">
          <div className="flex gap-1">
            <div className="space-y-0.5 rounded-[18px] bg-background-comment px-3 py-2">
              <p className="text-sm font-semibold leading-[14px]">
                {commentBy.firstName + " " + commentBy.lastName}
              </p>
              <p className="leading-5">{text}</p>
            </div>
            <CommentActions
              onDelete={handleDeleteComment}
              onEdit={handleShowEditComment}
            />
          </div>
          {image && (
            <img
              className="h-[200px] rounded-[18px] border border-border object-cover"
              src={image}
              alt="Photo Comment"
            />
          )}
          <div className="ml-3 flex gap-4 text-sm text-muted-foreground">
            <TimeFromNow type="short" time={createdAt} />
            <button className="font-bold hover:underline hover:underline-offset-1">
              Like
            </button>
            <button className="font-bold hover:underline hover:underline-offset-1">
              Reply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
