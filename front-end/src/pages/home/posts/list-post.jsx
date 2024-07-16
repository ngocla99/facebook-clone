import { getAllPostApi } from "@/api/services/post"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"

import { Post } from "./components/post/post"
import { PostModal } from "./components/post/post-modal"

export const ListPost = ({ className }) => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPostApi,
    select: ({ data }) => data,
  })

  return (
    <>
      <div className={cn("grid gap-4", className)}>
        {(posts ?? []).map((post) => (
          <Post key={post._id} post={post} />
        ))}
        <PostModal />
      </div>
    </>
  )
}
