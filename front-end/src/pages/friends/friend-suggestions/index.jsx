import { PreviewProfile } from "../components/preview-profile"
import { FriendsLayout } from "../friends-layout"
import { Left } from "./left"

export const FriendSuggestions = () => {
  return (
    <FriendsLayout>
      <Left />
      <PreviewProfile />
    </FriendsLayout>
  )
}
