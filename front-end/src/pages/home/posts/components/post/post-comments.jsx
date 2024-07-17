import React from "react"
import { deleteCommentApi } from "@/api/services/comment"
import { useCommentState } from "@/stores/use-comment-state"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { cn, getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { confirm } from "@/components/confirm"
import { List } from "@/components/list"
import { TimeFromNow } from "@/components/time-from-now"
import { Dots } from "@/assets/svg"

import { CommentForm } from "../create-comment/comment-form"
import { CommentActions } from "./comment-actions"

export const PostComments = ({ postId, comments, className }) => {
  return (
    <div className={cn("grid gap-1", className)}>
      {comments.map((itm) => (
        <Comment key={itm._id} postId={postId} comment={itm} />
      ))}
      <CommentState />
    </div>
  )
}

const Comment = ({ postId, comment }) => {
  const { _id, commentBy, image, text, updatedAt } = comment
  const [isEdit, setIsEdit] = React.useState(false)

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
      subtitle: "Are you sure you want to delete this comment?",
      confirmText: "Delete",
      cancelText: "No",
      onConfirm: () => deleteCommentMutation.mutate(_id),
    })
  }

  const handleEditComment = () => {
    setIsEdit(true)
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
      {isEdit ? (
        <div className="flex-1">
          <CommentForm
            postId={postId}
            comment={comment}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
          <p className="my-1 text-xs leading-none text-muted-foreground">
            Press Esc to{" "}
            <span
              onClick={() => setIsEdit(false)}
              className="cursor-pointer text-primary hover:underline hover:underline-offset-1"
            >
              cancel.
            </span>
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-1">
          <div className="flex gap-1">
            <div className="space-y-0.5 rounded-[18px] bg-background-comment px-3 py-2">
              <p className="text-[13px] font-semibold leading-[14px]">
                {commentBy.firstName + " " + commentBy.lastName}
              </p>
              <p className="text-[15px] leading-5">{text}</p>
            </div>
            <CommentActions
              onDelete={handleDeleteComment}
              onEdit={handleEditComment}
            />
          </div>
          {image && (
            <img
              className="h-[200px] rounded-[18px] border border-border object-cover"
              src={image}
              alt="Photo Comment"
            />
          )}
          <div className="ml-3 flex gap-4 text-xs text-muted-foreground">
            <TimeFromNow type="short" time={updatedAt} />
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

export const CommentState = ({ className }) => {
  const queryClient = useQueryClient()
  const { data: me } = queryClient.getQueryData(["me"])
  const commentState = useCommentState()

  if (commentState.isError) return <p>Something went wrong...</p>
  if (commentState.isLoading)
    return (
      <div className={cn("group flex gap-2", className)}>
        <Avatar className="size-8">
          <AvatarImage
            src={me.picture}
            alt={me.firstName + " " + me.lastName}
          />
          <AvatarFallback>{getInitialsName(me)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start gap-0.5">
          <div className="flex gap-1">
            <div className="space-y-0.5 rounded-[18px] bg-background-comment px-3 py-2">
              <p className="text-[13px] font-semibold leading-[14px]">
                {me.firstName + " " + me.lastName}
              </p>
              <p className="text-[15px] leading-5">{commentState.text}</p>
            </div>
            <Button
              className="hidden size-8 self-center text-muted-foreground group-hover:flex"
              variant="ghost"
              size="icon"
            >
              <Dots className="size-4" />
            </Button>
          </div>

          <p className="ml-3 text-xs leading-none text-muted-foreground">
            Posting...
          </p>
        </div>
      </div>
    )

  return null
}
