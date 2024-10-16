import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dots } from "@/assets/svg"

import { VIEWS } from "./post-form"

export const AddToPost = ({
  background,
  showImageUpload,
  setView,
  setShowImageUpload,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between rounded-lg border border-separator p-2 shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
      <a
        className="flex-1 cursor-pointer whitespace-nowrap px-2 text-center min-[400px]:flex-initial"
        onClick={() => setView(VIEWS.MORE)}
      >
        Add to your post
      </a>
      <div className="flex h-10 flex-1 items-center justify-center gap-1 min-[400px]:flex-initial">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={cn("size-9", showImageUpload && "bg-[#e4f0d5]")}
              variant="ghost"
              size="icon"
              disabled={!!background}
              onClick={() => setShowImageUpload(true)}
            >
              <img src="/icons/single/photo.png" alt="Photo" className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Photo/Video</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-9"
              variant="ghost"
              size="icon"
              onClick={() => setView(VIEWS.TAG)}
            >
              <img
                src="/icons/single/tagFriend.png"
                alt="Tag Friend"
                className="size-6"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Tag people</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-9"
              variant="ghost"
              size="icon"
              onClick={() => setView(VIEWS.FEELING)}
            >
              <img src="/icons/single/feeling.png" alt="Feeling" className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Feeling/activity</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-9"
              variant="ghost"
              size="icon"
              onClick={() => setView(VIEWS.LOCATION)}
            >
              <img src="/icons/single/map.png" alt="Map" className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Check in</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-9"
              variant="ghost"
              size="icon"
              disabled={showImageUpload || !!background}
              onClick={() => setView(VIEWS.GIF)}
            >
              <img src="/icons/single/gif.png" alt="Gif" className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>GIF</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-9 text-muted-foreground"
              variant="ghost"
              size="icon"
              onClick={() => setView(VIEWS.MORE)}
            >
              <Dots />
            </Button>
          </TooltipTrigger>
          <TooltipContent>More</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
