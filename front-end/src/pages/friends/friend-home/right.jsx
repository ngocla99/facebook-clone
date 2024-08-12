import { getFriendsPageInfo } from "@/api/services/user"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { CardFriend } from "../components/card-friend"

export const Right = ({ className }) => {
  const { data: friendsInfo } = useQuery({
    queryKey: ["friends-page-info"],
    queryFn: getFriendsPageInfo,
  })

  console.log("🚀 ~ Right ~ friendsInfo:", friendsInfo)
  return (
    <div className={cn("p-5", className)}>
      <div className="relative flex items-center justify-between p-4">
        <h3 className="text-xl font-bold leading-none">Friend Requests</h3>
        <Button variant="ghost" className="-mr-2 rounded-sm px-2 text-primary">
          See all
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 px-4 [&>div]:min-w-[200px] [&>div]:max-w-[250px]">
        {friendsInfo.requests.map((friend) => (
          <CardFriend
            key={friend._id}
            friend={friend}
            className="shrink grow basis-0"
          />
        ))}
        <div className="invisible shrink grow basis-0"></div>
        <div className="invisible shrink grow basis-0"></div>
        <div className="invisible shrink grow basis-0"></div>
        <div className="invisible shrink grow basis-0"></div>
        <div className="invisible shrink grow basis-0"></div>
      </div>
    </div>
  )
}
