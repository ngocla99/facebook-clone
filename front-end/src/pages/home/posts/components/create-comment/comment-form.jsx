import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
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

export const CommentForm = React.forwardRef(({ className }, ref) => {
  const queryClient = useQueryClient()
  const { data: user } = queryClient.getQueryData(["me"])

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {},
  })

  const onSubmit = () => {}

  return (
    <Form {...form}>
      <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <Avatar>
          <AvatarImage src={user.picture} alt={user.username} />
          <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
        </Avatar>
        <Label className="flex-1 rounded-[18px] bg-background-comment">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextareaAutosize
                    // ref={textRef}
                    value={field.value}
                    className={cn(
                      "w-full resize-none whitespace-pre-wrap break-words border-none bg-transparent px-3 py-2 text-[15px] font-normal leading-5 outline-none placeholder:font-normal placeholder:text-muted-foreground"
                    )}
                    placeholder="Write a comment..."
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="h-12 px-2">
            <AvatarStickerPopover
              className="-mx-0.5 size-8"
              tooltipTitle="Comment with an avatar sticker"
            />
            <EmojiPopover
              size="sm"
              tooltipTitle="Insert an emoji"
              className="-mx-0.5 size-8"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="-mx-0.5 size-8" variant="ghost" size="icon">
                  <i className="camera_icon filter-secondary-icon"></i>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach a photo or video</TooltipContent>
            </Tooltip>
            <GIFPopover
              className="-mx-0.5 size-8"
              tooltipTitle="Comment with a GIF"
            />
            <StickerPopover
              className="-mx-0.5 size-8"
              tooltipTitle="Comment with a Sticker"
            />
          </div>
        </Label>
      </form>
    </Form>
  )
})
