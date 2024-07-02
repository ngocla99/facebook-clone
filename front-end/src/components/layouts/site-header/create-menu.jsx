import { Plus } from "@/svg"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { CreateItem, MenuGroup } from "./all-menu"

export const CreateMenu = ({ className }) => {
  return (
    <Popover>
      <Tooltip>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "group flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary hover:bg-background-comment data-[state=open]:bg-[#EBF5FF]",
              className
            )}
          >
            <TooltipTrigger>
              <Plus className="group-data-[state=open]:text-primary" />
            </TooltipTrigger>
            <TooltipContent sideOffset={18}>Menu</TooltipContent>
          </div>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent className="w-[360px] bg-[#f7f8fa] p-0 shadow-2xl">
        <Card className="sticky right-0 top-0">
          <CardHeader className="p-3">
            <CardTitle className="text-xl font-bold">Create</CardTitle>
          </CardHeader>
          <CardContent className="grid px-2">
            <MenuGroup
              items={siteConfig.createMenu.slice(0, 3)}
              srcName="create"
              ItemComponent={CreateItem}
            />
            <div className="mx-2">
              <Separator className="my-2" />
            </div>
            <MenuGroup
              items={siteConfig.createMenu.slice(3, 8)}
              srcName="create"
              ItemComponent={CreateItem}
            />
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
