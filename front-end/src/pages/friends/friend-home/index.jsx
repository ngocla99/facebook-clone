import { Button } from "@/components/ui/button"

import { FriendsLayout } from "../friends-layout"

export const FriendHome = () => {
  return (
    <FriendsLayout>
      <div className="grid p-2">
        <div className="flex justify-between px-2 pt-1">
          <h3 className="text-[24px] font-bold">Friends</h3>
          <Button variant="secondary" size="icon" className="size-9">
            <i className="settings_filled_icon"></i>
          </Button>
        </div>
        <div className="mt-2 grid">
          <Button
            variant="ghost"
            size="xl"
            className="flex justify-start gap-3 px-2 text-lg"
          >
            <div className="grid size-9 place-items-center rounded-full bg-background-secondary">
              <i className="friends_home_icon"></i>
            </div>
            Home
          </Button>
          <Button
            variant="ghost"
            size="xl"
            className="flex justify-start gap-3 px-2 text-lg"
          >
            <div className="grid size-9 place-items-center rounded-full bg-background-secondary">
              <i className="friends_requests_icon"></i>
            </div>
            Friend Requests
            <i className="right_icon ml-auto"></i>
          </Button>
          <Button
            variant="ghost"
            size="xl"
            className="flex justify-start gap-3 px-2 text-lg"
          >
            <div className="grid size-9 place-items-center rounded-full bg-background-secondary">
              <i className="friends_suggestions_icon"></i>
            </div>
            Suggestions
            <i className="right_icon ml-auto"></i>
          </Button>
          <Button
            variant="ghost"
            size="xl"
            className="flex justify-start gap-3 px-2 text-lg"
          >
            <div className="grid size-9 place-items-center rounded-full bg-background-secondary">
              <i className="all_friends_icon"></i>
            </div>
            All friends
            <i className="right_icon ml-auto"></i>
          </Button>
          <Button
            variant="ghost"
            size="xl"
            className="flex justify-start gap-3 px-2 text-lg"
          >
            <div className="grid size-9 place-items-center rounded-full bg-background-secondary">
              <i className="birthdays_icon"></i>
            </div>
            Birth days
          </Button>
          <Button
            variant="ghost"
            size="xl"
            className="flex justify-start gap-3 px-2 text-lg"
          >
            <div className="grid size-9 place-items-center rounded-full bg-background-secondary">
              <i className="all_friends_icon"></i>
            </div>
            Custom Lists
            <i className="right_icon ml-auto"></i>
          </Button>
        </div>
      </div>
      <div>Right</div>
    </FriendsLayout>
  )
}
