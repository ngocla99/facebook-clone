import React from "react"
import { createCommentApi } from "@/api/services/comment"
import { uploadImageApi } from "@/api/services/image"
import { useControllableState } from "@/hooks"
import { useCommentState } from "@/stores/use-comment-state"
import { zodResolver } from "@hookform/resolvers/zod"
import { Cross2Icon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Dropzone from "react-dropzone"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"

import { cn, getInitialsName } from "@/lib/utils"
import { commentSchema } from "@/lib/validations/comment"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { EmojiPopover } from "@/components/popover/emoji-popover"
import { GIFPopover } from "@/components/popover/gif-popover"
import { StickerPopover } from "@/components/popover/sticker-popover"

import { AvatarStickerPopover } from "../../../../../components/popover/avatar-sticker-popover"
import { PreImage } from "../upload-image/pre-image"

export const CommentForm = React.forwardRef(
  ({ postId, setIsUpload, className }, ref) => {
    const queryClient = useQueryClient()
    const { data: user } = queryClient.getQueryData(["me"])
    const textRef = React.useRef(null)
    const [cursorPosition, setCursorPosition] = React.useState()
    const [cachedText, setCachedText] = React.useState("")
    const commentState = useCommentState()

    const form = useForm({
      resolver: zodResolver(commentSchema),
      defaultValues: {
        text: "",
        images: [],
      },
    })

    const [files, setFiles] = useControllableState({
      prop: form.watch("images"),
      onChange: (data) => {
        setIsUpload(true)
        form.setValue("images", data, { shouldDirty: true })
      },
    })

    const createCommentMutation = useMutation({
      mutationFn: createCommentApi,
      onSuccess: () => {
        setCachedText("")
        commentState.onSuccess()
        queryClient.invalidateQueries({ queryKey: ["posts"] })
      },
      onError: (err) => {
        setCachedText("")
        commentState.onError()
      },
    })

    const uploadImageMutation = useMutation({
      mutationFn: uploadImageApi,
      onSuccess: ({ data }) => {
        createCommentMutation.mutate({
          text: cachedText,
          image: data[0].url,
          post: postId,
        })
      },
    })

    const onDrop = async (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 1) {
        console.error("Cannot upload more than 1 file at a time")
        return
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )

      const updatedFiles = files ? [...files, ...newFiles] : newFiles

      setFiles(updatedFiles)

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          console.error(`File ${file.name} was rejected`)
        })
      }
    }

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

    const onSubmit = async (data) => {
      if (createCommentMutation.isPending || uploadImageMutation.isPending)
        return
      commentState.mutate(data.text)
      setCachedText(data.text)
      form.reset()
      if (data.images.length > 0) {
        const path = `${user.username}/post_images/${postId}`
        const formData = new FormData()
        formData.append("path", path)
        data.images.forEach((image) => {
          formData.append("files", image)
        })
        return uploadImageMutation.mutate(formData)
      }
      createCommentMutation.mutate({ text: data.text, post: postId })
    }

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        form.handleSubmit(onSubmit)()
      }
    }

    return (
      <Form {...form}>
        <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <Avatar>
            <AvatarImage src={user.picture} alt={user.username} />
            <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
          </Avatar>
          <Dropzone
            onDrop={onDrop}
            accept={{ "image/*": [] }}
            maxSize={1024 * 1024 * 2}
            maxFiles={1}
            multiple={false}
            noClick={true}
          >
            {({ getRootProps, open, getInputProps, isDragActive }) => (
              <div className="grid flex-1">
                <Label
                  {...getRootProps()}
                  className="rounded-[18px] bg-background-comment"
                >
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextareaAutosize
                            ref={textRef}
                            value={field.value}
                            className={cn(
                              "w-full resize-none whitespace-pre-wrap break-words border-none bg-transparent px-3 pb-1 pt-2 text-[15px] font-normal leading-5 outline-none placeholder:font-normal placeholder:text-muted-foreground"
                            )}
                            placeholder="Write a comment..."
                            onChange={(e) => {
                              handleChangeCursor()
                              field.onChange(e)
                            }}
                            onClick={handleChangeCursor}
                            onKeyDown={handleKeyDown}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <input {...getInputProps()} />
                  <div className="flex items-center px-2 pb-2 pt-1">
                    {!files?.length && (
                      <AvatarStickerPopover
                        className="-mx-0.5 size-8"
                        tooltipTitle="Comment with an avatar sticker"
                      />
                    )}
                    <EmojiPopover
                      size="sm"
                      tooltipTitle="Insert an emoji"
                      className="-mx-0.5 size-8"
                      align="end"
                      alignOffset={16}
                      onEmojiClick={handleClickEmoji}
                    />
                    {!files?.length && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className="-mx-0.5 size-8"
                            variant="ghost"
                            size="icon"
                            onClick={open}
                          >
                            {isDragActive ? (
                              <i className="upload_icon filter-secondary-icon animate-bounce"></i>
                            ) : (
                              <i className="camera_icon filter-secondary-icon"></i>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Attach a photo or video</TooltipContent>
                      </Tooltip>
                    )}
                    {!files?.length && (
                      <GIFPopover
                        className="-mx-0.5 size-8"
                        tooltipTitle="Comment with a GIF"
                      />
                    )}
                    {!files?.length && (
                      <StickerPopover
                        className="-mx-0.5 size-8"
                        tooltipTitle="Comment with a Sticker"
                      />
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="submit"
                          className="ml-auto size-8"
                          variant="ghost"
                          size="icon"
                          disabled={!form.formState.isDirty}
                        >
                          <i
                            className={cn(
                              "send_icon filter-accent",
                              !form.formState.isDirty && "filter-disabled-icon"
                            )}
                          ></i>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Commnent</TooltipContent>
                    </Tooltip>
                  </div>
                </Label>
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => {
                    if (field.value.length === 0) return null
                    return (
                      <FormItem>
                        <FormControl>
                          <div className="mt-2 flex gap-2 py-2">
                            <PreImage file={field.value[0]} className="h-20" />
                            <Button
                              className="size-6"
                              variant="secondary"
                              size="icon"
                              onClick={() => {
                                setIsUpload(false)
                                field.onChange([])
                                form.resetField("images")
                              }}
                            >
                              <Cross2Icon className="size-3.5 text-muted-foreground" />
                              <span className="sr-only">Close</span>
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />
              </div>
            )}
          </Dropzone>
        </form>
      </Form>
    )
  }
)
