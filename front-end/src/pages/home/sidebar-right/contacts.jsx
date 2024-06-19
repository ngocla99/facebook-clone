import { Dots, Search } from "@/svg"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export const Contacts = ({ className }) => {
  return (
    <div className={cn("grid", className)}>
      <div className="mx-2 flex h-9 items-center justify-between">
        <h3 className="text-[17px] font-semibold text-muted-foreground">
          Contacts
        </h3>
        <div className="space-x-2">
          <Button
            size="sm"
            variant="ghost"
            className="w-8 rounded-full p-0 text-muted-foreground"
          >
            <Search />
          </Button>
          <Button
            variant="ghost"
            className="w-9 rounded-full p-0 text-muted-foreground"
          >
            <Dots />
          </Button>
        </div>
      </div>
      <div className="grid">
        {[1, 2, 3].map((itm, idx) => (
          <Button
            key={idx}
            variant="ghost"
            size="xl"
            className="justify-start gap-3 text-left"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>Nemo</p>
          </Button>
        ))}
      </div>
    </div>
  )
}
