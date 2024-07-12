import React from "react"
import { uploadImageApi } from "@/api/services/image"
import { createPostApi } from "@/api/services/post"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { postSchema } from "@/lib/validations/post"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Loading, Return } from "@/assets/svg"

import { PostAudience } from "./views/post-audience"
import { FriendsCustom } from "./views/post-audience/friends-custom"
import { FriendsExcept } from "./views/post-audience/friends-except"
import { FriendsSpecific } from "./views/post-audience/friends-specific"
import { PostBackgound } from "./views/post-background"
import { PostEvent } from "./views/post-event"
import { PostFeeling } from "./views/post-feeling"
import { PostGif } from "./views/post-gif"
import { PostLocation } from "./views/post-location"
import { PostMore } from "./views/post-more"
import { PostRoot } from "./views/post-root"
import { PostTag } from "./views/post-tag"

export const VIEWS = {
  ROOT: "root",
  AUDIENCE: "audience",
  FRIENDS_EXCEPT: "friends-except",
  FRIENDS_SPECIFIC: "friends-specific",
  FRIENDS_CUSTOM: "friends-custom",
  TAG: "tag",
  FEELING: "feeling",
  LOCATION: "location",
  GIF: "gif",
  EVENTS: "events",
  MORE: "more",
  BACKGROUND: "background",
}

export const CreatePostForm = React.forwardRef(({ onClose, openBy }, ref) => {
  const queryClient = useQueryClient()
  const { data: user } = queryClient.getQueryData(["me"])
  const [view, setView] = React.useState(() => {
    return openBy === "feeling" ? VIEWS.FEELING : VIEWS.ROOT
  })
  const postRef = React.useRef(null)

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      text: "",
      audience: "EVERYONE",
      images: [],
      background: null,
    },
  })

  const createPostMutation = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      onClose()
      // Invalidates cache and refetch
      queryClient.invalidateQueries("posts")
    },
  })

  const uploadImageMutation = useMutation({
    mutationFn: uploadImageApi,
    onSuccess: ({ data }) => {
      createPostMutation.mutate({ ...form.getValues(), images: data })
    },
  })

  React.useImperativeHandle(
    ref,
    () => ({
      isPosting: uploadImageMutation.isPending || createPostMutation.isPending,
    }),
    [uploadImageMutation.isPending, createPostMutation.isPending]
  )

  const onSubmit = (data) => {
    if (createPostMutation.isPending) return
    if (data.images.length > 0) {
      const path = `${user.username}/post_images`
      const formData = new FormData()
      formData.append("path", path)
      data.images.forEach((image) => {
        formData.append("files", image)
      })
      return uploadImageMutation.mutate(formData)
    }
    createPostMutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form
        className="overflow-hidden"
        onSubmit={form.handleSubmit(onSubmit, (err) => {
          console.log("🚀 ~ onSubmit={form.handleSubmit ~ err:", err)
        })}
      >
        <ViewRoot setView={setView}>
          <PostRoot
            ref={postRef}
            form={form}
            isShowUpload={openBy === "photo"}
            className={cn("hidden", view === VIEWS.ROOT && "block")}
          />
          {view === VIEWS.AUDIENCE && <PostAudience />}
          {view === VIEWS.FRIENDS_EXCEPT && <FriendsExcept />}
          {view === VIEWS.FRIENDS_SPECIFIC && <FriendsSpecific />}
          {view === VIEWS.FRIENDS_CUSTOM && <FriendsCustom />}
          {view === VIEWS.FEELING && <PostFeeling />}
          {view === VIEWS.LOCATION && <PostLocation />}
          {view === VIEWS.GIF && <PostGif />}
          {view === VIEWS.EVENTS && <PostEvent />}
          {view === VIEWS.MORE && <PostMore />}
          {view === VIEWS.BACKGROUND && (
            <PostBackgound
              background={postRef.current.background}
              onChangeBg={postRef.current.changeBg}
            />
          )}
          {view === VIEWS.TAG && <PostTag />}
        </ViewRoot>
        {(createPostMutation.isPending || uploadImageMutation.isPending) && (
          <LoadingPost />
        )}
      </form>
    </Form>
  )
})

const ViewRoot = ({ setView, children }) => {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { setView })
        }

        return child
      })}
    </>
  )
}

export const HeadOnBack = ({ onBack, title }) => {
  return (
    <DialogHeader className="flex-rows relative items-center space-y-0 border-b border-border px-4 py-3 text-center">
      <Button
        variant="secondary"
        className="absolute left-4 top-3 w-9 rounded-full p-0"
        onClick={onBack}
      >
        <Return className="text-[#65676b]" />
      </Button>
      <DialogTitle className="leading-9">{title}</DialogTitle>
    </DialogHeader>
  )
}

const LoadingPost = () => {
  return (
    <div className="z-2 fixed inset-0 flex flex-col items-center justify-center gap-1 bg-[rgba(244,244,244,0.8)]">
      <Loading />
      <p className="text-xl font-normal">Posting</p>
    </div>
  )
}
