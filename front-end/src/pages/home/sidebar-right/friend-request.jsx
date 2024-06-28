import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export const FriendRequests = ({ className }) => {
  return (
    <div className={cn("grid", className)}>
      <div className="mx-2 flex h-9 items-center justify-between">
        <h3 className="text-[17px] font-semibold text-muted-foreground">
          Friend requests
        </h3>
        <Button
          variant="ghost"
          className="h-9 rounded-sm px-2 text-[15px] font-normal text-[#0064d1] hover:text-[#0064d1]"
        >
          See all
        </Button>
      </div>
      <Button
        asChild
        size="lg"
        variant="ghost"
        className="flex h-auto justify-start gap-4 px-2 py-[10px]"
      >
        <div>
          <Avatar className="h-[60px] w-[60px]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 gap-2">
            <div className="flex justify-between leading-[20px]">
              <p className="text-[15px]">Lan Anh</p>
              <span className="text-[13px] text-muted-foreground">5d</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button>Confirm</Button>
              <Button variant="secondary">Delete</Button>
            </div>
          </div>
        </div>
      </Button>
    </div>
  )
}
