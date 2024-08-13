import { getOthersApi } from "@/api/services/user"
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"

import { cn, getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Return } from "@/assets/svg"

export const Left = ({ className }) => {
  const navigate = useNavigate()

  const { data: othersInfo, isLoading } = useQuery({
    queryKey: ["others"],
    queryFn: getOthersApi,
  })

  if (isLoading) return "Loading..."

  return (
    <div className={cn("pt-5", className)}>
      <div className="flex items-center gap-2 px-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-9 text-muted-foreground"
          onClick={() => navigate(-1)}
        >
          <Return />
        </Button>
        <div className="">
          <p className="text-sm text-muted-foreground">Friends</p>
          <h3 className="text-[24px] font-bold leading-none">Suggestions</h3>
        </div>
      </div>
      <div className="mt-2 px-2">
        <div className="px-2">
          <p className="text-lg font-semibold">People you may know</p>
        </div>
        {othersInfo.others.length ? (
          <div className="mt-1 grid">
            {othersInfo.others.map((other) => (
              <Link
                key={other._id}
                to=""
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className: "flex h-auto justify-start gap-3 px-2 py-[10px]",
                  })
                )}
              >
                <Avatar className="size-[60px]">
                  <AvatarImage src={other.picture} alt={other.username} />
                  <AvatarFallback>{getInitialsName(other)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="">{`${other.firstName} ${other.lastName}`}</p>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    <Button>Add friend</Button>
                    <Button variant="secondary" disabled>
                      Remove
                    </Button>
                  </div>
                </div>
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
