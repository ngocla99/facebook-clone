import React from "react"
import { getAllPostApi } from "@/api/services/post"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { List } from "@/components/list"

import { Post } from "./components/post/post"
import { usePostModal } from "./components/post/post-modal"

export const ListPost = ({ className }) => {
  const [selectedPost, setSelectedPost] = React.useState()
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPostApi,
    select: ({ data }) => data,
  })

  const { setShowPostModal, PostModal } = usePostModal({
    id: selectedPost?._id,
  })

  return (
    <>
      <div className={cn("grid gap-4", className)}>
        {(posts ?? []).map((post) => (
          <Post
            key={post._id}
            post={post}
            onEdit={() => {
              setShowPostModal(true)
              setSelectedPost(post)
            }}
          />
        ))}
        <PostModal />
      </div>
    </>
  )
}
