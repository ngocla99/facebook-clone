import { PreviewProfile } from "../components/preview-profile"
import { FriendsLayout } from "../friends-layout"
import { Left } from "./left"

export const FriendRequests = () => {
  return (
    <FriendsLayout>
      <Left />
      <PreviewProfile />
    </FriendsLayout>
  )
}
