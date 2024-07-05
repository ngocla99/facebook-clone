import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { postSchema } from "@/lib/validations/post"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { Audience } from "./audience"
import { PostForm } from "./post-form"

export const VIEWS = {
  ROOT: "root",
  AUDIENCE: "audience",
  TAG: "tag",
  FEELING: "feeling",
  LOCATION: "location",
  GIF: "gif",
  MORE: "more",
}

export const CreatePostForm = () => {
  const [view, setView] = React.useState(VIEWS.ROOT)

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      text: "",
      images: [],
    },
  })

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
  }

  console.log("🚀 ~ CreatePostForm ~ form:", form.getValues())
  return (
    <Form {...form}>
      <form
        className="overflow-hidden"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <ViewRoot setView={setView}>
          <PostForm
            form={form}
            className={cn("hidden", view === VIEWS.ROOT && "block")}
          />
          {view === VIEWS.AUDIENCE && <Audience />}
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
