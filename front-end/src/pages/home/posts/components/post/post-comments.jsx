import { useCommentState } from "@/stores"

import { cn } from "@/lib/utils"

import { Comment } from "../comment/comment"
import { CommentState } from "../comment/comment-state"

export const PostComments = ({ postId, comments, className }) => {
  const commentState = useCommentState()
  return (
    <div className={cn("grid gap-1", className)}>
      {comments.map((itm) => (
        <Comment key={itm._id} postId={postId} comment={itm} />
      ))}
      {!commentState.isEdit && <CommentState />}
    </div>
  )
}
