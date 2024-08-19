import { cn } from "@/lib/utils"
import { InfoFooter } from "@/components/layouts/info-footer"

import { PostManagement } from "./posts-management"
import { ProfileFriends } from "./profile-friends"
import { ProfileIntro } from "./profile-intro"
import { ProfilePhotos } from "./profile-photos"

export const ProfilePosts = ({ className }) => {
  return (
    <div
      className={cn(
        "container mt-4 flex flex-col items-center gap-4 min-[400px]:px-4 lg:flex-row lg:items-start",
        className
      )}
    >
      <div className="grid w-full max-w-[680px] flex-grow-[18] basis-[360px] gap-4">
        <ProfileIntro />
        <ProfilePhotos />
        <ProfileFriends />
        <InfoFooter />
      </div>
      <PostManagement className="grid max-w-[680px] flex-grow-[25] basis-[500px] gap-4" />
    </div>
  )
}
