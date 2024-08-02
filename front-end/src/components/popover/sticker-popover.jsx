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
import { Search } from "@/assets/svg"

import { SearchInput } from "../input/search-input"
import { List } from "../list"
import { ScrollArea } from "../ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const stickers = [
  {
    title: "Happy",
    bgColor: "rgb(255, 204, 0)",
    image: "/icons/stickers/happy.png",
  },
  {
    title: "In love",
    bgColor: "rgb(246, 78, 136)",
    image: "/icons/stickers/love.png",
  },
  {
    title: "Sad",
    bgColor: "rgb(169, 161, 146)",
    image: "/icons/stickers/sad.png",
  },
  {
    title: "Eating",
    bgColor: "rgb(252, 138, 15)",
    image: "/icons/stickers/eat.png",
  },
  {
    title: "Celebratin",
    bgColor: "rgb(149, 198, 63)",
    image: "/icons/stickers/celebrate.png",
  },
  {
    title: "Active",
    bgColor: "rgb(84, 198, 227)",
    image: "/icons/stickers/active.png",
  },
  {
    title: "Working",
    bgColor: "rgb(25, 181, 150)",
    image: "/icons/stickers/work.png",
  },
  {
    title: "Sleepy",
    bgColor: "rgb(149, 113, 169)",
    image: "/icons/stickers/sleep.png",
  },
  {
    title: "Angry",
    bgColor: "rgb(237, 81, 62)",
    image: "/icons/stickers/angry.png",
  },
  {
    title: "Confused",
    bgColor: "rgb(179, 119, 54)",
    image: "/icons/stickers/confuse.png",
  },
]

// TODO: icon animated
// icon activate

export const StickerPopover = ({ className, tooltipTitle = "GIF" }) => {
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
            <i className="sticker_icon"></i>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>{tooltipTitle}</TooltipContent>
      </Tooltip>
      <PopoverContent
        align="end"
        alignOffset={12}
        side="top"
        sideOffset={8}
        className="w-[274px] p-0 shadow-2xl"
      >
        <Tabs defaultValue="feelings">
          <TabsList>
            <TabsTrigger className="size-10 p-0" value="feelings">
              <Search className="size-5" />
            </TabsTrigger>
            <TabsTrigger className="size-10 p-0" disabled value="activities">
              <i className="clock_icon filter-secondary-icon"></i>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="feelings">
            <div className="px-4 py-2">
              <SearchInput placeholder="Search" />
            </div>
            <ScrollArea className="h-[260px]">
              <List
                items={stickers}
                Item={StickerItem}
                propName="sticker"
                className="grid grid-cols-2 gap-2 p-1"
              />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

const StickerItem = ({ sticker }) => {
  const { image, title, bgColor } = sticker
  return (
    <Button
      className="h-10 justify-start gap-1 rounded-full pl-3 hover:opacity-90"
      style={{ backgroundColor: bgColor }}
    >
      <img src={image} alt={title} className="size-6" />
      <p className="font-semibold">{title}</p>
    </Button>
  )
}
