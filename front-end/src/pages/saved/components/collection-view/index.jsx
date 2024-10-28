import React from "react"
import { useMe } from "@/hooks"
import { PlusIcon } from "@radix-ui/react-icons"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dots } from "@/assets/svg"

export const CollectionView = () => {
  const { data: me } = useMe()
  // Mock data for demonstration
  const savedItems = [
    {
      id: 1,
      title: "Em có thể thiếu người yêu nhưng đồ ăn thì không",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "Hướng dẫn chụp ảnh sống ảo thật đẹp",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1638&q=80",
    },
    // Add more items as needed
  ]

  return (
    <div>
      <div className="w-full bg-card">
        <div className="mx-auto mb-6 flex w-full max-w-[1218px] items-end justify-between p-4">
          <div className="space-y-3">
            <h1 className="text-[28px] font-bold">For later</h1>
            <div className="flex items-center gap-1 text-lg text-muted-foreground">
              <img
                src="/icons/size/12/private.png"
                className="filter-secondary-icon"
                alt="lock"
              />
              Only me
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src={me?.picture} alt="User" />
              <AvatarFallback>{me?.firstName}</AvatarFallback>
            </Avatar>
            <Button className="text-white">
              <PlusIcon className="mr-2 h-4 w-4" /> Invite
            </Button>
            <Button variant="secondary" className="px-4">
              <Dots className="size-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto grid w-[500px] gap-4">
        {savedItems.map((item) => (
          <Card key={item.id} className="overflow-hidden p-4">
            <CardContent className="flex gap-4 p-0">
              <img
                src={item.image}
                alt={item.title}
                className="size-[144px] min-w-[144px] rounded-lg object-cover"
              />
              <div>
                <h2 className="line-clamp-2 text-xl font-bold">{item.title}</h2>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  Video • 10 min
                </p>
              </div>
              <Button variant="secondary" className="px-4">
                <Dots className="size-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
