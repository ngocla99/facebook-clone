import React from "react"
import { useControllableState } from "@/hooks"
import { Cross2Icon } from "@radix-ui/react-icons"
import Dropzone from "react-dropzone"
import TextareaAutosize from "react-textarea-autosize"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AvatarStickerPopover } from "@/components/popover/avatar-sticker-popover"
import { EmojiPopover } from "@/components/popover/emoji-popover"
import { GIFPopover } from "@/components/popover/gif-popover"
import { StickerPopover } from "@/components/popover/sticker-popover"

import { CommentImage } from "./comment-image"

export const CommentForm = React.forwardRef(
  ({ form, onSubmit, setIsUpload, className }, ref) => {
    const textRef = React.useRef(null)
    const [cursorPosition, setCursorPosition] = React.useState()

    const [files, setFiles] = useControllableState({
      prop: form.watch("images"),
      onChange: (data) => {
        setIsUpload?.(true)
        form.setValue("images", data, { shouldDirty: true })
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

    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault()
        form.handleSubmit(onSubmit)()
      }
    }

    return (
      <Form {...form}>
        <form
          className={cn("", className)}
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
                            <CommentImage file={field.value[0]} />
                            <Button
                              className="size-6"
                              variant="secondary"
                              size="icon"
                              onClick={() => {
                                setIsUpload?.(false)
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
