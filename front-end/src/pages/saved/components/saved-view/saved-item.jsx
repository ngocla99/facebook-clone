import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dots } from "@/assets/svg"

export const SavedItem = ({ item }) => (
  <Card className="overflow-hidden">
    <CardContent className="flex p-4">
      {item.type === "COVER_PHOTO" && item.images.length > 0 ? (
        <img
          src={item.images[0].url}
          alt={item.text}
          className="mr-4 size-[144px] rounded-md object-cover"
        />
      ) : item.type === null && item.text ? (
        <div className="rounded-md bg-yellow-200 p-4">
          <p>{item.text}</p>
        </div>
      ) : null}
      <div className="flex-1">
        <h3 className="mb-0.5 line-clamp-2 cursor-pointer overflow-hidden text-xl font-bold underline-offset-1 hover:underline">
          {item.type === "COVER_PHOTO" ? item.text : "1 Photo"}
        </h3>
        {item.type && <p className="mb-1 text-sm text-gray-600">{item.type}</p>}
        <div className="flex items-center gap-[2px]">
          <p className="text-sm text-muted-foreground">
            Post • Saved to <span className="text-foreground">For later</span>
          </p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Avatar className="size-6">
            <AvatarImage src={item.avatarSrc} alt={item.savedFrom} />
            <AvatarFallback>{item.savedFrom}</AvatarFallback>
          </Avatar>
          <p className="text-xs text-muted-foreground">
            Saved to{" "}
            <span className="text-foreground">{item.savedFrom}'s post</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2 px-3 py-4">
          <Button variant="secondary" className="px-10">
            Add to Collection
          </Button>
          <Button variant="secondary" className="w-12">
            <i className="share-icon"></i>
          </Button>
          <Button variant="secondary" className="w-12">
            <Dots className="size-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
)
