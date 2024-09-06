import React from "react"
import { deletePostApi } from "@/api/services/post"
import { usePostEditAudienceModal, usePostEditModal } from "@/stores"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import moment from "moment"
import { useNavigate } from "react-router-dom"

import { cn, getInitialsName, isImageSrc } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import { confirm } from "@/components/confirm"

import { CreateComment } from "../comment/create-comment"
import { PostActionsMe } from "./post-actions-me"
import { PostActionsOther } from "./post-actions-other"
import { PostComments } from "./post-comments"
import { PostStats } from "./post-stats"
import { PostToolbar } from "./post-toolbar"

export const Post = ({ isDialog, post }) => {
  const { text, user, background, images, audience, createdAt } = post
  const queryClient = useQueryClient()
  const me = queryClient.getQueryData(["me"])
  const navigate = useNavigate()
  const [isPortraitFirstImg, setIsPortraitFirstImg] = React.useState()
  const [isUpload, setIsUpload] = React.useState(false)
  const postEditModal = usePostEditModal()
  const postEditAudienceModal = usePostEditAudienceModal()

  let styleBg = { background: "transparent" }
  if (background) {
    if (isImageSrc(background)) {
      styleBg = { backgroundImage: `url(${background.replace(".", "xl.")})` }
    } else {
      styleBg = { background }
    }
  }

  const deletePostMutation = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      toast({
        title: "Moving post to your trash",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              console.log("TODO:")
            }}
          >
            Go to trash
          </ToastAction>
        ),
      })
    },
  })

  const handleDeletePost = () => {
    confirm({
      title: "Move to your trash",
      description:
        "Items in your trash will be automatically deleted after 30 days. You can delete them from your trash earlier by going to activity log in settings.",
      confirmText: "Move",
      cancelText: "Cancel",
      onConfirm: () => {
        deletePostMutation.mutate(post._id)
      },
    })
  }

  const getAuthor = () => (user._id === me._id ? me : user)

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
            <Avatar
              className="cursor-pointer"
              onClick={() => navigate(`/profile/${getAuthor().username}`)}
            >
              <AvatarImage
                src={getAuthor().picture}
                alt={getAuthor().username}
              />
              <AvatarFallback>{getInitialsName(getAuthor())}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex leading-5">
                <p className="font-semibold">
                  {`${getAuthor().firstName} ${getAuthor().lastName}`}
                  {post.type === "PROFILE_PICTURE" && (
                    <span className="ml-1 font-normal text-muted-foreground">
                      update {me.gender === "MALE" ? "his" : "her"} profile
                      picture.
                    </span>
                  )}
                  {post.type === "COVER_PHOTO" && (
                    <span className="ml-1 font-normal text-muted-foreground">
                      update {me.gender === "MALE" ? "his" : "her"} cover photo.
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-sm leading-4 text-muted-foreground">
                  {moment(createdAt).fromNow()}
                </p>
                <span className="leading-4"> · </span>
                {audience === "EVERYONE" && (
                  <img
                    src="/icons/12x12/public.png"
                    alt="Public"
                    className="filter-secondary-icon"
                  />
                )}
                {audience === "FRIENDS" && (
                  <img
                    src="/icons/12x12/friends.png"
                    alt="Friends"
                    className="filter-secondary-icon"
                  />
                )}
                {audience === "SELF" && (
                  <img
                    src="/icons/12x12/private.png"
                    alt="Only me"
                    className="filter-secondary-icon"
                  />
                )}
              </div>
            </div>
            {!isDialog && (
              <>
                {me._id === user._id ? (
                  <PostActionsMe
                    postId={post._id}
                    onEditPost={() => postEditModal.onOpen(post)}
                    onEditAudience={() => postEditAudienceModal.onOpen(post)}
                    onDelete={handleDeletePost}
                  />
                ) : (
                  <PostActionsOther user={user} />
                )}
              </>
            )}
          </div>
          <div
            className={cn(
              "bg-cover bg-no-repeat px-4 text-2xl font-normal",
              background &&
                "flex h-[476px] items-center justify-center text-[30px] font-bold text-white",
              background?.includes("avatar") && "h-[680px]"
            )}
            style={{ ...styleBg }}
          >
            <p className="whitespace-pre-line">{text}</p>
          </div>
          {post.type === "PROFILE_PICTURE" && (
            <div className="relative grid">
              <div
                className="absolute top-0 h-[222px] w-full bg-secondary bg-cover bg-no-repeat"
                style={{
                  backgroundImage: me.coverPhoto
                    ? `url(${me.coverPhoto.photo.croppedImage.url})`
                    : "unset",
                }}
              ></div>
              <div className="z-[1] px-[52px] pb-7 pt-20 sm:pt-6">
                <img
                  src={images[0].url}
                  alt={images[0].filename}
                  className="mx-auto size-[200px] rounded-full border-4 border-white min-[460px]:size-[300px] sm:size-[388px]"
                />
              </div>
            </div>
          )}
          {post.type === "COVER_PHOTO" && (
            <img
              src={images[0].url}
              alt={images[0].filename}
              className="w-full object-cover"
            />
          )}
          {!post.type && (
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
              {images.slice(0, 4).map(({ url }, idx) => (
                <img
                  key={idx}
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
          )}
          <div className={cn("px-4")}>
            <PostStats post={post} className="border-b border-border" />
            <PostToolbar postId={post._id} />
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
