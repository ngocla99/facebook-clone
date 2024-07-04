import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"

import { cn } from "@/lib/utils"
import { postSchema } from "@/lib/validations/post"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import LoadingButton from "@/components/button/loading-button"

import { AddBackground } from "./add-background"
import { AddToPost } from "./add-to-post"
import { UploadImages } from "./upload-image"

export const CreatePostForm = () => {
  const [isSmallText, setIsSmallText] = React.useState(false)
  const [backGround, setBackGround] = React.useState()
  const [showImageUpload, setShowImageUpload] = React.useState(false)
  const boxTextRef = React.useRef(null)

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      text: "",
      images: [],
    },
  })

  const handleChangeBg = (data) => {
    setBackGround(data)
    if (!data) {
      boxTextRef.current.style.backgroundImage = "unset"
      boxTextRef.current.style.backgroundColor = "transparent"
      return
    }

    if (data?.includes("url")) {
      boxTextRef.current.style.backgroundImage = data.replace(".", "xl.")
      return
    }

    boxTextRef.current.style.backgroundImage = "unset"
    boxTextRef.current.style.backgroundColor = data
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
          className={cn(
            "flex min-h-[155px] flex-col justify-between bg-cover bg-no-repeat px-4",
            backGround && "h-[348px] pb-3",
            backGround?.includes("avatar") && "h-[500px]"
          )}
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field: { onChange } }) => (
              <FormItem
                className={cn("pb-2 pr-5 pt-1", backGround && "my-auto")}
              >
                <FormControl>
                  <TextareaAutosize
                    className={cn(
                      "w-full resize-none whitespace-pre-wrap break-words border-none bg-transparent text-2xl leading-[28px] outline-none",
                      isSmallText && "text-[15px] leading-5",
                      backGround && "text-center text-3xl font-bold text-white"
                    )}
                    placeholder={`What's on your mind, `}
                    onHeightChange={(height) => {
                      if (height <= 20) setIsSmallText(false)
                      if (height > 60) setIsSmallText(true)
                      if (backGround && height > 146) {
                        setBackGround(null)
                        boxTextRef.current.style.backgroundImage = "unset"
                        boxTextRef.current.style.backgroundColor = "transparent"
                      }
                    }}
                    onChange={(e) => {
                      onChange(e)
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {showImageUpload && (
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UploadImages
                      value={field.value ?? []}
                      onValueChange={field.onChange}
                      maxFiles={10}
                      onClose={() => setShowImageUpload(false)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {!showImageUpload && (
            <div className="flex h-10 items-center justify-between">
              {(!isSmallText || backGround) && (
                <AddBackground
                  backGround={backGround}
                  setBackGround={setBackGround}
                  onChangeBg={handleChangeBg}
                />
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <i className="emoji_icon_large ml-auto"></i>
                </TooltipTrigger>
                <TooltipContent>Emoji</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
        <div className="grid gap-4 px-4">
          <AddToPost
            showImageUpload={showImageUpload}
            setShowImageUpload={setShowImageUpload}
          />
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
