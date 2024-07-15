import { getReactsApi } from "@/api/services/reaction"
import { useQuery } from "@tanstack/react-query"

import { formatNumber } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const PostStats = ({ postId, onComment }) => {
  const { data: reactions } = useQuery({
    queryKey: ["reacts", postId],
    queryFn: () => getReactsApi(postId),
    select: ({ data }) => data,
  })

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-3 py-[10px] text-[15px] leading-5 text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <div className="flex [&>div:nth-child(1)]:z-[3] [&>div:nth-child(2)]:z-[2] [&>div]:-m-[2px]">
          {reactions
            ? reactions.reactionsByType.slice(0, 3).map((itm) => (
                <ReactTextTooltip
                  key={itm.reactType}
                  users={reactions.reactionsByType
                    .filter((el) => el.reactType === itm.reactType)
                    .reduce((acc, itm) => [...acc, ...itm.reactions], [])}
                  count={itm.count}
                  type={itm.reactType.toLowerCase()}
                  asChild
                >
                  <div className="rounded-full border-2 border-card">
                    <img
                      src={`icons/reacts/${itm.reactType.toLowerCase()}.svg`}
                      alt={itm.reactType}
                      className="size-[18px]"
                    />
                  </div>
                </ReactTextTooltip>
              ))
            : null}
        </div>
        <ReactTextTooltip
          users={(reactions?.reactionsByType ?? []).reduce(
            (acc, itm) => [...acc, ...itm.reactions],
            []
          )}
          count={reactions?.total}
        >
          <ReactionText reactions={reactions} />
        </ReactTextTooltip>
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

const ReactionText = ({ reactions }) => {
  if (!reactions?.total) return <></>

  if (!reactions?.ownReaction?.userId) {
    return (
      <button className="hover:underline hover:underline-offset-1">
        {formatNumber(reactions?.total)}
      </button>
    )
  }

  if (reactions.total > 1)
    return (
      <button className="hover:underline hover:underline-offset-1">
        You and {formatNumber(reactions.total - 1)}{" "}
        {reactions.total === 2 ? "other" : "others"}
      </button>
    )
  return (
    <button className="hover:underline hover:underline-offset-1">
      {reactions.ownReaction.firstName + " " + reactions.ownReaction.lastName}
    </button>
  )
}

const ReactTextTooltip = ({ users, count, type, children, asChild }) => {
  if (!count) return <></>

  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent side="bottom" className="w-[170px]">
        {type && (
          <p className="text-[15px] font-semibold capitalize leading-5">
            {type}
          </p>
        )}
        {users.slice(0, 19).map((user) => (
          <p key={user.userId}>{user.firstName + " " + user.lastName}</p>
        ))}
        {count > 20 && (
          <p>
            and {formatNumber(count - 20, { notation: "standard" })} more...
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  )
}
