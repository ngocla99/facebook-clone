import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Messenger as MessengerIcon } from "@/assets/svg"

export const Messenger = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary" size="icon" className="size-10">
          <MessengerIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Messenger</TooltipContent>
    </Tooltip>
  )
}
