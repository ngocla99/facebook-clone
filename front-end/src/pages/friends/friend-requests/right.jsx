import { cn } from "@/lib/utils"

import { EmptyFriend } from "../components/empty-friend"

export const Right = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <EmptyFriend title="When you have friend requests or suggestions, you'll see them here." />
    </div>
  )
}
