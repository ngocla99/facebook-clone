import { FriendsLayout } from "../friends-layout"
import { Left } from "./left"
import { Right } from "./right"

export const FriendList = () => {
  return (
    <FriendsLayout>
      <Left />
      <Right />
    </FriendsLayout>
  )
}
