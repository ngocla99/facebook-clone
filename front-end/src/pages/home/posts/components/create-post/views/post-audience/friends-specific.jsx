import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchInput } from "@/components/input/search-input"

import { HeadOnBack, VIEWS } from "../../create-post-form"

export const FriendsSpecific = ({ setView }) => {
  return (
    <>
      <HeadOnBack
        title="Specific Friends"
        onBack={() => setView(VIEWS.AUDIENCE)}
      />
      <div className="px-4 py-3">
        <SearchInput placeholder="Search for a friend or list..." />
      </div>
      <ScrollArea className="h-[380px]">
        <div className="grid px-2">
          <h3 className="px-2 pb-1 text-[17px] font-semibold">Friends</h3>

          <Button
            variant="ghost"
            size="xl"
            className="group gap-3 px-2 text-left"
          >
            <Avatar className="size-9">
              <AvatarImage src="" />
              <AvatarFallback>NM</AvatarFallback>
            </Avatar>
            <div className="flex-1 py-3">
              <p className="text-[15px] leading-5">Lanh</p>
              <p></p>
            </div>
            <i className="remove_icon group-hover:hidden"></i>
            <i className="remove_icon_active hidden group-hover:block"></i>
          </Button>
          <Button
            variant="ghost"
            size="xl"
            className="group gap-3 px-2 text-left"
          >
            <Avatar className="size-9">
              <AvatarImage src="" />
              <AvatarFallback>NM</AvatarFallback>
            </Avatar>
            <div className="flex-1 py-3">
              <p className="text-[15px] leading-5">Nemo</p>
              <p></p>
            </div>
            <i className="remove_icon group-hover:hidden"></i>
            <i className="remove_icon_active hidden group-hover:block"></i>
          </Button>
        </div>
      </ScrollArea>
      <DialogFooter className="px-4 py-3 shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
        <Button
          variant="ghost"
          className="text-primary hover:text-primary"
          onClick={() => setView(VIEWS.AUDIENCE)}
        >
          Cancel
        </Button>
        <Button className="w-[170px] text-[15px]">Save Change</Button>
      </DialogFooter>
    </>
  )
}
