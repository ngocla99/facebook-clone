import { getAllPostApi } from "@/api/services/post"
import { useQuery } from "@tanstack/react-query"
import moment from "moment"

import { cn, getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dots } from "@/assets/svg"

export const ListPost = ({ className }) => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPostApi,
    select: ({ data }) => data,
  })
  console.log("🚀 ~ Post ~ select:", posts)

  return (
    <div className={cn("grid gap-4", className)}>
      {(posts ?? []).map((post) => (
        <Post post={post} />
      ))}
    </div>
  )
}

const Post = ({ post }) => {
  const { text, user, background, audience, createdAt } = post

  let bgBox = "transparent"
  if (background) {
    bgBox = background?.includes("#")
      ? background
      : `url(${background.replace(".", "xl.")})`
  }
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex items-center gap-2 px-4 py-3">
          <Avatar>
            <AvatarImage src={user.picture} alt={user.username} />
            <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-[15px] font-semibold">{`${user.first_name} ${user.last_name}`}</p>
            <div className="flex items-center gap-1">
              <p className="text-[13px] text-muted-foreground">
                {moment(createdAt).fromNow()}
              </p>
              <span> · </span>
              {audience === "EVERYONE" && (
                <img
                  src="icons/12x12/public.png"
                  alt="Public"
                  className="filter-secondary-icon"
                />
              )}
              {audience === "FRIENDS" && (
                <img
                  src="icons/12x12/friends.png"
                  alt="Friends"
                  className="filter-secondary-icon"
                />
              )}
              {audience === "SELF" && (
                <img
                  src="icons/12x12/private.png"
                  alt="Only me"
                  className="filter-secondary-icon"
                />
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="size-9">
            <Dots className="filter-secondary-icon" />
          </Button>
        </div>
        <div
          className={cn(
            "bg-cover bg-no-repeat px-4 text-2xl font-normal",
            background &&
              "flex h-[360px] items-center justify-center text-[30px] font-bold text-white",
            background?.includes("avatar") && "h-[500px]"
          )}
          style={{
            background: bgBox,
          }}
        >
          <p className="">{text}</p>
        </div>
      </CardContent>
    </Card>
  )
}
