import { Button } from "@/components/ui/button"

import { FriendsLayout } from "../friends-layout"

export const FriendHome = () => {
  return (
    <FriendsLayout>
      <div className="grid p-2">
        <div className="">
          <h3 className='text-[24px]'>Friends</h3>
          <i className="settings_filled_icon"></i>
        </div>
        <div className="grid">
          <i className="friends_home_icon"></i>
          <Button variant="ghost" className="justify-start flex">
            Home
          </Button>
          <i className="right_icon"></i>

          <i className="friends_requests_icon"></i>
          <i className="friends_suggestions_icon"></i>
          <i className="all_friends_icon"></i>
          <i className="birthdays_icon"></i>
          <i className="all_friends_icon"></i>
        </div>
      </div>
      <div>Right</div>
    </FriendsLayout>
  )
}
