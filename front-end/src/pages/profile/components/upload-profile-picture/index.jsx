import { useProfilePictureModal } from "@/stores"

import { cn, getInitialsName } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { ProfilePictureModal } from "./profile-picture-modal"

export const UploadProfilePicture = ({ user, className }) => {
  const profilePictureModal = useProfilePictureModal()
  return (
    <div className={cn("z-10", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div className="size-[178px] rounded-full bg-white shadow-[0_0_0_3px_white]">
            <Avatar
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-[176px] cursor-pointer overflow-visible rounded-full border border-border active:scale-[0.96]"
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
          </div>
        </PopoverTrigger>
        <PopoverContent className="grid p-2 shadow-2xl drop-shadow">
          <Button
            variant="ghost"
            className="justify-start px-2 leading-5"
            onClick={() => profilePictureModal.onOpen()}
          >
            <i className="camera_icon_20 mr-3"></i>
            Choose profile picture
          </Button>
        </PopoverContent>
      </Popover>
      <ProfilePictureModal />
    </div>
  )
}
