import React from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { SavedItem } from "./saved-item"

export const SavedItemsList = () => {
  const savedItems = [
    {
      title:
        "Trong mọi việc luôn có việc quan trọng thuộc Top 1% (nghĩa là nó mang lại đại đa số kết quả, mặc dù nó lực rất ít). Anh em Dev trên 30 tuổi nên tham gia buổi này, nếu...",
      image: "https://picsum.photos/800/600?random=1",
      savedFrom: "Trần Quốc Huy",
      avatarSrc: "https://picsum.photos/200/200?random=3",
    },
    {
      title: "Hướng dẫn chụp ảnh sống ảo thật đẹp 😋",
      video: true,
      thumbnail: "https://picsum.photos/800/600?random=2",
      duration: "04:00",
      type: "Video • Bánh Bao TV",
      savedFrom: "Bánh Bao TV",
      avatarSrc: "https://picsum.photos/200/200?random=4",
    },
    // Add more items as needed
  ]

  return (
    <div className="mx-auto max-w-[1080px] px-8 py-4">
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
        {savedItems.map((item, index) => (
          <SavedItem key={index} item={item} />
        ))}
      </div>
    </div>
  )
}
