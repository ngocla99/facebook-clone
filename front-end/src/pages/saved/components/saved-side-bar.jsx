import { SettingsIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const SavedSideBar = () => {
  return (
    <aside className="grid p-2">
      {/* Header */}
      <div className="mx-2 mb-3 mt-1 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Saved</h1>
        <Button size="icon" variant="secondary" className="size-9">
          <i className="settings_filled_icon"></i>
        </Button>
      </div>

      {/* Saved Items Section */}
      <Button variant="ghost" size="xl" className="justify-start px-2">
        <div className="flex size-9 items-center justify-center rounded-full bg-[#1877F2] text-white">
          <i className="saved_items_icon invert"></i>
        </div>
        <span className="ml-3 font-medium text-muted-foreground">
          Saved Items
        </span>
      </Button>
      <div className="mx-2">
        <Separator className="my-2" />
      </div>

      {/* My Collections Section */}
      <div className="mb-6">
        <h2 className="mx-2 mb-2 text-lg font-semibold">My collections</h2>
        <Button variant="ghost" size="xl" className="w-full justify-start px-2">
          <img
            src="https://via.placeholder.com/24"
            alt="collection"
            className="size-9 rounded-lg"
          />
          <span className="ml-3 text-gray-700">For later</span>
        </Button>
      </div>

      {/* Create New Collection */}
      <div className="grid px-2">
        <Button variant="deemphasized">+ Create new collection</Button>
      </div>
    </aside>
  )
}
