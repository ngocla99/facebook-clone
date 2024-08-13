import { getFriendsPageInfoApi, getOthersApi } from "@/api/services/user"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { CardFriend } from "../components/card-friend"
import { CardOther } from "../components/card-other"

export const Right = ({ className }) => {
  const { data: friendsInfo, isLoadingFriends } = useQuery({
    queryKey: ["friends-page-info"],
    queryFn: getFriendsPageInfoApi,
  })

  const { data: othersInfo, isLoading: isLoadingOthers } = useQuery({
    queryKey: ["others"],
    queryFn: getOthersApi,
  })

  if (isLoadingFriends || isLoadingOthers) return "Loading..."

  return (
    <div className={cn("p-5", className)}>
      {friendsInfo?.requests?.length ? (
        <div className="grid">
          <div className="relative flex items-center justify-between p-4">
            <h3 className="text-xl font-bold leading-none">Friend Requests</h3>
            <Button
              variant="ghost"
              className="-mr-2 rounded-sm px-2 font-normal text-primary"
              disabled
            >
              See all
            </Button>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 px-4">
            {friendsInfo.requests.map((friend) => (
              <CardFriend key={friend._id} friend={friend} />
            ))}
          </div>
          <Button variant="ghost" className="mt-2 text-[#0064D1]" disabled>
            See more
            <i className="arrow_select_icon filter-accent ml-2"></i>
          </Button>
        </div>
      ) : null}
      {othersInfo?.others?.length ? (
        <>
          <Separator className="my-3" />
          <div className="relative flex items-center justify-between p-4">
            <h3 className="text-xl font-bold leading-none">
              People you may know
            </h3>
            <Button
              variant="ghost"
              className="-mr-2 rounded-sm px-2 font-normal text-primary"
              disabled
            >
              See all
            </Button>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 px-4">
            {othersInfo.others.map((other) => (
              <CardOther key={other._id} friend={other} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
