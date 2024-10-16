import { DivideLayout } from "@/components/layouts/divide-layout"

import { SavedSideBar } from "./components/saved-side-bar"
import { SavedItemsList } from "./components/saved-view/saved-items-list"

export const Saved = () => {
  return (
    <DivideLayout>
      <SavedSideBar />
      <div>
        <SavedItemsList />
      </div>
    </DivideLayout>
  )
}
