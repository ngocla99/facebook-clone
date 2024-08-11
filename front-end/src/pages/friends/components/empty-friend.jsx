import { cn } from "@/lib/utils"
import { FriendEmpty } from "@/assets/svg"

export const EmptyFriend = ({ className, title }) => {
  return (
    <div
      className={cn(
        "grid h-full w-full place-content-center place-items-center px-4",
        className
      )}
    >
      <FriendEmpty className="mb-5" />
      <h3 className="text-center text-xl font-bold text-muted-foreground">
        {title}
      </h3>
    </div>
  )
}
