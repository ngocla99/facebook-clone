import { DivideLayout } from "@/components/layouts/divide-layout"

import { PreviewProfile } from "../components/preview-profile"
import { Left } from "./left"

export const FriendList = () => {
  return (
    <DivideLayout>
      <Left />
      <PreviewProfile />
    </DivideLayout>
  )
}
