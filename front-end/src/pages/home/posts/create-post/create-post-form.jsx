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

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      text: "",
      password: "",
    },
  })

  const onSubmit = () => {}

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="flex min-h-[155px] flex-col justify-between">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="pb-2 pr-5 pt-1">
                <FormControl>
                  <TextareaAutosize
                    className={cn(
                      "w-full resize-none border-none text-2xl leading-[28px] outline-none",
                      isSmallText && "text-[15px] leading-5"
                    )}
                    placeholder={`What's on your mind, `}
                    onHeightChange={(height) => {
                      if (height <= 20) return setIsSmallText(false)
                      if (height > 60) return setIsSmallText(true)
                    }}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex h-10 items-center justify-between">
            <AddBackground />
            <Tooltip>
              <TooltipTrigger asChild>
                <i className="emoji_icon_large"></i>
              </TooltipTrigger>
              <TooltipContent>Emoji</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <AddToPost />
        <LoadingButton
          className="text-[15px] font-semibold"
          // loading={logInMutation.isPending}
        >
          Post
          <span className="sr-only">Post</span>
        </LoadingButton>
      </form>
    </Form>
  )
}
