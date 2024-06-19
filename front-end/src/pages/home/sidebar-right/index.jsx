import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { Birthdays } from "./birthdays"
import { Contacts } from "./contacts"
import { FriendRequests } from "./friend-request"
import { GroupConversations } from "./group-conversations"

export const SidebarRight = ({ className }) => {
  return (
    <div className={className}>
      <ScrollArea className="h-[calc(100vh-56px)] w-[360px]">
        <div className="mt-4 grid px-2">
          <FriendRequests />
          <Divider />
          <Birthdays />
          <Divider />
          <Contacts />
          <Divider />
          <GroupConversations />
        </div>
      </ScrollArea>
    </div>
  )
}

const Divider = () => {
  return (
    <div className="mx-2">
      <Separator className="my-2" />
    </div>
  )
}
