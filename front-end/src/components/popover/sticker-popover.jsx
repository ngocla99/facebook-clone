import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
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

export const StickerPopover = ({ className, tooltipTitle = "GIF" }) => {
  return (
    <Popover modal={true}>
      <Tooltip>
        <PopoverTrigger asChild>
          <TooltipTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon", className })
            )}
          >
            <i className="sticker_icon filter-secondary-icon"></i>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>{tooltipTitle}</TooltipContent>
      </Tooltip>
      <PopoverContent
        className="w-auto overflow-auto p-0 shadow-2xl"
        side="top"
      >
        Hello
      </PopoverContent>
    </Popover>
  )
}
