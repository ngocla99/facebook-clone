import { Outlet } from "react-router-dom"

import { DivideLayout } from "@/components/layouts/divide-layout"

import { SavedSideBar } from "./components/saved-side-bar"

export const Saved = () => {
  return (
    <DivideLayout>
      <SavedSideBar />
      <Outlet />
    </DivideLayout>
  )
}
