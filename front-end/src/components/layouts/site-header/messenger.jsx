import { Messenger as MessengerIcon } from "@/assets/svg"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const Messenger = () => {
  return (
    <Tooltip>
      <TooltipTrigger className="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary hover:bg-background-comment">
        <MessengerIcon />
      </TooltipTrigger>
      <TooltipContent>Messenger</TooltipContent>
    </Tooltip>
  )
}
