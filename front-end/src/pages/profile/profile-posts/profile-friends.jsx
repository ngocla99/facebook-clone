import { Link, useParams } from "react-router-dom"

import { useProfile } from "@/hooks/use-profile"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const ProfileFriends = ({ className }) => {
  const { username } = useParams()
  const { data: user } = useProfile(username)

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="relative flex items-center justify-between">
          <Link
            to=""
            className="cursor-pointer text-xl font-bold leading-none hover:underline hover:underline-offset-1"
          >
            Friends
          </Link>
          <Button
            variant="ghost"
            className="absolute -bottom-2 -right-2 rounded-sm px-2 text-lg font-normal text-primary"
          >
            See all friends
          </Button>
        </div>

        {user?.friends?.length ? (
          <>
            <p className="mt-2 text-lg leading-none text-muted-foreground">
              {user.totalFriends}{" "}
              {user.totalFriends === 1 ? "friend" : "friends"}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {user.friends.map((friend) => (
                <div key={friend._id}>
                  <div className="relative after:absolute after:inset-0 after:rounded-md after:content-[''] hover:after:bg-hover active:after:bg-[rgba(0,0,0,0.1)]">
                    <img
                      src={friend.picture}
                      alt={friend.username}
                      className="aspect-square rounded-lg border border-border object-cover"
                    />
                  </div>
                  <p className="mt-1 text-sm font-semibold">Nemo</p>
                  <p className="text-sm leading-none text-muted-foreground">
                    1 mutual friends
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
