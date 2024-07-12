import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const reactIcons = [
  {
    key: "like",
    gif: "icons/reacts/like.gif",
    img: "icons/reacts/like.svg",
    title: "Like",
  },
  {
    key: "love",
    gif: "icons/reacts/love.gif",
    img: "icons/reacts/love.svg",
    title: "Love",
  },
  {
    key: "haha",
    gif: "icons/reacts/haha.gif",
    img: "icons/reacts/haha.svg",
    title: "Haha",
  },
  {
    key: "wow",
    gif: "icons/reacts/wow.gif",
    img: "icons/reacts/wow.svg",
    title: "Wow",
  },
  {
    key: "sad",
    gif: "icons/reacts/sad.gif",
    img: "icons/reacts/sad.svg",
    title: "Sad",
  },
  {
    key: "angry",
    gif: "icons/reacts/angry.gif",
    img: "icons/reacts/angry.svg",
    title: "Angry",
  },
]

export const PostActions = ({ onComment, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-1 border-b border-border py-1",
        className
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="h-8 gap-2" variant="ghost">
            <i className="like_icon filter-secondary-icon"></i>
            <p className="text-[15px] text-muted-foreground">Like</p>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="flex gap-2 rounded-[40px] bg-card py-[5px] shadow-md">
          {reactIcons.map((itm) => (
            <img
              key={itm.key}
              src={itm.gif}
              alt={itm.title}
              className="size-[39px]"
            />
          ))}
        </TooltipContent>
      </Tooltip>
      <Button className="h-8 gap-2" variant="ghost" onClick={onComment}>
        <i className="comment_icon filter-secondary-icon"></i>
        <p className="text-[15px] text-muted-foreground">Comment</p>
      </Button>
      <Button className="h-8 gap-2" variant="ghost">
        <i className="share_icon filter-secondary-icon"></i>
        <p className="text-[15px] text-muted-foreground">Share</p>
      </Button>
    </div>
  )
}
