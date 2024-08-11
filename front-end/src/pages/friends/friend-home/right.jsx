import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { CardFriend } from "../components/card-friend"

export const Right = ({ className }) => {
  return (
    <div className={cn("p-5", className)}>
      <div className="relative flex items-center justify-between p-4">
        <h3 className="text-xl font-bold leading-none">People you may know</h3>
        <Button variant="ghost" className="-mr-2 rounded-sm px-2 text-primary">
          See all
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 px-4 [&>div]:min-w-[200px] [&>div]:max-w-[250px]">
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <CardFriend className="shrink grow basis-0" />
        <div className="invisible shrink grow basis-0"></div>
        <div className="invisible shrink grow basis-0"></div>
        <div className="invisible shrink grow basis-0"></div>
        <div className="invisible shrink grow basis-0"></div>
        <div className="invisible shrink grow basis-0"></div>
      </div>
    </div>
  )
}
