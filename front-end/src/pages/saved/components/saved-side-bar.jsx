import { getCollectionsApi } from "@/api/services/collection"
import { useQuery } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "@/assets/svg"

export const SavedSideBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { data: collections, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollectionsApi,
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <aside className="grid p-2">
      {/* Header */}
      <div className="mx-2 mb-3 mt-1 flex flex-wrap items-center justify-between">
        <h1 className="text-2xl font-bold">Saved</h1>
        <Button size="icon" variant="secondary" className="size-9">
          <i className="settings_filled_icon"></i>
        </Button>
      </div>

      {/* Saved Items Section */}
      <Button
        variant={location.pathname === "/saved/items" ? "secondary" : "ghost"}
        size="xl"
        className="justify-start px-2"
        onClick={() => navigate("/saved/items")}
      >
        <div className="flex size-9 items-center justify-center rounded-full bg-[#1877F2] text-white">
          <i className="saved_items_icon invert"></i>
        </div>
        <span className="ml-3 hidden font-medium text-muted-foreground sm:inline">
          Saved Items
        </span>
      </Button>
      <div className="mx-2">
        <Separator className="my-2" />
      </div>

      {/* My Collections Section */}
      <div className="mb-6">
        <h2 className="mx-2 mb-2 font-semibold sm:text-lg">My collections</h2>
        {collections.map((collection) => (
          <Button
            key={collection._id}
            variant={
              location.pathname === `/saved/collection/${collection._id}`
                ? "secondary"
                : "ghost"
            }
            size="xl"
            className="w-full justify-start px-2"
            onClick={() => navigate(`/saved/collection/${collection._id}`)}
          >
            <img
              src={
                collection.posts[0]?.post?.images[0]?.url ??
                "https://placehold.co/400x400?text=No+Image"
              }
              alt="collection"
              className="size-9 rounded-lg"
            />
            <span className="ml-3 hidden text-gray-700 sm:inline">
              {collection.name}
            </span>
          </Button>
        ))}
      </div>

      {/* Create New Collection */}
      <div className="grid px-2">
        <Button variant="deemphasized">
          <Plus className="mr-2 size-4" />{" "}
          <span className="hidden sm:inline">Create new collection</span>
        </Button>
      </div>
    </aside>
  )
}
