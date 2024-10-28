import React from "react"
import { unSavePostApi } from "@/api/services/post"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dots } from "@/assets/svg"

import { AddToCollectionModal } from "./add-to-collection-modal"

export const SavedItem = ({ item }) => {
  const { post, collection } = item
  const [showModal, setShowModal] = React.useState(false)

  const queryClient = useQueryClient()

  const unSavePostMutation = useMutation({
    mutationFn: unSavePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] })
      queryClient.invalidateQueries({ queryKey: ["collections"] })
      queryClient.invalidateQueries({ queryKey: ["me"] })
    },
  })

  const handleUnSavePost = () => {
    if (unSavePostMutation.isPending) return
    unSavePostMutation.mutate({ postId: post._id })
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex p-4">
        <img
          src={
            ["COVER_PHOTO", "PROFILE_PICTURE"].includes(post.type)
              ? post.images[0].url
              : post.user.picture
          }
          alt={post.text}
          className="mr-4 size-[144px] rounded-md object-cover"
        />

        <div className="flex-1">
          <h3 className="mb-0.5 line-clamp-2 cursor-pointer overflow-hidden text-xl font-bold underline-offset-1 hover:underline">
            {["COVER_PHOTO", "PROFILE_PICTURE"].includes(post.type)
              ? `${post.images.length} Photo`
              : post.text}
          </h3>

          <div className="posts-center flex gap-[2px]">
            <p className="text-sm text-muted-foreground">
              Post{" "}
              {collection && (
                <>
                  • Saved to{" "}
                  <span className="text-foreground">{collection.name}</span>
                </>
              )}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={post.user.picture} alt={post.user.username} />
              <AvatarFallback>{post.user.username}</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground">
              Saved from{" "}
              <span className="font-semibold text-foreground">
                {post.user.username}'s post
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2 px-3 py-4">
            <Button
              variant="secondary"
              className="px-10"
              onClick={() => setShowModal(true)}
            >
              Add to Collection
            </Button>
            <Button variant="secondary" className="w-12" disabled={true}>
              <i className="share-icon"></i>
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" className="w-12">
                  <Dots className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="grid p-2 shadow-xl">
                <Button
                  variant="ghost"
                  className="justify-start px-2"
                  onClick={handleUnSavePost}
                >
                  <i className="unsave_icon filter-primary-icon mr-3"></i>
                  Unsave
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
      <AddToCollectionModal
        showModal={showModal}
        setShowModal={setShowModal}
        postId={post._id}
      />
    </Card>
  )
}
