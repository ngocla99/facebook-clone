import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const CardFriend = ({ className }) => {
  return (
    <Card className={cn("overflow-hidden shadow-xl", className)}>
      <CardContent className="relative p-0">
        <img
          src="https://github.com/shadcn.png"
          alt=""
          className="aspect-square w-full object-cover"
        />
        <div className="mx-3 space-y-2 overflow-hidden border-t border-border pb-3 pt-2">
          <p className="whitespace-nowrap text-lg font-semibold leading-none">
            Nemo
          </p>
          <div className="flex items-center gap-1">
            <Avatar className="size-4">
              <AvatarImage src="https://github.com/shadcn.png" alt={"NEMO"} />
              <AvatarFallback>NM</AvatarFallback>
            </Avatar>
            <p className="whitespace-nowrap leading-none text-muted-foreground">
              42 mutual friends
            </p>
          </div>
          <Button variant="deemphasized" className="w-full">
            Add friend
          </Button>
          <Button variant="secondary" className="w-full">
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
