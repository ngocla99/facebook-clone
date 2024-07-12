import EmojiPicker from "emoji-picker-react"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { buttonVariants } from "../ui/button"

export const EmojiPopover = ({
  size,
  align = "center",
  alignOffset,
  tooltipTitle = "Emoji",
  className,
  onEmojiClick,
}) => {
  return (
    <Popover modal={true}>
      <Tooltip>
        <PopoverTrigger
          className={cn(
            "[&>i]:filter-secondary-icon aria-expanded:[&>i]:filter-accent",
            buttonVariants({ variant: "ghost", size: "icon", className })
          )}
        >
          <TooltipTrigger asChild>
            {size === "sm" ? (
              <i className="emoji_icon filter-secondary-icon"></i>
            ) : (
              <i className="emoji_icon_large filter-secondary-icon"></i>
            )}
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>{tooltipTitle}</TooltipContent>
      </Tooltip>
      <PopoverContent
        className="w-auto p-0 shadow-2xl"
        side="top"
        sideOffset={size === "sm" ? 8 : 16}
        align={align}
        alignOffset={alignOffset}
      >
        <EmojiPicker
          skinTonesDisabled={true}
          searchDisabled={true}
          previewConfig={{ showPreview: false }}
          height={264}
          width={328}
          emojiStyle="facebook"
          suggestedEmojisMode="recent"
          onEmojiClick={onEmojiClick}
        />
      </PopoverContent>
    </Popover>
  )
}
