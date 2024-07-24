import { cn, isImageSrc } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

import { HeadOnBack, VIEWS } from "../post-form"

const postBackgrounds = {
  avatars: [
    "images/post-backgrounds/avatar1.webp",
    "images/post-backgrounds/avatar2.webp",
    "images/post-backgrounds/avatar3.webp",
    "images/post-backgrounds/avatar4.webp",
    "images/post-backgrounds/avatar5.webp",
  ],
  popular: [
    "images/post-backgrounds/popular1.jpg",
    "images/post-backgrounds/popular2.jpg",
    "images/post-backgrounds/popular3.jpg",
    "images/post-backgrounds/popular4.jpg",
    "images/post-backgrounds/popular5.jpg",
  ],
  new: [
    "images/post-backgrounds/new1.jpg",
    "images/post-backgrounds/new2.jpg",
    "images/post-backgrounds/new3.jpg",
    "images/post-backgrounds/new4.jpg",
    "images/post-backgrounds/new5.jpg",
  ],
  more: [
    "images/post-backgrounds/more1.jpg",
    "images/post-backgrounds/more2.jpg",
    "images/post-backgrounds/more3.jpg",
    "images/post-backgrounds/more4.jpg",
    "images/post-backgrounds/more5.jpg",
  ],
}

export const PostBackground = ({ form, setView }) => {
  const background = form.watch("background")

  const handleChangeBg = (data) => {
    if (!data) {
      return form.setValue("background", null)
    }

    if (isImageSrc(data)) {
      return form.setValue("background", data)
    }

    form.setValue("background", data)
  }

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
              <p className="px-2 py-4 text-lg font-semibold capitalize leading-5">
                {key}
              </p>
              <div className="grid grid-cols-5 gap-2">
                {images.map((itm) => (
                  <img
                    key={itm}
                    src={itm}
                    className={cn(
                      "size-20 rounded-lg",
                      background === itm && "border-[3px] border-primary"
                    )}
                    onClick={() => {
                      handleChangeBg(itm)
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
