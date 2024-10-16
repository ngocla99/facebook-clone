import { DivideLayout } from "@/components/layouts/divide-layout"

import { PreviewProfile } from "../components/preview-profile"
import { Left } from "./left"

export const FriendSuggestions = () => {
  return (
    <DivideLayout>
      <Left />
      <PreviewProfile />
    </DivideLayout>
  )
}
