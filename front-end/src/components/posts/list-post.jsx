import { cn } from "@/lib/utils"

import { EmptyPost } from "./components/empty-post"
import { CreatePostModal } from "./components/post-form/create-post-modal"
import { EditPostAudienceModal } from "./components/post-form/edit-post-audience-modal"
import { EditPostModal } from "./components/post-form/edit-post-modal"
import { Post } from "./components/post/post"
import { PostModal } from "./components/post/post-modal"

export const ListPost = ({ posts, className }) => {
  return (
    <div className={cn("grid gap-4", className)}>
      {/* <EmptyPost /> */}
      {(posts ?? []).map((post) => (
        <Post key={post._id} post={post} />
      ))}
      <PostModal />
      <CreatePostModal />
      <EditPostModal />
      <EditPostAudienceModal />
    </div>
  )
}
