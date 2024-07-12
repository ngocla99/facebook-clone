import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const PostStats = ({ onComment }) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-3 py-[10px] text-[15px] leading-5 text-muted-foreground">
      <div className="flex items-center gap-1">
        <div className="flex [&>div:nth-child(1)]:z-[3] [&>div:nth-child(2)]:z-[2] [&>div]:-m-[2px]">
          <div className="rounded-full border-2 border-card">
            <img
              src="icons/reacts/like.svg"
              alt="Like"
              className="size-[18px]"
            />
          </div>
          <div className="rounded-full border-2 border-card">
            <img
              src="icons/reacts/angry.svg"
              alt="Angry"
              className="size-[18px]"
            />
          </div>
          <div className="rounded-full border-2 border-card">
            <img
              src="icons/reacts/heart.svg"
              alt="Heart"
              className="size-[18px]"
            />
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger className="text-right">
            <p className="hover:underline hover:underline-offset-1">12K</p>
          </TooltipTrigger>
          <TooltipContent side="bottom">Dummy data</TooltipContent>
        </Tooltip>
      </div>
      <div className="flex justify-end">
        <Tooltip>
          <TooltipTrigger className="text-right" onClick={onComment}>
            <p className="hover:underline hover:underline-offset-1">
              216 comments
            </p>
          </TooltipTrigger>
          <TooltipContent side="bottom">Dummy data</TooltipContent>
        </Tooltip>
      </div>
      <Tooltip>
        <TooltipTrigger className="text-right">
          <p className="hover:underline hover:underline-offset-1">75 shares</p>
        </TooltipTrigger>
        <TooltipContent side="bottom">Dummy data</TooltipContent>
      </Tooltip>
    </div>
  )
}
