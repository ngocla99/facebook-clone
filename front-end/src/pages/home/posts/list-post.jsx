import { getAllPostApi } from "@/api/services/post"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { List } from "@/components/list"

import { Post } from "./components/post/post"

export const ListPost = ({ className }) => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPostApi,
    select: ({ data }) => data,
  })
  console.log("🚀 ~ Post ~ select:", posts)

  return (
    <List
      className={cn("grid gap-4", className)}
      items={posts ?? []}
      propName="post"
      Item={Post}
    />
  )
}
