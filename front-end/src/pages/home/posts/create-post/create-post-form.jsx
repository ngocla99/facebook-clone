import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"

import { cn } from "@/lib/utils"
import { loginSchema } from "@/lib/validations/auth"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import LoadingButton from "@/components/button/loading-button"

import { AddBackground } from "./add-background"
import { AddToPost } from "./add-to-post"

export const CreatePostForm = () => {
  const [isSmallText, setIsSmallText] = React.useState(false)
  const boxTextRef = React.useRef(null)

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      text: "",
    },
  })

  const handleChangeBg = (data) => {
    if (!data) {
      boxTextRef.current.style.backgroundImage = "unset"
      boxTextRef.current.classList.remove("h-[348px]")
      boxTextRef.current.classList.remove("h-[500px]")
      return
    }

    if (data?.includes("url")) {
      boxTextRef.current.style.backgroundImage = data.replace(".", "xl.")
      if (data.includes("avatar")) {
        boxTextRef.current.classList.add("h-[500px]")
      } else {
        boxTextRef.current.classList.add("h-[348px]")
      }
      return
    }
    boxTextRef.current.style.backgroundImage = "unset"
    boxTextRef.current.style.backgroundColor = data
    boxTextRef.current.classList.add("h-[348px]")
  }

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div
          ref={boxTextRef}
          className="flex min-h-[155px] flex-col justify-between bg-cover bg-no-repeat px-4"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field: { onChange } }) => (
              <FormItem className="pb-2 pr-5 pt-1">
                <FormControl>
                  <TextareaAutosize
                    className={cn(
                      "w-full resize-none border-none bg-transparent text-2xl leading-[28px] outline-none",
                      isSmallText && "text-[15px] leading-5"
                    )}
                    placeholder={`What's on your mind, `}
                    onHeightChange={(height) => {
                      if (height <= 20) return setIsSmallText(false)
                      if (height > 60) return setIsSmallText(true)
                    }}
                    onChange={(e) => {
                      onChange(e)
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex h-10 items-center justify-between">
            <AddBackground onChangeBg={handleChangeBg} />
            <Tooltip>
              <TooltipTrigger asChild>
                <i className="emoji_icon_large"></i>
              </TooltipTrigger>
              <TooltipContent>Emoji</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="grid gap-4 px-4">
          <AddToPost />
          <LoadingButton
            className="text-[15px] font-semibold"
            // loading={logInMutation.isPending}
          >
            Post
            <span className="sr-only">Post</span>
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}
