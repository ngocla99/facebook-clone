import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { postSchema } from "@/lib/validations/post"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Return } from "@/assets/svg"

import { PostAudience } from "./views/post-audience"
import { FriendsCustom } from "./views/post-audience/friends-custom"
import { FriendsExcept } from "./views/post-audience/friends-except"
import { FriendsSpecific } from "./views/post-audience/friends-specific"
import { PostBackgound } from "./views/post-background"
import { PostRoot } from "./views/post-root"

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
  MORE: "more",
  BACKGROUND: "background",
}

export const CreatePostForm = () => {
  const [view, setView] = React.useState(VIEWS.ROOT)
  const postRef = React.useRef(null)

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      text: "",
      audience: "EVERYONE",
      images: [],
    },
  })

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
  }

  return (
    <Form {...form}>
      <form
        className="overflow-hidden"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <ViewRoot setView={setView}>
          <PostRoot
            ref={postRef}
            form={form}
            className={cn("hidden", view === VIEWS.ROOT && "block")}
          />
          {view === VIEWS.AUDIENCE && <PostAudience />}
          {view === VIEWS.FRIENDS_EXCEPT && <FriendsExcept />}
          {view === VIEWS.FRIENDS_SPECIFIC && <FriendsSpecific />}
          {view === VIEWS.FRIENDS_CUSTOM && <FriendsCustom />}
          {view === VIEWS.BACKGROUND && (
            <PostBackgound
              background={postRef.current.background}
              onChangeBg={postRef.current.changeBg}
            />
          )}
        </ViewRoot>
      </form>
    </Form>
  )
}

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