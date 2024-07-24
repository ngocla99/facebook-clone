import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Notifications as NotificationsIcon } from "@/assets/svg"

export const Notifications = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary" size="icon" className="size-10">
          <NotificationsIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Messenger</TooltipContent>
    </Tooltip>
  )
}
