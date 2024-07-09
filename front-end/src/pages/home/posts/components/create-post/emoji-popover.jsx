import EmojiPicker from "emoji-picker-react"

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

export const EmojiPopover = ({ onEmojiClick, className }) => {
  return (
    <Popover modal={true}>
      <Tooltip>
        <PopoverTrigger className={className}>
          <TooltipTrigger asChild>
            <i className="emoji_icon_large ml-auto"></i>
          </TooltipTrigger>
          <TooltipContent>Emoji</TooltipContent>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent className="w-auto overflow-auto p-0 shadow-2xl" side="top">
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
