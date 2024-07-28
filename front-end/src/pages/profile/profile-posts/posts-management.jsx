import { getAllPostApi } from "@/api/services/post"
import { useProfileUser } from "@/stores"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreatePost } from "@/components/posts/create-post"
import { ListPost } from "@/components/posts/list-post"

export const PostManagement = ({ className }) => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPostApi,
    select: ({ data }) => data,
  })
  const { user } = useProfileUser()

  if (!user) return null
  return (
    <div className={className}>
      {!user?.isVisitor && <CreatePost />}
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between px-4 py-2">
            <h3 className="text-xl font-bold">Posts</h3>
            <div className="space-x-2">
              <Button variant="secondary">
                <i className="equalize_icon filter-primary-icon mr-1.5"></i>
                Filters
              </Button>
              {!user.isVisitor && (
                <Button variant="secondary">
                  <i className="manage_icon filter-primary-icon mr-1.5"></i>
                  Manage posts
                </Button>
              )}
            </div>
          </div>
          {!user.isVisitor && (
            <>
              <Separator />
              <Tabs defaultValue="list" className="px-4">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="list" className="h-10">
                    <i className="list_icon filter-secondary-icon group-data-[state=active]:filter-accent mr-1.5"></i>
                    List view
                  </TabsTrigger>
                  <TabsTrigger value="grid" className="group h-10">
                    <i className="grid_icon filter-secondary-icon group-data-[state=active]:filter-accent mr-1.5"></i>
                    Grid view
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </>
          )}
        </CardContent>
      </Card>
      <ListPost posts={posts} />
    </div>
  )
}
