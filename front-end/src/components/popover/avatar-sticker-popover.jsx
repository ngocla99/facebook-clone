import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
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

import { ScrollArea } from "../ui/scroll-area"

export const AvatarStickerPopover = ({
  className,
  tooltipTitle = "Avatar Sticker",
}) => {
  return (
    <Popover>
      <Tooltip>
        <PopoverTrigger
          className={cn(
            "[&>i]:filter-secondary-icon aria-expanded:[&>i]:filter-accent",
            buttonVariants({ variant: "ghost", size: "icon", className })
          )}
        >
          <TooltipTrigger asChild>
            <i className="avatar_icon filter-secondary-icon"></i>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>{tooltipTitle}</TooltipContent>
      </Tooltip>
      <PopoverContent
        align="end"
        alignOffset={12}
        side="top"
        sideOffset={8}
        className="w-[350px] p-3 shadow-2xl"
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <i className="avatar_group_icon"></i>
          <Button className="text-[15px] font-semibold" disabled>
            Make your avatar
          </Button>
          <p className="text-[13px] leading-4 text-muted-foreground">
            Make your own sticker pack that represents who you are.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
