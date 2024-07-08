import React from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import TextareaAutosize from "react-textarea-autosize"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import LoadingButton from "@/components/button/loading-button"

import { UploadImages } from "../../upload-image"
import { AddBackground } from "../add-background"
import { AddToPost } from "../add-to-post"
import { VIEWS } from "../create-post-form"

export const PostRoot = React.forwardRef(
  ({ form, className, setView }, ref) => {
    const [isSmallText, setIsSmallText] = React.useState(false)
    const [background, setBackground] = React.useState()
    const [showImageUpload, setShowImageUpload] = React.useState(false)

    const boxTextRef = React.useRef(null)
    const audience = form.watch("audience")

    const handleChangeBg = (data) => {
      setBackground(data)
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

    React.useImperativeHandle(
      ref,
      () => {
        return {
          background,
          changeBg: handleChangeBg,
        }
      },
      [background]
    )

    return (
      <div className={className}>
        <DialogHeader className="relative h-[60px] items-center justify-center space-y-0 border-b border-border">
          <DialogTitle>Create post</DialogTitle>
          <DialogClose>
            <Button
              variant="secondary"
              className="absolute right-4 top-3 size-9 rounded-full text-muted-foreground"
              size="icon"
            >
              <Cross2Icon className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="grid gap-4 px-0 py-4">
          <div className="flex items-center justify-start gap-[11px] px-4">
            <Avatar>
              <AvatarImage src="" alt="NM" />
              <AvatarFallback>NM</AvatarFallback>
            </Avatar>
            <div className="space-y-[2px] text-[15px] font-semibold">
              <p>Lan anh</p>
              <Button
                variant="secondary"
                className="flex h-6 items-center gap-1 px-2 py-1 text-[13px]"
                onClick={() => setView(VIEWS.AUDIENCE)}
              >
                {audience === "EVERYONE" && (
                  <>
                    <img src="icons/12x12/public.png" alt="Public" />
                    Public
                  </>
                )}
                {audience === "FRIENDS" && (
                  <>
                    <img src="icons/12x12/friends.png" alt="Friends" />
                    Friends
                  </>
                )}
                {audience === "SELF" && (
                  <>
                    <img src="icons/12x12/private.png" alt="Only me" />
                    Only me
                  </>
                )}
                <i className="arrowDown_icon"></i>
              </Button>
            </div>
          </div>
          <ScrollArea className="max-h-[calc(90vh-282px)]">
            <div
              ref={boxTextRef}
              className={cn(
                "flex min-h-[155px] flex-col justify-between bg-cover bg-no-repeat px-4 pb-[2px]",
                background && "h-[348px] pb-3",
                background?.includes("avatar") && "h-[500px]"
              )}
            >
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem
                    className={cn("pb-2 pr-5 pt-1", background && "my-auto")}
                  >
                    <FormControl>
                      <TextareaAutosize
                        className={cn(
                          "w-full resize-none whitespace-pre-wrap break-words border-none bg-transparent text-2xl leading-[28px] outline-none placeholder:text-muted-foreground",
                          (isSmallText || showImageUpload) &&
                            "text-[15px] leading-5",
                          background &&
                            "text-center text-3xl font-bold text-white"
                        )}
                        placeholder={`What's on your mind, `}
                        onHeightChange={(height) => {
                          if (height <= 20) setIsSmallText(false)
                          if (height > 60) setIsSmallText(true)
                          if (background && height > 146) {
                            setBackground(null)
                            boxTextRef.current.style.backgroundImage = "unset"
                            boxTextRef.current.style.backgroundColor =
                              "transparent"
                          }
                        }}
                        {...field}
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
                    <FormItem className="mt-8">
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
                  {(!isSmallText || background) && (
                    <AddBackground
                      background={background}
                      setView={setView}
                      setBackground={setBackground}
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
          </ScrollArea>
          <div className="grid gap-4 px-4">
            <AddToPost
              background={background}
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
        </div>
      </div>
    )
  }
)
