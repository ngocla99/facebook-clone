import { getAllPostApi } from "@/api/services/post"
import { useQuery } from "@tanstack/react-query"

import { CreatePost } from "@/components/posts/create-post"
import { ListPost } from "@/components/posts/list-post"

export const HomePosts = () => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPostApi,
    select: ({ data }) => data,
  })

  return (
    <>
      <CreatePost />
      <ListPost posts={posts} />
    </>
  )
}
