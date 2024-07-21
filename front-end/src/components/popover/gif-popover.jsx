import { getGIFsApi } from "@/api/services/image"
import { useQuery } from "@tanstack/react-query"

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

import { SearchInput } from "../input/search-input"
import { ScrollArea } from "../ui/scroll-area"

export const GIFPopover = ({ className, tooltipTitle = "GIF" }) => {
  const { data: gifs } = useQuery({
    queryKey: ["gifs", "thanks"],
    queryFn: () => getGIFsApi({ searchBy: "thanks", limit: 25 }),
    select: ({ data }) => {
      return data.results.map((itm) => itm.media[0].gif)
    },
    initialData: [],
  })

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
            <i className="gif_icon filter-secondary-icon"></i>
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
        <div className="px-4 py-2">
          <SearchInput placeholder="Search" />
        </div>
        <ScrollArea className="h-[300px]">
          <div className="grid">
            {(gifs ?? []).map((itm) => (
              <img key={itm.url} src={itm.url} alt="gif" className="w-full" />
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
