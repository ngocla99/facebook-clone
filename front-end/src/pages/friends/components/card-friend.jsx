import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const CardFriend = ({ className, friend, onConfirm, onDelete }) => {
  return (
    <Card className={cn("overflow-hidden shadow-xl", className)}>
      <CardContent className="relative p-0">
        <img
          src={friend.picture}
          alt={friend.username}
          className="aspect-square w-full object-cover"
        />
        <div className="mx-3 space-y-2 overflow-hidden border-t border-border pb-3 pt-2">
          <p className="whitespace-nowrap text-lg font-semibold leading-none">
            {`${friend.firstName} ${friend.lastName}`}
          </p>
          <div className="flex items-center gap-1">
            <p className="whitespace-nowrap leading-none text-muted-foreground h-[15px]">
              {/* 42 mutual friends */}
            </p>
          </div>
          <Button className="w-full" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="secondary" className="w-full" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
