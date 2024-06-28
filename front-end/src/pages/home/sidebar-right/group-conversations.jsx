import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export const GroupConversations = ({ className }) => {
  return (
    <div className={cn("grid", className)}>
      <div className="mx-2 flex h-9 items-center justify-between">
        <h3 className="text-[17px] font-semibold text-muted-foreground">
          Group conversations
        </h3>
      </div>
      <div className="grid">
        {[1, 2, 3].map((itm, idx) => (
          <Button
            key={idx}
            variant="ghost"
            size="xl"
            className="justify-start gap-3 px-2 text-left"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>Nemo</p>
          </Button>
        ))}
        <Button
          variant="ghost"
          size="xl"
          className="justify-start gap-3 px-2 text-left"
        >
          <div className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full bg-background-secondary">
            <i className="plus_icon"></i>
          </div>
          <p>Create new group</p>
        </Button>
      </div>
    </div>
  )
}
