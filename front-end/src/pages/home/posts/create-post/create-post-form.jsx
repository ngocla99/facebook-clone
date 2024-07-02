import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"

import { cn } from "@/lib/utils"
import { loginSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import LoadingButton from "@/components/button/loading-button"
import { Dots } from "@/assets/svg"

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
        className="grid gap-3"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="pb-10">
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

const AddToPost = () => {
  return (
    <div className="border-separator flex items-center justify-between rounded-lg border p-2 shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
      <a className="cursor-pointer px-2">Add to your post</a>
      <div className="flex h-10 items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-9"
              variant="ghost"
              size="icon"
              onClick={() => {}}
            >
              <img src="icons/photo.png" alt="Photo" className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Photo/Video</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-9"
              variant="ghost"
              size="icon"
              onClick={() => {}}
            >
              <img
                src="icons/tagFriend.png"
                alt="Tag Friend"
                className="size-6"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Tag people</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-9"
              variant="ghost"
              size="icon"
              onClick={() => {}}
            >
              <img src="icons/feeling.png" alt="Feeling" className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Feeling/activity</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-9"
              variant="ghost"
              size="icon"
              onClick={() => {}}
            >
              <img src="icons/map.png" alt="Map" className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Check in</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-9"
              variant="ghost"
              size="icon"
              onClick={() => {}}
            >
              <img src="icons/gif.png" alt="Gif" className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>GIF</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-9 text-muted-foreground"
              variant="ghost"
              size="icon"
              onClick={() => {}}
            >
              <Dots />
            </Button>
          </TooltipTrigger>
          <TooltipContent>More</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
