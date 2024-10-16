import { DivideLayout } from "@/components/layouts/divide-layout"

import { Left } from "./left"
import { Right } from "./right"

export const FriendHome = () => {
  return (
    <DivideLayout>
      <Left />
      <Right />
    </DivideLayout>
  )
}
