import { getReactsApi } from "@/api/services/reaction"
import { usePostModal } from "@/stores"
import { useQuery } from "@tanstack/react-query"

import { cn, filterDuplicatesByKey, formatNumber } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const PostStats = ({ post, className }) => {
  const { _id: postId, comments } = post
  const postModal = usePostModal()
  const { data: reactions } = useQuery({
    queryKey: ["reacts", postId],
    queryFn: () => getReactsApi(postId),
  })

  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] gap-3 py-[10px] leading-5 text-muted-foreground",
        className
      )}
    >
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
                  <div className="cursor-pointer rounded-full border-2 border-card">
                    <img
                      src={`/icons/category/reactions/${itm.reactType.toLowerCase()}.svg`}
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
        <ReactTextTooltip
          users={filterDuplicatesByKey(
            comments.map((itm) => itm.commentBy),
            "_id"
          )}
          count={comments.length}
          onClick={() => postModal.onOpen(postId)}
        >
          <p className="hover:underline hover:underline-offset-1">
            {comments.length} comments
          </p>
        </ReactTextTooltip>
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
      <p className="hover:underline hover:underline-offset-1">
        {formatNumber(reactions?.total)}
      </p>
    )
  }

  if (reactions.total > 1)
    return (
      <p className="hover:underline hover:underline-offset-1">
        You and {formatNumber(reactions.total - 1)}{" "}
        {reactions.total === 2 ? "other" : "others"}
      </p>
    )
  return (
    <p className="hover:underline hover:underline-offset-1">
      {reactions.ownReaction.firstName + " " + reactions.ownReaction.lastName}
    </p>
  )
}

const ReactTextTooltip = ({
  users,
  count,
  type,
  children,
  asChild,
  onClick = () => {},
}) => {
  if (!count) return <></>

  return (
    <Tooltip>
      <TooltipTrigger onClick={onClick} asChild={asChild}>
        {children}
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[170px]">
        {type && (
          <p className="font-semibold capitalize leading-5">
            {type}
          </p>
        )}
        {users.slice(0, 19).map((user, idx) => (
          <p key={idx}>{user.firstName + " " + user.lastName}</p>
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
