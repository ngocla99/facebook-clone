import React from "react"
import { getSavedPostsApi } from "@/api/services/post"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { SavedItem } from "./saved-item"

export const SavedView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: getSavedPostsApi,
  })
  const savedPosts = data?.savedPosts || []

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full mx-auto max-w-[1080px] px-2 py-4 sm:px-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">All</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" className="w-12">
              <i className="filter-category-icon"></i>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">More</TooltipContent>
        </Tooltip>
      </div>
      <div className="space-y-4">
        {savedPosts.map((item, index) => (
          <SavedItem key={index} item={item} />
        ))}
      </div>
    </div>
  )
}
