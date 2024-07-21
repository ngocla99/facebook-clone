import { useCommentState } from "@/stores"
import { useQueryClient } from "@tanstack/react-query"

import { cn, getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dots } from "@/assets/svg"

export const CommentState = ({ className }) => {
  const queryClient = useQueryClient()
  const { data: me } = queryClient.getQueryData(["me"])
  const commentState = useCommentState()

  if (commentState.isError) return <p>Something went wrong...</p>
  if (commentState.isLoading)
    return (
      <div className={cn("group flex gap-2", className)}>
        <Avatar className="size-8">
          <AvatarImage
            src={me.picture}
            alt={me.firstName + " " + me.lastName}
          />
          <AvatarFallback>{getInitialsName(me)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start gap-0.5">
          <div className="flex gap-1">
            <div className="space-y-0.5 rounded-[18px] bg-background-comment px-3 py-2">
              <p className="text-[13px] font-semibold leading-[14px]">
                {me.firstName + " " + me.lastName}
              </p>
              <p className="text-[15px] leading-5">{commentState.text}</p>
            </div>
            <Button
              className="hidden size-8 self-center text-muted-foreground group-hover:flex"
              variant="ghost"
              size="icon"
            >
              <Dots className="size-4" />
            </Button>
          </div>

          <p className="ml-3 text-xs leading-none text-muted-foreground">
            Posting...
          </p>
        </div>
      </div>
    )

  return null
}
