import { cn } from "@/lib/utils"

import { EmptyFriend } from "../components/empty-friend"

export const Right = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <EmptyFriend title="Select people's names to preview their profile." />
    </div>
  )
}
