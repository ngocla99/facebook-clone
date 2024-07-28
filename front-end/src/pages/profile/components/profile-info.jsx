import { useProfilePictureModal, useProfileUser } from "@/stores"

import { cn, getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Plus } from "@/assets/svg"

import { AddFriendList } from "./add-friend-list"
import { ProfilePictureModal } from "./upload-profile-picture/profile-picture-modal"

export const ProfileInfo = ({ className }) => {
  const { user } = useProfileUser()
  const profilePictureModal = useProfilePictureModal()

  if (!user) return null

  return (
    <div className={cn("", className)}>
      <div
        className={
          "relative overflow-hidden rounded-bl-lg rounded-br-lg bg-background-comment hover:bg-hover"
        }
      >
        <div className="pt-[38%]"></div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-end bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.6)] px-5 py-[22px]">
          {!user.isVisitor && (
            <Button
              className="mx-3 gap-2 bg-white font-semibold hover:bg-background-comment"
              variant="secondary"
            >
              <i className="camera_filled_icon"></i>
              <p className="hidden lg:block">Add cover photo</p>
            </Button>
          )}
        </div>
      </div>
      <div className="px-4">
        <div className="relative flex flex-col items-center gap-2 lg:flex-row lg:gap-3">
          <div className="-mt-[84px] lg:absolute lg:bottom-0 lg:mt-0">
            <div className="">
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-[176px] cursor-pointer overflow-visible rounded-full border border-border bg-white shadow-[0_0_0_4px_white] active:scale-[0.96]"
                    )}
                  >
                    <AvatarImage
                      className="rounded-full"
                      src={user.picture}
                      alt={user.username}
                    />
                    <AvatarFallback>{getInitialsName(user)}</AvatarFallback>
                    {!user.isVisitor && (
                      <Button
                        variant="secondary"
                        className="absolute bottom-3 right-1 z-[1] size-9"
                        size="icon"
                        onClick={(e) => {
                          e.preventDefault()
                          profilePictureModal.onOpen()
                        }}
                      >
                        <i className="camera_filled_icon_20 filter-primary-icon"></i>
                      </Button>
                    )}
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="grid p-2 shadow-2xl drop-shadow">
                  <Button
                    variant="ghost"
                    className="justify-start px-2 leading-5"
                    onClick={() => profilePictureModal.onOpen()}
                  >
                    <i className="camera_icon_20 mr-2"></i>
                    Choose profile picture
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mr-4 w-[174px]"></div>
          <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2 lg:pb-4 lg:pt-8">
            <div className="flex flex-col items-center gap-3 lg:items-start">
              <h3 className="text-[32px] font-bold leading-none">
                {user.firstName + " " + user.lastName}
                <span className="ml-4 font-normal">(Nemo)</span>
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
                  <Button>
                    <img
                      src="/icons/addFriend.png"
                      alt=""
                      className="mr-1.5 invert"
                    />
                    Add friend
                  </Button>
                  <Button variant="secondary">
                    <img src="/icons/message.png" alt="" className="mr-1.5" />
                    Message
                  </Button>
                </>
              )}

              <Button variant="secondary" className="w-[48px]">
                <i className="arrow_up_icon filter-primary-icon"></i>
              </Button>
            </div>
          </div>
        </div>
        <AddFriendList className="mt-2" />
        <Separator className="mt-4" />
      </div>
      <ProfilePictureModal />
    </div>
  )
}
