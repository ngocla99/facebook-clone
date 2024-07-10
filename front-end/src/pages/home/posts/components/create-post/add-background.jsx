import React from "react"

import { cn } from "@/lib/utils"

import { VIEWS } from "./create-post-form"

const postBackgrounds = {
  avatar: [
    "images/post-backgrounds/avatar1.webp",
    "images/post-backgrounds/avatar2.webp",
    "images/post-backgrounds/avatar3.webp",
    "images/post-backgrounds/avatar4.webp",
    "images/post-backgrounds/avatar5.webp",
  ],
  new: [
    "images/post-backgrounds/new1.jpg",
    "images/post-backgrounds/new2.jpg",
    "images/post-backgrounds/new3.jpg",
    "images/post-backgrounds/new4.jpg",
    "images/post-backgrounds/new5.jpg",
  ],
  popular: [
    "images/post-backgrounds/popular1.jpg",
    "images/post-backgrounds/popular2.jpg",
    "images/post-backgrounds/popular3.jpg",
    "images/post-backgrounds/popular4.jpg",
    "images/post-backgrounds/popular5.jpg",
  ],
  color: ["#c600ff", "#e2013b", "#111111"],
}

const shadowClassNameDefault =
  "shadow-[inset_0_0_0_2px_#ffffff,0_0_5px_0_rgba(0,0,0,0.2)]"

const shadowClassName =
  "shadow-[inset_0_0_0_2px_#ffffff,0_0_4px_0_rgba(0,0,0,0.1)]"

export const AddBackground = ({ background, onChangeBg, setView }) => {
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
              !background && shadowClassNameDefault
            )}
            onClick={() => onChangeBg(null)}
          ></div>
          {postBackgrounds.avatar.map((src) => (
            <div
              key={src}
              className={cn(
                "size-8 rounded-lg border-none bg-contain",
                background === `url(${src})` && shadowClassName
              )}
              style={{ backgroundImage: `url(${src})` }}
              onClick={() => onChangeBg(`url(${src})`)}
            ></div>
          ))}
          {postBackgrounds.color.map((color) => (
            <div
              className={cn(
                `size-8 rounded-lg border-none`,
                background === color && shadowClassName
              )}
              style={{ backgroundColor: color }}
              onClick={() => onChangeBg(color)}
            ></div>
          ))}
          <div
            className="flex size-8 items-center justify-center rounded-lg bg-background-secondary"
            onClick={() => setView(VIEWS.BACKGROUND)}
          >
            <i className="more_icon"></i>
          </div>
        </div>
      )}
    </div>
  )
}
