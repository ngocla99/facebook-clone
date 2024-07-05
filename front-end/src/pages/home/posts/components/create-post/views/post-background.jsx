import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

import { HeadOnBack, VIEWS } from "../create-post-form"

const postBackgrounds = {
  avatars: [
    "images/postBackgrounds/avatar1.webp",
    "images/postBackgrounds/avatar2.webp",
    "images/postBackgrounds/avatar3.webp",
    "images/postBackgrounds/avatar4.webp",
    "images/postBackgrounds/avatar5.webp",
  ],
  popular: [
    "images/postBackgrounds/popular1.jpg",
    "images/postBackgrounds/popular2.jpg",
    "images/postBackgrounds/popular3.jpg",
    "images/postBackgrounds/popular4.jpg",
    "images/postBackgrounds/popular5.jpg",
  ],
  new: [
    "images/postBackgrounds/new1.jpg",
    "images/postBackgrounds/new2.jpg",
    "images/postBackgrounds/new3.jpg",
    "images/postBackgrounds/new4.jpg",
    "images/postBackgrounds/new5.jpg",
  ],
  more: [
    "images/postBackgrounds/more1.jpg",
    "images/postBackgrounds/more2.jpg",
    "images/postBackgrounds/more3.jpg",
    "images/postBackgrounds/more4.jpg",
    "images/postBackgrounds/more5.jpg",
  ],
}

export const PostBackgound = ({ background, setView, onChangeBg }) => {
  console.log("🚀 ~ PostBackgound ~ background:", background)
  return (
    <>
      <HeadOnBack
        title="Choose Background"
        onBack={() => setView(VIEWS.ROOT)}
      />
      <ScrollArea className="h-[410px]">
        <div className="grid gap-8 p-4">
          {Object.entries(postBackgrounds).map(([key, images]) => (
            <div key={key}>
              <p className="px-2 py-4 text-[17px] font-semibold capitalize leading-5">
                {key}
              </p>
              <div className="grid grid-cols-5 gap-2">
                {images.map((itm) => (
                  <img
                    key={itm}
                    src={itm}
                    className={cn(
                      "size-20 rounded-lg",
                      background === `url(${itm})` &&
                        "border-[3px] border-primary"
                    )}
                    onClick={() => {
                      onChangeBg(`url(${itm})`)
                      setView(VIEWS.ROOT)
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}
