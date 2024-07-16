import { cn, getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { List } from "@/components/list"
import { Dots } from "@/assets/svg"

export const PostComments = ({ comments, className }) => {
  // console.log("🚀 ~ PostComments ~ comments:", comments)
  return (
    <>
      <List
        className={cn("grid gap-1", className)}
        items={comments}
        Item={Comment}
        propName="comment"
      />
    </>
  )
}

const Comment = ({ comment }) => {
  const { commentBy, image, text, updatedAt } = comment

  return (
    <div className="group flex gap-2">
      <Avatar className="size-8">
        <AvatarImage
          src={commentBy.picture}
          alt={commentBy.first_name + " " + commentBy.last_name}
        />
        <AvatarFallback>{getInitialsName(commentBy)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start gap-1">
        <div className="flex gap-1">
          <div className="space-y-0.5 rounded-[18px] bg-background-comment px-3 py-2">
            <p className="text-[13px] font-semibold leading-[14px]">
              {commentBy.first_name + " " + commentBy.last_name}
            </p>
            <p className="text-[15px] leading-5">{text}</p>
          </div>
          <Button
            className="hidden size-8 self-center text-muted-foreground group-hover:flex"
            variant="ghost"
            size="icon"
          >
            <Dots className="size-4" />
          </Button>
        </div>
        {image && (
          <img
            className="h-[200px] rounded-[18px] border border-border object-cover"
            src={image}
            alt="Photo Comment"
          />
        )}
        <div className="ml-3 flex gap-4 text-xs text-muted-foreground">
          <p>33m</p>
          <button className="font-bold hover:underline hover:underline-offset-1">
            Like
          </button>
          <button className="font-bold hover:underline hover:underline-offset-1">
            Reply
          </button>
        </div>
      </div>
    </div>
  )
}
