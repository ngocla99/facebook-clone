import { getReactsApi, reactPostApi } from "@/api/services/reaction"
import { usePostModal } from "@/stores"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent } from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Emoji } from "@/components/emoji"

const reactIcons = [
  {
    icon: "Bullseye",
    img: "/icons/reacts/like.svg",
    title: "Like",
    value: "LIKE",
  },
  {
    icon: "love",
    img: "/icons/reacts/love.svg",
    title: "Love",
    value: "LOVE",
  },
  {
    icon: "joy",
    img: "/icons/reacts/haha.svg",
    title: "Haha",
    value: "HAHA",
  },
  {
    icon: "Mindblown",
    img: "/icons/reacts/wow.svg",
    title: "Wow",
    value: "WOW",
  },
  {
    icon: "Tada",
    img: "/icons/reacts/sad.svg",
    title: "Sad",
    value: "SAD",
  },
  {
    icon: "Onfire",
    img: "/icons/reacts/angry.svg",
    title: "Angry",
    value: "ANGRY",
  },
]

export const PostToolbar = ({ postId, className }) => {
  const queryClient = useQueryClient()
  const postModal = usePostModal()

  const { data: reactions } = useQuery({
    queryKey: ["reacts", postId],
    queryFn: () => getReactsApi(postId),
  })

  const reactPostMutation = useMutation({
    mutationFn: reactPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reacts", postId] })
    },
  })

  const handleReactPost = (reactType) => {
    if (reactPostMutation.isPending) return
    reactPostMutation.mutate({ postId, reactType })
  }

  const handleToggleReact = () => {
    const reactType = reactions?.ownReaction?.reactType
      ? reactions.ownReaction.reactType
      : "LIKE"
    handleReactPost(reactType)
  }

  return (
    <div className={cn("grid grid-cols-3 gap-1 py-1", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="[min-400px]:gap-2 h-8 gap-1 px-0"
              variant="ghost"
              onClick={handleToggleReact}
            >
              <ReactionText type={reactions?.ownReaction?.reactType} />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="flex h-[52px] items-end overflow-visible rounded-[40px] bg-card py-[5px] shadow-md">
            {reactIcons.map((itm) => (
              <Emoji
                className="h-[60px] w-[52px]"
                icon={itm.icon}
                onClick={() => handleReactPost(itm.value)}
              />
            ))}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        className="[min-400px]:gap-2 h-8 gap-1 px-0"
        variant="ghost"
        onClick={() => postModal.onOpen(postId)}
      >
        <i className="comment_icon filter-secondary-icon"></i>
        <p className="text-muted-foreground">Comment</p>
      </Button>
      <Button className="[min-400px]:gap-2 h-8 gap-1 px-0" variant="ghost">
        <i className="share_icon filter-secondary-icon"></i>
        <p className="text-muted-foreground">Share</p>
      </Button>
    </div>
  )
}

const ReactionText = ({ type }) => {
  if (!type)
    return (
      <>
        <i className="like_icon filter-secondary-icon"></i>
        <p className="text-muted-foreground">Like</p>
      </>
    )

  switch (type) {
    case "LIKE":
      return (
        <>
          <i className="like_active_icon filter-primary-accent"></i>
          <p className="text-primary">Like</p>
        </>
      )
    case "LOVE":
      return (
        <>
          <img
            src="/icons/reacts/love.svg"
            alt="Love"
            className="size-[18px]"
          />
          <p className="text-[#f33e58]">Love</p>
        </>
      )
    case "HAHA":
      return (
        <>
          <img
            src="/icons/reacts/haha.svg"
            alt="HaHa"
            className="size-[18px]"
          />
          <p className="text-[#f7b125]">Haha</p>
        </>
      )
    case "WOW":
      return (
        <>
          <img src="/icons/reacts/wow.svg" alt="Wow" className="size-[18px]" />
          <p className="text-[#f7b125]">Wow</p>
        </>
      )
    case "SAD":
      return (
        <>
          <img src="/icons/reacts/sad.svg" alt="Sad" className="size-[18px]" />
          <p className="text-[#f7b125]">Sad</p>
        </>
      )
    case "ANGRY":
      return (
        <>
          <img
            src="/icons/reacts/angry.svg"
            alt="Angry"
            className="size-[18px]"
          />
          <p className="text-[#e9710f]">Angry</p>
        </>
      )
  }
}
