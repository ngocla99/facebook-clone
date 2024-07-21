import React from "react"
import moment from "moment"

import { cn, getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dots } from "@/assets/svg"

import { CreateComment } from "../comment/create-comment"
import { PostActions } from "./post-actions"
import { PostComments } from "./post-comments"
import { PostStats } from "./post-stats"

export const Post = ({ isDialog, post }) => {
  const { text, user, background, images, audience, createdAt } = post

  const [isPortraitFirstImg, setIsPortraitFirstImg] = React.useState()
  const [isUpload, setIsUpload] = React.useState(false)

  let styleBg = { background: "transparent" }
  if (background) {
    if (background.includes("#")) {
      styleBg = { background }
    } else {
      styleBg = { backgroundImage: `url(${background.replace(".", "xl.")})` }
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <ScrollArea
          className={cn(
            "h-auto",
            isDialog && "h-[70vh]",
            isDialog && isUpload && "h-[60vh]"
          )}
        >
          <div className="flex items-center gap-2 px-4 py-3">
            <Avatar>
              <AvatarImage src={user.picture} alt={user.username} />
              <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-[15px] font-semibold leading-5">{`${user.firstName} ${user.lastName}`}</p>
              <div className="flex items-center gap-1">
                <p className="text-[13px] leading-4 text-muted-foreground">
                  {moment(createdAt).fromNow()}
                </p>
                <span className="leading-4"> · </span>
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
                "flex h-[476px] items-center justify-center text-[30px] font-bold text-white",
              background?.includes("avatar") && "h-[500px]"
            )}
            style={{ ...styleBg }}
          >
            <p className="">{text}</p>
          </div>
          <div
            className={cn(
              "group grid gap-[2px]",
              images.length === 1 && "grid-cols-1",
              images.length === 2 &&
                isPortraitFirstImg &&
                "max-h-[339px] grid-cols-2",
              images.length === 2 &&
                !isPortraitFirstImg &&
                "h-[680px] grid-rows-2",
              images.length === 3 &&
                !isPortraitFirstImg &&
                "h-[680px] grid-cols-2 grid-rows-3 [&>img:first-child]:col-span-2 [&>img:first-child]:row-span-2",
              images.length === 3 &&
                isPortraitFirstImg &&
                "h-[680px] grid-cols-3 grid-rows-2 [&>img:first-child]:col-span-2 [&>img:first-child]:row-span-2",
              images.length === 4 &&
                !isPortraitFirstImg &&
                "h-[680px] grid-cols-3 grid-rows-3 [&>img:first-child]:col-span-3 [&>img:first-child]:row-span-2",
              images.length === 4 &&
                isPortraitFirstImg &&
                "h-[680px] grid-cols-3 grid-rows-3 [&>img:first-child]:col-span-2 [&>img:first-child]:row-span-3",
              images.length >= 5 &&
                "h-[680px] grid-cols-2 grid-rows-6 [grid-template-areas:'img1_img3''img1_img3''img1_img4''img2_img4''img2_img5''img2_img5'] [&>div:nth-child(5)]:[grid-area:img5] [&>img:nth-child(1)]:[grid-area:img1] [&>img:nth-child(2)]:[grid-area:img2] [&>img:nth-child(3)]:[grid-area:img3] [&>img:nth-child(4)]:[grid-area:img4]"
            )}
          >
            {images.slice(0, 4).map(({ url }) => (
              <img
                key={url}
                className="h-full w-full shrink-0 object-cover"
                src={url}
                alt="Post Photo"
              />
            ))}
            {images.length >= 5 && (
              <div className="relative">
                <img
                  className="h-full w-full shrink-0 object-cover"
                  src={images[4].url}
                  alt="Post Photo"
                />
                {images.length > 5 && (
                  <div className="absolute inset-0 grid place-items-center bg-hover-media">
                    <p className="text-3xl font-bold text-white">
                      +{images.length - 5}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={cn("px-4")}>
            <PostStats post={post} className="border-b border-border" />
            <PostActions postId={post._id} />
            {isDialog && (
              <PostComments
                postId={post._id}
                comments={post.comments}
                className="border-t border-border pb-2 pt-[5px]"
              />
            )}
          </div>
        </ScrollArea>
        {isDialog && (
          <div className="grid grid-cols-[auto_1fr] gap-1.5 border-t border-border px-4 py-5">
            <Avatar>
              <AvatarImage src={user.picture} alt={user.username} />
              <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
            </Avatar>
            <CreateComment postId={post._id} setIsUpload={setIsUpload} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
