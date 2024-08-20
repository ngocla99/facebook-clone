import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Plus } from "@/assets/svg"

import { Story } from "./story"

const DUMMY = [
  {
    profilePicture: "images/stories/profile1.jpg",
    profileName: "Elon Musk",
    image: "images/stories/1.jpg",
  },
  {
    profilePicture: "images/stories/profile2.jpg",
    profileName: "South park",
    image: "images/stories/2.png",
  },
  {
    profilePicture: "images/stories/profile3.png",
    profileName: "The Sopranos",
    image: "images/stories/3.jpg",
  },
  {
    profilePicture: "images/stories/profile4.jfif",
    profileName: "Football World",
    image: "images/stories/4.jpg",
  },
  {
    profilePicture: "images/stories/profile5.png",
    profileName: "The Witcher Wild Hunt",
    image: "images/stories/5.jfif",
  },
]

export const Stories = ({ className }) => {
  return (
    <div className={cn("relative h-[266px] w-full", className)}>
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 3,
        }}
        className="absolute w-full"
      >
        <CarouselContent className="m-0">
          <CarouselItem className="basis-auto py-2 pl-0">
            <Card className="group grid h-[250px] w-[140px] overflow-hidden hover:brightness-90">
              <CardContent className="flex flex-col p-0">
                <div className="flex-1 overflow-hidden">
                  <img
                    className="h-full object-cover transition-transform group-hover:scale-[1.02]"
                    src="https://github.com/shadcn.png"
                  />
                </div>

                <div className="relative px-4 pb-3 pt-7">
                  <div className="absolute right-1/2 top-0 flex h-10 w-10 translate-x-1/2 translate-y-[-50%] items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground">
                    <Plus />
                  </div>
                  <p className="text-center text-sm font-semibold leading-[9px]">
                    Create story
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>

          {DUMMY.map((itm) => (
            <CarouselItem
              className="basis-auto py-2 pl-2"
              key={itm.profileName}
            >
              <Story className="h-[250px]" story={itm} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
