import { cn, getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "@/assets/svg"

import { AddFriendList } from "./add-friend-list"

export const ProfileInfo = ({ user }) => {
  return (
    <div className="container">
      <div className="relative overflow-hidden rounded-bl-lg rounded-br-lg bg-background-comment hover:bg-hover">
        <div className="pt-[38%]"></div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-end bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.6)] px-5 py-[22px]">
          <Button
            className="mx-3 gap-2 bg-white font-semibold hover:bg-background-comment"
            variant="secondary"
          >
            <i className="camera_filled_icon"></i>
            Add cover photo
          </Button>
        </div>
      </div>
      <div className="px-8">
        <div className="relative flex gap-3">
          <div className="absolute bottom-0">
            <div className="">
              <Avatar
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-[176px] cursor-pointer rounded-full border border-border bg-white shadow-[0_0_0_4px_white] active:scale-[0.96] overflow-visible"
                )}
              >
                <AvatarImage src={user.picture} alt={user.username} />
                <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
                <Button
                  variant="secondary"
                  className="z-[1] absolute bottom-3 right-1 size-9"
                  size="icon"
                >
                  <i className="camera_filled_icon_20 filter-primary-icon"></i>
                </Button>
              </Avatar>
            </div>
          </div>
          <div className="mr-4 w-[174px]"></div>
          <div className="grid flex-1 grid-cols-2 pb-4 pt-8">
            <div className="space-y-3">
              <h3 className="text-[32px] font-bold leading-none">
                {user.firstName + " " + user.lastName}
              </h3>
              <p className="font-semibold leading-none text-muted-foreground">{`${754} friends`}</p>
              <div className="flex -space-x-1">
                <Avatar className="z-[2] size-8 cursor-pointer shadow-[0_0_0_2px_white]">
                  <AvatarImage src={user.picture} alt={user.username} />
                  <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
                </Avatar>
                <Avatar className="z-[1] size-8 cursor-pointer shadow-[0_0_0_2px_white]">
                  <AvatarImage src={user.picture} alt={user.username} />
                  <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
                </Avatar>
                <Avatar className="size-8 cursor-pointer shadow-[0_0_0_2px_white]">
                  <AvatarImage src={user.picture} alt={user.username} />
                  <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="flex items-end justify-end gap-2">
              <Button>
                <Plus className="mr-1.5 size-4" />
                Add to story
              </Button>
              <Button variant="secondary">
                <i className="edit_icon_16 filter-primary-icon mr-1.5"></i>
                Edit profile
              </Button>
              <Button variant="secondary" className="w-[48px]">
                <i className="arrow_up_icon filter-primary-icon"></i>
              </Button>
            </div>
          </div>
        </div>
        <AddFriendList className="mt-2" />
        <Separator className="mt-4" />
      </div>
    </div>
  )
}
