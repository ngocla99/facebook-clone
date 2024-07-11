import { getAllPostApi } from "@/api/services/post"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"

import { Post } from "./components/post/post"

export const ListPost = ({ className }) => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPostApi,
    select: ({ data }) => data,
  })
  console.log("🚀 ~ Post ~ select:", posts)

  return (
    <div className={cn("grid gap-4", className)}>
      {(posts ?? []).map((post, idx) => (
        <Post key={idx} post={post} />
      ))}
    </div>
  )
}
