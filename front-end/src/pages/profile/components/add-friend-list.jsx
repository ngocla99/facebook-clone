import { CrossIcon, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const AddFriendList = ({ className }) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-border px-4 pb-2 pt-4 shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      <div className="flex justify-between">
        <p className="text-lg font-semibold">People You May Know</p>
        <Button variant="link">See all</Button>
      </div>
      <div className="flex">
        <AddFriendItem />
      </div>
    </div>
  )
}

const AddFriendItem = ({ user }) => {
  return (
    <Card className="overflow-hidden shadow-xl">
      <CardContent className="relative w-[160px] p-0">
        <img
          src="https://github.com/shadcn.png"
          alt=""
          className="aspect-square w-full object-cover"
        />
        <Button
          className="absolute right-3 top-3 size-8 bg-[rgba(0,0,0,0.4)]"
          size="icon"
        >
          <X className="size-6" />
        </Button>
        <div className="mx-3 space-y-2 overflow-hidden border-t border-border pb-3 pt-2">
          <p className="whitespace-nowrap text-lg font-semibold leading-none">
            Nemo
          </p>
          <div className="flex items-center gap-1">
            <Avatar className="size-4">
              {/* <AvatarImage src={user.picture} alt={user.username} />
              <AvatarFallback>{getInitialsName(user)}</AvatarFallback> */}
              <AvatarImage src="https://github.com/shadcn.png" alt={"NEMO"} />
              <AvatarFallback>NM</AvatarFallback>
            </Avatar>
            <p className="whitespace-nowrap leading-none text-muted-foreground">
              42 mutual friends
            </p>
          </div>
          <Button variant="deemphasized" className="w-full">
            <i className="friends_suggestions_icon_16 filter-accent mr-1"></i>
            Add friend
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
