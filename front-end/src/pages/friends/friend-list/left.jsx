import { getFriendsPageInfoApi } from "@/api/services/user"
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"

import { cn, getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SearchInput } from "@/components/input/search-input"
import { Dots, Return } from "@/assets/svg"

export const Left = ({ className }) => {
  const { username } = useParams()
  const navigate = useNavigate()

  const { data: friendsInfo, isLoading } = useQuery({
    queryKey: ["friends-page-info"],
    queryFn: getFriendsPageInfoApi,
  })

  if (isLoading) return "Loading..."

  return (
    <div className={cn("pt-5", className)}>
      <div className="flex items-center gap-2 px-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-9 text-muted-foreground"
          onClick={() => navigate("/friends")}
        >
          <Return />
        </Button>
        <div className="">
          <p className="text-sm text-muted-foreground">Friends</p>
          <h3 className="text-[24px] font-bold leading-none">All Friends</h3>
        </div>
      </div>
      <div className="mt-4 px-4">
        <SearchInput placeholder="Search friends" disabled />
        <Separator className="my-4" />
      </div>
      <div className="mt-2 px-2">
        {friendsInfo.friends.length ? (
          <div className="grid">
            <p className="px-2 text-lg font-semibold">
              {friendsInfo.friends.length} friends
            </p>
            {friendsInfo.friends.map((other) => (
              <Link
                key={other._id}
                to={`/friends/list/${other.username}`}
                className={cn(
                  buttonVariants({
                    variant:
                      username === other.username ? "secondary" : "ghost",
                    className: "flex h-auto justify-start gap-3 p-2",
                  })
                )}
              >
                <Avatar className="size-[60px]">
                  <AvatarImage src={other.picture} alt={other.username} />
                  <AvatarFallback>{getInitialsName(other)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="">{`${other.firstName} ${other.lastName}`}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="z-10 text-muted-foreground"
                >
                  <Dots />
                </Button>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <p className="text-sm leading-none text-muted-foreground">
              No suggestions
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
