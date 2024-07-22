import React from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import { useQueryClient } from "@tanstack/react-query"
import TextareaAutosize from "react-textarea-autosize"

import { cn, getInitialsName, isImageSrc } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"
import LoadingButton from "@/components/button/loading-button"
import { EmojiPopover } from "@/components/popover/emoji-popover"

import { UploadImages } from "../../upload-image"
import { AddBackground } from "../add-background"
import { AddToPost } from "../add-to-post"
import { VIEWS } from "../post-form"

export const PostRoot = React.forwardRef(
  ({ form, className, setView, isEdit, isShowUpload }, ref) => {
    const queryClient = useQueryClient()
    const { data: user } = queryClient.getQueryData(["me"])

    const textRef = React.useRef(null)
    const boxTextRef = React.useRef(null)

    const audience = form.watch("audience")
    const background = form.watch("background")

    const [isSmallText, setIsSmallText] = React.useState(false)
    const [cursorPosition, setCursorPosition] = React.useState()
    const [showImageUpload, setShowImageUpload] = React.useState(
      () =>
        isShowUpload ||
        !!form.getValues("images").length ||
        !!form.getValues("storedImages")?.length
    )

    React.useEffect(() => {
      if (!background) {
        boxTextRef.current.style.backgroundImage = "unset"
        boxTextRef.current.style.backgroundColor = "transparent"
        return
      }

      if (isImageSrc(background)) {
        boxTextRef.current.style.backgroundImage = `url(${background.replace(
          ".",
          "xl."
        )})`
        return
      }

      boxTextRef.current.style.backgroundImage = "unset"
      boxTextRef.current.style.backgroundColor = background
    }, [background])

    const handleClickEmoji = ({ emoji }) => {
      const text = form.getValues("text")
      const start = text.substring(0, cursorPosition)
      const end = text.substring(cursorPosition)
      const newText = start + emoji + end
      form.setValue("text", newText)
      setCursorPosition(start.length + emoji.length)
    }

    const handleChangeCursor = () => {
      setCursorPosition(textRef.current.selectionStart)
    }

    return (
      <div className={className}>
        <DialogHeader className="relative h-[60px] items-center justify-center space-y-0 border-b border-border">
          <DialogTitle>{isEdit ? "Edit post" : "Create post"}</DialogTitle>
          <DialogDescription></DialogDescription>
          <DialogClose asChild>
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
              <AvatarImage src={user.picture} alt={user.username} />
              <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
            </Avatar>
            <div className="space-y-[2px] text-[15px] font-semibold">
              <p>{`${user.firstName} ${user.lastName}`}</p>
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
              htmlFor=""
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
                    className={cn(
                      "relative space-y-0 pb-2 pr-5 pt-1",
                      background && "my-auto"
                    )}
                  >
                    <FormControl>
                      <TextareaAutosize
                        ref={textRef}
                        value={field.value}
                        className={cn(
                          "w-full resize-none whitespace-pre-wrap break-words border-none bg-transparent text-2xl leading-[28px] outline-none placeholder:text-muted-foreground",
                          (isSmallText || showImageUpload) &&
                            "text-[15px] leading-5",
                          background &&
                            "text-center text-3xl font-bold text-white"
                        )}
                        autoFocus
                        placeholder={`What's on your mind, ${user.firstName}?`}
                        onHeightChange={(height) => {
                          if (height <= 20) setIsSmallText(false)
                          if (height > 60) setIsSmallText(true)
                          if (background && height > 146) {
                            boxTextRef.current.style.backgroundImage = "unset"
                            boxTextRef.current.style.backgroundColor =
                              "transparent"
                            form.setValue("background", null)
                          }
                        }}
                        onChange={(e) => {
                          setCursorPosition(textRef.current.selectionStart)
                          field.onChange(e)
                        }}
                        onClick={handleChangeCursor}
                      />
                    </FormControl>
                    {showImageUpload && (
                      <EmojiPopover
                        onEmojiClick={handleClickEmoji}
                        className="absolute -right-1 bottom-2 size-6 hover:bg-transparent active:bg-transparent"
                      />
                    )}
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
                          storedImages={form.getValues("storedImages") ?? []}
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
                    <AddBackground form={form} setView={setView} />
                  )}
                  <EmojiPopover
                    onEmojiClick={handleClickEmoji}
                    className="ml-auto size-6 hover:bg-transparent active:bg-transparent"
                  />
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="grid gap-4 px-4">
            <AddToPost
              setView={setView}
              background={background}
              showImageUpload={showImageUpload}
              setShowImageUpload={setShowImageUpload}
            />
            <LoadingButton className="text-[15px] font-semibold">
              {isEdit ? "Save" : "Post"}
              <span className="sr-only">{isEdit ? "Save" : "Post"}</span>
            </LoadingButton>
          </div>
        </div>
      </div>
    )
  }
)
