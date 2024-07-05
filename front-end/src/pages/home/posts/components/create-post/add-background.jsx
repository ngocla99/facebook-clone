import React from "react"

import { cn } from "@/lib/utils"

const postBackgrounds = {
  avatar: [
    "images/postBackgrounds/avatar1.webp",
    "images/postBackgrounds/avatar2.webp",
    "images/postBackgrounds/avatar3.webp",
    "images/postBackgrounds/avatar4.webp",
    "images/postBackgrounds/avatar5.webp",
  ],
  new: [
    "images/postBackgrounds/new1.jpg",
    "images/postBackgrounds/new2.jpg",
    "images/postBackgrounds/new3.jpg",
    "images/postBackgrounds/new4.jpg",
    "images/postBackgrounds/new5.jpg",
  ],
  popular: [
    "images/postBackgrounds/popular1.jpg",
    "images/postBackgrounds/popular2.jpg",
    "images/postBackgrounds/popular3.jpg",
    "images/postBackgrounds/popula4.jpg",
    "images/postBackgrounds/popular5.jpg",
  ],
  color: ["#c600ff", "#e2013b", "#111111"],
}

const shadowClassNameDefault =
  "shadow-[inset_0_0_0_2px_#ffffff,0_0_5px_0_rgba(0,0,0,0.2)]"

const shadowClassName =
  "shadow-[inset_0_0_0_2px_#ffffff,0_0_4px_0_rgba(0,0,0,0.1)]"

export const AddBackground = ({ backGround, onChangeBg }) => {
  const [showMore, setShowMore] = React.useState(false)

  return (
    <div className="">
      {!showMore ? (
        <img
          src="icons/colorful.png"
          alt="Post Background"
          className="size-[38px]"
          onClick={() => setShowMore(true)}
        />
      ) : (
        <div className="flex gap-2">
          <div
            className="flex size-8 items-center justify-center rounded-lg bg-background-secondary"
            onClick={() => setShowMore(false)}
          >
            <i className="arrow_left_icon"></i>
          </div>
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-lg bg-background-comment",
              !backGround && shadowClassNameDefault
            )}
            onClick={() => onChangeBg(null)}
          ></div>
          {postBackgrounds.avatar.map((src) => (
            <div
              key={src}
              className={cn(
                "size-8 rounded-lg border-none bg-contain",
                backGround === `url(${src})` && shadowClassName
              )}
              style={{ backgroundImage: `url(${src})` }}
              onClick={() => onChangeBg(`url(${src})`)}
            ></div>
          ))}
          {postBackgrounds.color.map((color) => (
            <div
              className={cn(
                `size-8 rounded-lg border-none`,
                backGround === color && shadowClassName
              )}
              style={{ backgroundColor: color }}
              onClick={() => onChangeBg(color)}
            ></div>
          ))}
          <div
            className="flex size-8 items-center justify-center rounded-lg bg-background-secondary"
            onClick={() => {}}
          >
            <i className="more_icon"></i>
          </div>
        </div>
      )}
    </div>
  )
}
