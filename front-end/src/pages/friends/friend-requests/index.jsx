import { DivideLayout } from "@/components/layouts/divide-layout"

import { PreviewProfile } from "../components/preview-profile"
import { Left } from "./left"

export const FriendRequests = () => {
  return (
    <DivideLayout>
      <Left />
      <PreviewProfile />
    </DivideLayout>
  )
}
