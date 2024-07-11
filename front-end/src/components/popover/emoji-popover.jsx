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
  tooltipTitle = "Emoji",
  className,
  onEmojiClick,
}) => {
  return (
    <Popover modal={true}>
      <Tooltip>
        <PopoverTrigger asChild>
          <TooltipTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon", className })
            )}
          >
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
        className="w-auto overflow-auto p-0 shadow-2xl"
        side="top"
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
