import { Menu } from "@/svg"

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export const AllMenu = () => {
  return (
    <Tooltip>
      <TooltipTrigger className="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary">
        <Menu />
      </TooltipTrigger>
      <TooltipContent>Menu</TooltipContent>
    </Tooltip>
  )
}
