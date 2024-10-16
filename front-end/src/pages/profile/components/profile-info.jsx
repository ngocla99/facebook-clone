import { Link, useParams } from "react-router-dom"

import { cn, getInitialsName } from "@/lib/utils"
import { useProfile } from "@/hooks/use-profile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "@/assets/svg"

import { AddFriendList } from "./add-friend-list"
import { FriendRequestActions } from "./friend-request-actions"
import { FriendshipActions } from "./friendship-actions"
import { UploadProfileCover } from "./upload-profile-cover"
import { UploadProfilePicture } from "./upload-profile-picture"

export const ProfileInfo = ({ className }) => {
  const { username } = useParams()
  const { data: user } = useProfile(username)

  if (!user) return null

  return (
    <div className={cn("", className)}>
      <UploadProfileCover user={user} />
      <div className="px-4">
        <div className="relative flex flex-col items-center gap-2 lg:flex-row lg:gap-3">
          <UploadProfilePicture
            className="-mt-[84px] lg:absolute lg:bottom-0 lg:mt-0"
            user={user}
          />
          <div className="mr-4 w-[174px]"></div>
          <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2 lg:pb-4 lg:pt-8">
            <div className="flex flex-col items-center gap-3 lg:items-start">
              <div className="flex flex-wrap justify-center text-[32px] leading-none">
                <h3 className="font-bold">
                  {user.firstName + " " + user.lastName}
                </h3>
                <span className="ml-4 font-normal">(Nemo)</span>
              </div>

              {user.friends.length ? (
                <>
                  <Link
                    to=""
                    className="font-semibold leading-none text-muted-foreground hover:underline hover:underline-offset-1"
                  >{`${user.friends.length} friends`}</Link>
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    {user.friends.map((friend) => (
                      <Avatar
                        key={friend._id}
                        className="z-[2] size-8 cursor-pointer border border-[rbga(0,0,0,0.1)] bg-background shadow-[0_0_0_1px_white]"
                      >
                        <AvatarImage
                          src={friend.picture}
                          alt={friend.username}
                        />
                        <AvatarFallback>
                          {getInitialsName(friend)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <div className="min-[375px]-items-end flex flex-wrap justify-center gap-2 min-[375px]:justify-end">
              {!user.isVisitor ? (
                <>
                  <Button>
                    <Plus className="mr-1.5 size-4" />
                    Add to story
                  </Button>
                  <Button variant="secondary">
                    <i className="edit_icon_16 filter-primary-icon mr-1.5"></i>
                    Edit profile
                  </Button>
                </>
              ) : (
                <>
                  <FriendshipActions />
                  <Button
                    variant={user.friendship.friends ? "default" : "secondary"}
                  >
                    <img
                      src="/icons/single/message.png"
                      alt="message"
                      className={cn(
                        "mr-1.5",
                        user.friendship.friends && "invert"
                      )}
                    />
                    Message
                  </Button>
                </>
              )}

              <Button
                variant="secondary"
                className="w-[48px] max-[400px]:flex-1"
              >
                <i className="arrow_up_icon filter-primary-icon"></i>
              </Button>
            </div>
          </div>
        </div>
        <AddFriendList className="relative z-20 mt-2" />
        <FriendRequestActions className="relative z-20 mt-4" />
        <Separator className="mt-4" />
      </div>
    </div>
  )
}
